import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import './style.css'

interface Product {
  id: number
  title: string
  price: number
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])

  const [searchName, setSearchName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data: Product[] = await res.json()
        setProducts(data)
        setFilteredProducts(data)

        localStorage.setItem('allProducts', JSON.stringify(data))

        const uniqueCategories = [...new Set(data.map(p => p.category))]
        setCategories(uniqueCategories as string[])
      } catch (error) {
        console.error('Error cargando productos:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchName) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchName.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice))
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice))
    }

    setFilteredProducts(filtered)
  }, [searchName, selectedCategory, minPrice, maxPrice, products])

  return (
    <div className="home-container">
      <h1>Productos</h1>

      <div className="filters-container">
        <div className="filter-group">
          <label>Buscar por nombre:</label>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Categoría:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Precio mínimo:</label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Precio máximo:</label>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/producto/${product.id}`} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="category">{product.category}</p>
            <p className="rating">★ {product.rating.rate} ({product.rating.count})</p>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-products">No se encontraron productos</p>
      )}
    </div>
  )
}

export default Home