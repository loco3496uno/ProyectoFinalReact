import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

const featured = products.filter(p => ['GOTY', 'Más vendido', 'PS5 Exclusivo'].includes(p.badge)).slice(0, 4)
const deals    = products.filter(p => p.badge === 'Oferta')

const categories = [
  { name: 'Consolas',    emoji: '🎮', color: '#7c3aed', to: '/shop?cat=Consolas' },
  { name: 'Juegos',      emoji: '🕹️', color: '#06b6d4', to: '/shop?cat=Juegos' },
  { name: 'Accesorios',  emoji: '🎧', color: '#10b981', to: '/shop?cat=Accesorios' },
  { name: 'Tecnología',  emoji: '💻', color: '#f59e0b', to: '/shop?cat=Tecnología' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <span className="hero-tag">⚡ Nueva temporada</span>
          <h1 className="hero-title">
            El mejor gaming<br />
            <span className="hero-accent">comienza aquí</span>
          </h1>
          <p className="hero-desc">
            Consolas, juegos y accesorios de última generación. Envío rápido y los mejores precios garantizados.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-lg">Ver tienda 🛒</Link>
            <Link to="/shop?cat=Juegos" className="btn btn-ghost btn-lg">Ver juegos</Link>
          </div>
          <div className="hero-stats">
            <div className="hstat"><span className="hstat-n">+{products.length}</span><span className="hstat-l">Productos</span></div>
            <div className="hstat"><span className="hstat-n">24h</span><span className="hstat-l">Envío</span></div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="container home-section">
        <h2 className="section-title">🗂️ Categorías</h2>
        <div className="cat-grid">
          {categories.map(c => (
            <Link to={c.to} key={c.name} className="cat-card" style={{ '--cat-color': c.color }}>
              <span className="cat-emoji">{c.emoji}</span>
              <span className="cat-name">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="container home-section">
        <div className="section-header">
          <h2 className="section-title">🏆 Más destacados</h2>
          <Link to="/shop" className="btn btn-ghost btn-sm">Ver todos →</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Banner oferta */}
      {deals.length > 0 && (
        <section className="container home-section">
          <div className="deal-banner">
            <div className="deal-info">
              <span className="badge badge-red">🔥 Oferta especial</span>
              <h3>{deals[0].name}</h3>
              <p>{deals[0].description}</p>
              <div className="deal-price">
                <span className="deal-current">${deals[0].price.toFixed(2)}</span>
              </div>
              <Link to={`/product/${deals[0].id}`} className="btn btn-primary">Ver oferta</Link>
            </div>
            <div className="deal-emoji">{deals[0].emoji}</div>
          </div>
        </section>
      )}
    </div>
  )
}
