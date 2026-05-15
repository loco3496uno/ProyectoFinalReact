import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './ProductCard.css'

const badgeColor = { 'GOTY': 'yellow', 'PS5 Exclusivo': 'cyan', 'Exclusivo': 'cyan', 'Más vendido': 'green', 'Oferta': 'red', 'Pro': 'purple', 'Premium': 'purple', 'RTX': 'cyan', 'Game Pass': 'green', 'Portátil': 'green', 'Gaming': 'purple', 'Inalámbrico': 'cyan' }

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore()
  const liked = inWishlist(product.id)

  return (
    <div className="product-card card">
      {/* Emoji hero */}
      <Link to={`/product/${product.id}`} className="pc-image">
        <span className="pc-emoji">{product.emoji}</span>
        <span className={`badge badge-${badgeColor[product.badge] || 'purple'} pc-badge`}>{product.badge}</span>
        <button
          className={`pc-wish ${liked ? 'liked' : ''}`}
          onClick={e => { e.preventDefault(); toggleWishlist(product) }}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </Link>

      {/* Info */}
      <div className="pc-body">
        <span className="pc-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="pc-name">{product.name}</h3>
        </Link>

        <div className="pc-rating">
          <span className="stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
          <span className="pc-reviews">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="pc-footer">
          <span className="pc-price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
            + Carrito
          </button>
        </div>
      </div>
    </div>
  )
}
