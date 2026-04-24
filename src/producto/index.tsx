import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import './style.css'

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

function Producto() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userRating, setUserRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
    loadProduct(user)
  }, [id])

  const loadProduct = async (user: any) => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await res.json()
      setProduct(data)
      setRatingCount(data.rating.count)

      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      setIsFavorite(favorites.includes(data.id))
      
      if (user) {
        const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
        const productRatings = ratings[data.id] || {}
        setUserRating(productRatings[user.email] || 0)
      }
    } catch (error) {
      console.error('Error cargando producto:', error)
    }
  }

  const toggleFavorite = () => {
    if (!product) return
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const index = favorites.indexOf(product.id)
    
    if (index > -1) {
      favorites.splice(index, 1)
    } else {
      favorites.push(product.id)
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  const handleAddToCart = () => {
    if (!product) return
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = cart.find((item: any) => item.id === product.id)
    
    if (cartItem) {
      cartItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/original')
  }

  const handleRate = (rate: number) => {
    if (!currentUser) {
      alert('Debes iniciar sesión para calificar')
      return
    }

    const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
    const productRatings = ratings[product!.id] || {}
    
    if (!productRatings[currentUser.email]) {
      productRatings[currentUser.email] = rate
      setRatingCount(ratingCount + 1)
    } else {
      productRatings[currentUser.email] = rate
    }
    
    ratings[product!.id] = productRatings
    setUserRating(rate)
    localStorage.setItem('ratings', JSON.stringify(ratings))
  }

  if (!product) {
    return <div className="loading">Cargando...</div>
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>← Volver</button>

      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info">
          <h1>{product.title}</h1>

          <div className="rating-section">
            <span className="rating">★ {product.rating.rate}</span>
            <span className="reviews">({ratingCount} {ratingCount === 1 ? 'reseña' : 'reseñas'})</span>
          </div>

          <div className="category-badge">{product.category}</div>

          <p className="description">{product.description}</p>

          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
          </div>

          {currentUser && (
            <div className="rating-form">
              <label>Tu calificación:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`star ${userRating >= star ? 'active' : ''}`}
                    onClick={() => handleRate(star)}
                    title={`Calificar ${star} ${star === 1 ? 'estrella' : 'estrellas'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="actions">
            <div className="quantity-selector">
              <label>Cantidad:</label>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
            >
              {isFavorite ? 'Favorito' : 'Agregar a favoritos'}
            </button>

            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Producto
