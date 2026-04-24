import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

function Usuario() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const navigate = useNavigate()
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
    setIsLoadingUser(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    navigate('/')
  }

  if (isLoadingUser) {
    return <div className="loading">Cargando...</div>
  }

  if (!currentUser) {
    return (
      <div className="usuario-container">
        <h1>Mi Perfil</h1>
        <div className="login-prompt">
          <p>Debes iniciar sesión para ver tu perfil</p>
          <button 
            className="login-redirect-btn"
            onClick={() => navigate('/auth')}
          >
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    )
  }

  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length
  const favCount = JSON.parse(localStorage.getItem('favorites') || '[]').length

  return (
    <div className="usuario-container">
      <h1>Mi Perfil</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          <span className="avatar-letter">{currentUser.email[0].toUpperCase()}</span>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Email:</label>
            <p>{currentUser.email}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Productos en el Carrito</h3>
          <p className="stat-number">{cartCount}</p>
        </div>
        <div className="stat-card">
          <h3>Productos Favoritos</h3>
          <p className="stat-number">{favCount}</p>
        </div>
      </div>
    </div>
  )
}

export default Usuario