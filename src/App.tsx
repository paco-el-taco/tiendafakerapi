import { BrowserRouter as Router, Route, Routes, Link } from 'react-router'

import Informativa from './informativa'
import Original from './original'
import Usuario from './usuario'
import Home from './home'
import Favoritos from './favoritos'
import Producto from './producto'
import Auth from './auth'

import './App.css'

function App() {
  return (
    <>
      <nav className="c-menu">
        <div className="menu-content">
          <div className="menu-links">
            <Link to="/" className="menu-item">Home</Link>
            <Link to="/favoritos" className="menu-item">Favoritos</Link>
            <Link to="/original" className="menu-item">Carrito</Link>
            <Link to="/informativa" className="menu-item">Info</Link>
            <Link to="/usuario" className="menu-item">Usuario</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/original" element={<Original />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/auth" element={<Auth />} />
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
