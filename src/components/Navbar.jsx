import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './Navbar.css'

export default function Navbar() {
  const { cartCount, wishlist, user } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch]     = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`)
      setSearch('')
      setMenuOpen(false)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-inner container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎮</span>
          <span className="logo-text">Game<span className="logo-accent">Store</span></span>
        </Link>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            className="nav-search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar juegos, consolas..."
          />
          <button type="submit" className="nav-search-btn">🔍</button>
        </form>

        {/* Links desktop */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><NavLink to="/"        end className={({isActive}) => isActive ? 'nl active' : 'nl'} onClick={() => setMenuOpen(false)}>Inicio</NavLink></li>
          <li><NavLink to="/shop"        className={({isActive}) => isActive ? 'nl active' : 'nl'} onClick={() => setMenuOpen(false)}>Tienda</NavLink></li>
          <li>
            <NavLink to="/wishlist" className={({isActive}) => isActive ? 'nl active' : 'nl'} onClick={() => setMenuOpen(false)}>
              Wishlist {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({isActive}) => isActive ? 'nl active' : 'nl'} onClick={() => setMenuOpen(false)}>
              🛒 {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({isActive}) => isActive ? 'nl active nl-avatar' : 'nl nl-avatar'} onClick={() => setMenuOpen(false)}>
              <span>{user.avatar}</span> {user.name}
            </NavLink>
          </li>
        </ul>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  )
}
