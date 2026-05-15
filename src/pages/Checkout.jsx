import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import './Checkout.css'

const initial = {
  nombre: '', apellido: '', email: '', telefono: '',
  direccion: '', ciudad: '', departamento: '', codigo: '',
  cardName: '', cardNumber: '', cardExp: '', cardCvv: '',
}

function validate(f) {
  const e = {}
  if (!f.nombre.trim())    e.nombre    = 'Requerido'
  if (!f.apellido.trim())  e.apellido  = 'Requerido'
  if (!f.email.trim())     e.email     = 'Requerido'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Email inválido'
  if (!f.telefono.trim())  e.telefono  = 'Requerido'
  if (!f.direccion.trim()) e.direccion = 'Requerido'
  if (!f.ciudad.trim())    e.ciudad    = 'Requerido'
  if (!f.cardName.trim())  e.cardName  = 'Requerido'
  if (f.cardNumber.replace(/\s/g,'').length !== 16) e.cardNumber = '16 dígitos requeridos'
  if (!f.cardExp.match(/^\d{2}\/\d{2}$/)) e.cardExp = 'Formato MM/AA'
  if (f.cardCvv.length < 3) e.cardCvv = '3 dígitos'
  return e
}

function Field({ label, name, value, onChange, error, placeholder, type = 'text', maxLength }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        className={`input ${error ? 'error' : ''}`}
        name={name} type={type} value={value}
        onChange={onChange} placeholder={placeholder} maxLength={maxLength}
      />
      {error && <span className="field-error">⚠ {error}</span>}
    </div>
  )
}

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useStore()
  const navigate = useNavigate()
  const [fields, setFields] = useState(initial)
  const [errors, setErrors] = useState({})
  const [step,   setStep]   = useState(1) // 1: envío, 2: pago

  if (cart.length === 0) return (
    <div className="page empty-state">
      <div className="icon">🛒</div>
      <h3>Tu carrito está vacío</h3>
      <Link to="/shop" className="btn btn-primary">Ir a la tienda</Link>
    </div>
  )

  const handleChange = (e) => {
    let { name, value } = e.target
    // Auto-format card number
    if (name === 'cardNumber') value = value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)
    // Auto-format expiry
    if (name === 'cardExp') value = value.replace(/\D/g,'').replace(/^(\d{2})(\d)/,'$1/$2').slice(0,5)
    setFields(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
  }

  const handleNext = () => {
    const shippingFields = ['nombre','apellido','email','telefono','direccion','ciudad']
    const e = {}
    shippingFields.forEach(k => { if (!fields[k].trim()) e[k] = 'Requerido' })
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Email inválido'
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmit = () => {
    const e = validate(fields)
    if (Object.keys(e).length > 0) { setErrors(e); return }
    placeOrder({ shipping: fields, paymentLast4: fields.cardNumber.slice(-4) })
    navigate('/order-success')
  }

  return (
    <div className="page">
      <h1 className="section-title">💳 Checkout</h1>

      {/* Steps */}
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-num">1</span> Datos de envío
        </div>
        <div className="step-line" />
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-num">2</span> Pago
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-form">
          {step === 1 && (
            <div className="form-section card">
              <h2 className="form-title">📦 Información de envío</h2>
              <div className="fields-grid">
                <Field label="Nombre" name="nombre" value={fields.nombre} onChange={handleChange} error={errors.nombre} placeholder="Juan" />
                <Field label="Apellido" name="apellido" value={fields.apellido} onChange={handleChange} error={errors.apellido} placeholder="Pérez" />
                <Field label="Email" name="email" value={fields.email} onChange={handleChange} error={errors.email} placeholder="tu@email.com" type="email" />
                <Field label="Teléfono" name="telefono" value={fields.telefono} onChange={handleChange} error={errors.telefono} placeholder="+57 300 000 0000" />
              </div>
              <div className="fields-grid" style={{ marginTop: '1rem' }}>
                <Field label="Dirección" name="direccion" value={fields.direccion} onChange={handleChange} error={errors.direccion} placeholder="Calle 123 #45-67" />
                <Field label="Ciudad" name="ciudad" value={fields.ciudad} onChange={handleChange} error={errors.ciudad} placeholder="Medellín" />
                <Field label="Departamento" name="departamento" value={fields.departamento} onChange={handleChange} error={errors.departamento} placeholder="Antioquia" />
                <Field label="Código postal" name="codigo" value={fields.codigo} onChange={handleChange} error={errors.codigo} placeholder="050001" />
              </div>
              <button className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }} onClick={handleNext}>
                Continuar al pago →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section card">
              <h2 className="form-title">💳 Información de pago</h2>
              <div className="card-preview">
                <div className="card-chip">💳</div>
                <div className="card-num">{fields.cardNumber || '•••• •••• •••• ••••'}</div>
                <div className="card-meta">
                  <span>{fields.cardName || 'NOMBRE'}</span>
                  <span>{fields.cardExp || 'MM/AA'}</span>
                </div>
              </div>
              <div className="fields-grid" style={{ marginTop: '1.25rem' }}>
                <Field label="Nombre en la tarjeta" name="cardName" value={fields.cardName} onChange={handleChange} error={errors.cardName} placeholder="JUAN PÉREZ" />
                <Field label="Número de tarjeta" name="cardNumber" value={fields.cardNumber} onChange={handleChange} error={errors.cardNumber} placeholder="1234 5678 9012 3456" maxLength={19} />
                <Field label="Fecha de expiración" name="cardExp" value={fields.cardExp} onChange={handleChange} error={errors.cardExp} placeholder="MM/AA" maxLength={5} />
                <Field label="CVV" name="cardCvv" value={fields.cardCvv} onChange={handleChange} error={errors.cardCvv} placeholder="123" maxLength={4} type="password" />
              </div>
              <div className="checkout-btns">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>← Volver</button>
                <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
                  Confirmar pedido ✅
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="checkout-summary card">
          <h2 className="summary-title" style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            🧾 Tu pedido
          </h2>
          {cart.map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-2)' }}>{i.emoji} {i.name} ×{i.qty}</span>
              <span style={{ fontWeight: 600 }}>${(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700 }}>Total</span>
            <span style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: 'var(--accent)', fontWeight: 900 }}>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--green)' }}>🚚 Envío gratis</div>
        </div>
      </div>
    </div>
  )
}
