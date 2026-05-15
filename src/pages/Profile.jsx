import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './Profile.css'

const avatars = ['🎮', '🕹️', '👾', '🎯', '⚡', '🔥', '💎', '🚀']

export default function Profile() {
  const { user, setUser, orderHistory, wishlist, cartCount } = useStore()
  const [editing, setEditing] = useState(false)
  const [form,    setForm]    = useState({ name: user.name, email: user.email })

  const handleSave = () => {
    if (form.name.trim()) { setUser(u => ({ ...u, ...form })); setEditing(false) }
  }

  return (
    <div className="page">
      <h1 className="section-title">👤 Mi Perfil</h1>

      <div className="profile-layout">
        {/* Left: user card */}
        <div className="profile-sidebar">
          <div className="profile-card card">
            {/* Avatar selector */}
            <div className="avatar-big">{user.avatar}</div>
            <div className="avatar-grid">
              {avatars.map(a => (
                <button key={a} className={`avatar-opt ${user.avatar === a ? 'selected' : ''}`}
                  onClick={() => setUser(u => ({ ...u, avatar: a }))}>
                  {a}
                </button>
              ))}
            </div>

            {editing ? (
              <div className="profile-form">
                <input className="input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nombre" />
                <input className="input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Email" type="email" />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>Guardar</button>
                  <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div className="profile-info">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-joined">🗓️ Miembro desde {user.joined}</p>
                <button className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setEditing(true)}>
                  ✏️ Editar perfil
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="profile-stats card">
            <h3 className="stats-title">Estadísticas</h3>
            <div className="stat-row">
              <span>🛍️ Pedidos realizados</span>
              <strong>{orderHistory.length}</strong>
            </div>
            <div className="stat-row">
              <span>❤️ En wishlist</span>
              <strong>{wishlist.length}</strong>
            </div>
            <div className="stat-row">
              <span>🛒 En carrito</span>
              <strong>{cartCount}</strong>
            </div>
            <div className="stat-row">
              <span>💰 Total gastado</span>
              <strong style={{ color: 'var(--accent)' }}>
                ${orderHistory.reduce((s, o) => s + o.total, 0).toFixed(2)}
              </strong>
            </div>
          </div>
        </div>

        {/* Right: order history */}
        <div className="profile-main">
          <h2 className="section-title" style={{ fontSize: '1.1rem' }}>📦 Historial de pedidos</h2>

          {orderHistory.length === 0 ? (
            <div className="empty-state" style={{ padding: '2.5rem' }}>
              <div className="icon" style={{ fontSize: '2.5rem' }}>📭</div>
              <h3>Sin pedidos aún</h3>
              <p>Cuando hagas tu primera compra aparecerá aquí</p>
              <Link to="/shop" className="btn btn-primary">Ir a la tienda</Link>
            </div>
          ) : (
            <div className="orders-list">
              {orderHistory.map(order => (
                <div key={order.id} className="order-card card">
                  <div className="order-head">
                    <div>
                      <span className="order-id">Pedido #{order.id.toString().slice(-6)}</span>
                      <span className="order-date">{order.date}</span>
                    </div>
                    <div>
                      <span className="badge badge-green">✅ Entregado</span>
                    </div>
                  </div>
                  <div className="order-items-list">
                    {order.items.map(i => (
                      <div key={i.id} className="order-item-row">
                        <span>{i.emoji} {i.name} ×{i.qty}</span>
                        <span>${(i.price * i.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-foot">
                    <span>🚚 Envío gratis</span>
                    <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-head)' }}>
                      Total: ${order.total.toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
