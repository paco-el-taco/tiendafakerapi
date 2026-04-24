import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'
import Home from './home'
import Favoritos from './favoritos'
import ProductDetail from './productDetail'
import Auth from './auth'

import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setCurrentUser(user)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <>
      <nav className="c-menu">
        <div className="menu-content">
          <div className="menu-links">
            <Link to="/" className="menu-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDy9mBtyJWUPLRobv__N2OwHYdiKAWarKroQ&s" alt="Home" />
              <p>Home</p>
            </Link>
            <Link to="/favoritos" className="menu-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwirKiGL1VFlx1A456XT5nxNyWds8y4-K5zg&s" alt="Favoritos" />
              <p>Favoritos</p>
            </Link>
            <Link to="/original" className="menu-item">
              <img src="https://media.istockphoto.com/id/1448912272/vector/soccer-ball-icon-football-game-ball-icons.jpg?s=170667a&w=0&k=20&c=BppyhfxxHRxTSk_1urxYxFTh9a-UprsyYm5vI0XC7Lg=" alt="Carrito" />
              <p>Carrito</p>
            </Link>
            <Link to="/informativa" className="menu-item">
              <img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/more-info-icon.png" alt="Info" />
              <p>Info</p>
            </Link>
            <Link to="/usuario" className="menu-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzXYh-X4wxX1jfbPywa8HWoNGDnx1Tlo0-g&s" alt="Usuario" />
              <p>Usuario</p>
            </Link>
          </div>

          <div className="auth-menu">
            {currentUser ? (
              <div className="user-info">
                <span className="user-name">{currentUser.email.split('@')[0]}</span>
                <button onClick={handleLogout} className="logout-btn">Salir</button>
              </div>
            ) : (
              <Link to="/auth" className="login-btn">Inicia sesión</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/producto/:id" element={<ProductDetail /> } />
        <Route path="/favoritos" element={<Favoritos /> } />
        <Route path="/original" element={<Original /> } />
        <Route path="/informativa" element={<Informativa /> } />
        <Route path="/usuario" element={<Usuario /> } />
        <Route path="/auth" element={<Auth /> } />
      </Routes>
    </>
  )
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWithRouter
