import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Shop.css'

const sortOptions = [
  { value: 'default',    label: 'Relevancia' },
  { value: 'price-asc',  label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating',     label: 'Mejor valorados' },
  { value: 'name',       label: 'Nombre A-Z' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search,   setSearch]   = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('cat') || 'Todos')
  const [sort,     setSort]     = useState('default')
  const [maxPrice, setMaxPrice] = useState(800)

  // Sync URL params → state
  useEffect(() => {
    const q   = searchParams.get('q')
    const cat = searchParams.get('cat')
    if (q)   setSearch(q)
    if (cat)  setCategory(cat)
  }, [searchParams])

  // Filter
  let filtered = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'Todos' || p.category === category
    const matchPrice    = p.price <= maxPrice
    return matchSearch && matchCategory && matchPrice
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating')     return b.rating - a.rating
    if (sort === 'name')       return a.name.localeCompare(b.name)
    return 0
  })

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setSearchParams(prev => { e.target.value ? prev.set('q', e.target.value) : prev.delete('q'); return prev })
  }

  const handleCat = (cat) => {
    setCategory(cat)
    setSearchParams(prev => { cat === 'Todos' ? prev.delete('cat') : prev.set('cat', cat); return prev })
  }

  const clearFilters = () => {
    setSearch(''); setCategory('Todos'); setSort('default'); setMaxPrice(800)
    setSearchParams({})
  }

  return (
    <div className="shop-wrapper">
      {/* Sidebar */}
      <aside className="shop-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">🔍 Buscar</h3>
          <input className="input" value={search} onChange={handleSearch} placeholder="Nombre o descripción..." />
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">🗂️ Categoría</h3>
          {categories.map(cat => (
            <button key={cat} className={`cat-btn ${category === cat ? 'active' : ''}`} onClick={() => handleCat(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">💵 Precio máx: <span style={{ color: 'var(--accent)' }}>${maxPrice}</span></h3>
          <input type="range" min={20} max={800} step={10} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="price-range" />
          <div className="price-labels"><span>$20</span><span>$800</span></div>
        </div>

        <button className="btn btn-ghost btn-sm" style={{ width: '100%' }} onClick={clearFilters}>
          ✕ Limpiar filtros
        </button>
      </aside>

      {/* Main */}
      <div className="shop-main">
        {/* Toolbar */}
        <div className="shop-toolbar">
          <p className="results-count">
            <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? 's' : ''}
            {search && <span> para "{search}"</span>}
            {category !== 'Todos' && <span> en {category}</span>}
          </p>
          <select className="input sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <h3>Sin resultados</h3>
            <p>Prueba con otros filtros o términos de búsqueda</p>
            <button className="btn btn-primary" onClick={clearFilters}>Limpiar filtros</button>
          </div>
        ) : (
          <div className="shop-grid">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
