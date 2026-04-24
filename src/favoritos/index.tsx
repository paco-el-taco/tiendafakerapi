import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './style.css'

interface Product {
  id: number
  title: string
  price: number
  image: string
}

function Favoritos() {
  const [favorites, setFavorites] = useState<Product[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
    const allProducts = JSON.parse(localStorage.getItem('allProducts') || '[]')

    const favoriteProducts = allProducts.filter((p: Product) => stored.includes(p.id))
    setFavorites(favoriteProducts)
  }, [])

  return (
    <div className="favoritos-container">
      <h1>Mis Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="empty">No tienes productos favoritos</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((producto) => (
            <Link to={`/producto/${producto.id}`} key={producto.id} className="favorite-item">
              <img src={producto.image} alt={producto.title} />
              <h3>{producto.title}</h3>
              <p>${producto.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos