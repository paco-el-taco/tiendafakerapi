import { useState, useEffect, useMemo } from 'react'
import './style.css'

interface CartItem {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

function Original() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCartItems(cart)
    }

    loadCart()
    window.addEventListener('storage', loadCart)

    return () => window.removeEventListener('storage', loadCart)
  }, [])

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }

    const updated = cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (productId: number) => {
    const updated = cartItems.filter(item => item.id !== productId)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    return { subtotal, tax, total: subtotal + tax }
  }, [cartItems])

  return (
    <div className="carrito-container">
      <h1>Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeItem(item.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Impuesto (10%):</span>
              <span>${totals.tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>

            <button className="checkout-button">Proceder al pago</button>
            <button className="clear-cart-button" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Original