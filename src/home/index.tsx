import { useState, useEffect, useMemo } from 'react'
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

interface Filters {
  searchName: string
  category: string
  minPrice: string
  maxPrice: string
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [filters, setFilters] = useState<Filters>({
    searchName: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data: Product[] = await res.json()
        setProducts(data)
        localStorage.setItem('allProducts', JSON.stringify(data))

        const uniqueCategories = [...new Set(data.map(p => p.category))]
        setCategories(uniqueCategories as string[])
      } catch (error) {
        console.error('Error cargando productos:', error)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (filters.searchName && !p.title.toLowerCase().includes(filters.searchName.toLowerCase())) {
        return false
      }
      if (filters.category && p.category !== filters.category) {
        return false
      }
      if (filters.minPrice && p.price < parseFloat(filters.minPrice)) {
        return false
      }
      if (filters.maxPrice && p.price > parseFloat(filters.maxPrice)) {
        return false
      }
      return true
    })
  }, [products, filters])

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  return (
    <div className="home-container">
      <h1>Productos</h1>

      <div className="filters-container">
        <div className="filter-group">
          <label>Buscar por nombre:</label>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.searchName}
            onChange={(e) => handleFilterChange('searchName', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Categoría:</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
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
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Precio máximo:</label>
          <input
            type="number"
            placeholder="1000"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
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