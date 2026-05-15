import { createContext, useContext, useReducer, useState } from 'react'

// ── Context ──────────────────────────────────────────────
const StoreContext = createContext()
export const useStore = () => useContext(StoreContext)

// ── Cart Reducer ─────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id)
      if (exists) return state.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.product, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

// ── Provider ─────────────────────────────────────────────
export function StoreProvider({ children }) {
  const [cart,     dispatchCart] = useReducer(cartReducer, [])
  const [wishlist, setWishlist]  = useState([])
  const [user,     setUser]      = useState({
    name: 'Jugador',
    email: 'jugador@gamestore.com',
    avatar: '🎮',
    joined: 'Enero 2024',
  })
  const [orderHistory, setOrderHistory] = useState([])

  // ── Cart helpers ──────────────────────────────────────
  const addToCart     = (product)      => dispatchCart({ type: 'ADD', product })
  const removeFromCart = (id)          => dispatchCart({ type: 'REMOVE', id })
  const updateQty     = (id, qty)      => dispatchCart({ type: 'UPDATE_QTY', id, qty })
  const clearCart     = ()             => dispatchCart({ type: 'CLEAR' })

  const cartTotal    = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount    = cart.reduce((sum, i) => sum + i.qty, 0)

  // ── Wishlist helpers ──────────────────────────────────
  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    )
  }
  const inWishlist = (id) => wishlist.some(p => p.id === id)

  // ── Order helpers ─────────────────────────────────────
  const placeOrder = (orderData) => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-CO'),
      items: [...cart],
      total: cartTotal,
      ...orderData,
    }
    setOrderHistory(prev => [order, ...prev])
    clearCart()
    return order
  }

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist, inWishlist,
      user, setUser,
      orderHistory, placeOrder,
    }}>
      {children}
    </StoreContext.Provider>
  )
}
