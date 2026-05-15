import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist } = useStore()

  if (wishlist.length === 0) return (
    <div className="page empty-state">
      <div className="icon">❤️</div>
      <h3>Tu wishlist está vacía</h3>
      <p>Guarda los productos que te interesan presionando el corazón 🤍</p>
      <Link to="/shop" className="btn btn-primary">Explorar tienda</Link>
    </div>
  )

  return (
    <div className="page">
      <h1 className="section-title">❤️ Mi Wishlist <span style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 400 }}>({wishlist.length} productos)</span></h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
