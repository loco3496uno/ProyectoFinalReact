import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🎮 GameStore</span>
          <p>Tu tienda de videojuegos y tecnología. Los mejores títulos y accesorios al mejor precio.</p>
        </div>
        <div className="footer-links">
          <h4>Tienda</h4>
          <Link to="/shop">Todos los productos</Link>
          <Link to="/shop?cat=Consolas">Consolas</Link>
          <Link to="/shop?cat=Juegos">Juegos</Link>
          <Link to="/shop?cat=Accesorios">Accesorios</Link>
        </div>
        <div className="footer-links">
          <h4>Mi cuenta</h4>
          <Link to="/profile">Perfil</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Carrito</Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© 2026 GameStore · Hecho con React y Vite </p>
      </div>
    </footer>
  )
}
