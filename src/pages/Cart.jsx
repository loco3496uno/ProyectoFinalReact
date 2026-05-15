import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './Cart.css'

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount, clearCart } = useStore()

  if (cart.length === 0) return (
    <div className="page empty-state">
      <div className="icon">🛒</div>
      <h3>Tu carrito está vacío</h3>
      <p>Agrega productos desde la tienda para comenzar</p>
      <Link to="/shop" className="btn btn-primary">Ir a la tienda</Link>
    </div>
  )

  return (
    <div className="page">
      <div className="cart-header">
        <h1 className="section-title">🛒 Carrito <span style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 400 }}>({cartCount} productos)</span></h1>
        <button className="btn btn-ghost btn-sm" onClick={clearCart}>🗑️ Vaciar</button>
      </div>

      <div className="cart-layout">
        {/* Items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item card">
              <div className="ci-emoji">{item.emoji}</div>
              <div className="ci-info">
                <Link to={`/product/${item.id}`} className="ci-name">{item.name}</Link>
                <span className="ci-cat">{item.category}</span>
                <span className="ci-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
              <div className="ci-qty">
                <button className="qty-btn" onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}>−</button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <button className="btn btn-danger btn-sm ci-remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary card">
          <h2 className="summary-title">Resumen del pedido</h2>
          <div className="summary-rows">
            {cart.map(i => (
              <div key={i.id} className="summary-row">
                <span>{i.name} ×{i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-shipping">
            <span>🚚 Envío</span>
            <span className="free">Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span className="total-price">${cartTotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
            Proceder al pago →
          </Link>
          <Link to="/shop" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            ← Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
