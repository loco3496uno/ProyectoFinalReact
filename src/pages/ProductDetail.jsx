import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { addToCart, toggleWishlist, inWishlist } = useStore()
  const [added, setAdded] = useState(false)

  const product  = products.find(p => p.id === +id)
  const related  = products.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)

  if (!product) return (
    <div className="page empty-state">
      <div className="icon">❓</div>
      <h3>Producto no encontrado</h3>
      <Link to="/shop" className="btn btn-primary">Volver a la tienda</Link>
    </div>
  )

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const stars = Math.round(product.rating)

  return (
    <div className="page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> › <Link to="/shop">Tienda</Link> › <Link to={`/shop?cat=${product.category}`}>{product.category}</Link> › {product.name}
      </div>

      {/* Product */}
      <div className="pd-grid">
        <div className="pd-visual">
          <div className="pd-emoji-wrap">
            <span className="pd-emoji">{product.emoji}</span>
          </div>
          <div className="pd-actions-mobile">
            <button className={`btn btn-primary btn-lg ${added ? 'added' : ''}`} onClick={handleAdd} style={{ flex: 1 }}>
              {added ? '✅ ¡Agregado!' : '🛒 Agregar al carrito'}
            </button>
            <button
              className={`btn btn-ghost ${inWishlist(product.id) ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product)}
              style={{ fontSize: '1.3rem', padding: '0.6rem 1rem' }}
            >
              {inWishlist(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <div className="pd-info">
          <span className="pd-category">{product.category}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            <span className="stars">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
            <span className="pd-rating-num">{product.rating}</span>
            <span className="pd-reviews">({product.reviews.toLocaleString()} reseñas)</span>
          </div>

          <p className="pd-price">${product.price.toFixed(2)}</p>

          <p className="pd-desc">{product.description}</p>

          <div className="pd-specs">
            <h3>Especificaciones</h3>
            <ul>
              {product.specs.map((s, i) => <li key={i}>✓ {s}</li>)}
            </ul>
          </div>

          <div className="pd-stock">
            <span className={`badge ${product.stock > 10 ? 'badge-green' : product.stock > 0 ? 'badge-yellow' : 'badge-red'}`}>
              {product.stock > 10 ? '✅ En stock' : product.stock > 0 ? `⚠️ Pocas unidades (${product.stock})` : '❌ Agotado'}
            </span>
          </div>

          <div className="pd-actions">
            <button className={`btn btn-primary btn-lg ${added ? 'added' : ''}`} onClick={handleAdd} disabled={product.stock === 0} style={{ flex: 1 }}>
              {added ? '✅ ¡Agregado!' : '🛒 Agregar al carrito'}
            </button>
            <button
              className={`btn btn-ghost ${inWishlist(product.id) ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product)}
              style={{ fontSize: '1.3rem', padding: '0.6rem 1rem' }}
            >
              {inWishlist(product.id) ? '❤️' : '🤍'}
            </button>
          </div>

          <button className="btn btn-outline btn-lg" style={{ width: '100%' }} onClick={() => { addToCart(product); navigate('/cart') }}>
            Ir al carrito →
          </button>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2 className="section-title">🎯 Productos relacionados</h2>
          <div className="related-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
