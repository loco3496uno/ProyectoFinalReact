import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const { orderHistory } = useStore()
  const lastOrder = orderHistory[0]

  return (
    <div className="page success-page">
      <div className="success-card card">
        <div className="success-icon">🎉</div>
        <h1 className="success-title">¡Pedido confirmado!</h1>
        <p className="success-desc">
          Gracias por tu compra. Tu pedido está siendo procesado y llegará en 24 horas.
        </p>

        {lastOrder && (
          <div className="order-detail">
            <div className="order-meta">
              <div className="om-row">
                <span>Número de pedido</span>
                <strong>#{lastOrder.id.toString().slice(-6)}</strong>
              </div>
              <div className="om-row">
                <span>Fecha</span>
                <strong>{lastOrder.date}</strong>
              </div>
              <div className="om-row">
                <span>Total</span>
                <strong style={{ color: 'var(--accent)', fontFamily: 'var(--font-head)' }}>
                  ${lastOrder.total.toFixed(2)}
                </strong>
              </div>
              {lastOrder.paymentLast4 && (
                <div className="om-row">
                  <span>Tarjeta</span>
                  <strong>•••• {lastOrder.paymentLast4}</strong>
                </div>
              )}
            </div>

            <div className="order-items">
              <h3>Productos</h3>
              {lastOrder.items.map(item => (
                <div key={item.id} className="oi-row">
                  <span>{item.emoji} {item.name} ×{item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="success-actions">
          <Link to="/"     className="btn btn-primary btn-lg">🏠 Volver al inicio</Link>
          <Link to="/shop" className="btn btn-ghost btn-lg">🛒 Seguir comprando</Link>
          <Link to="/profile" className="btn btn-ghost btn-lg">👤 Ver mis pedidos</Link>
        </div>
      </div>
    </div>
  )
}
