import { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => u.email === email && u.password === password)

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        navigate('/')
      } else {
        alert('Email o contraseña incorrectos')
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some((u: any) => u.email === email)) {
        alert('El email ya está registrado')
        return
      }

      const newUser = { email, password }
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      navigate('/')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-box">
          <div className="auth-header">
            <h1>{isLogin ? 'Bienvenido' : 'Crear Cuenta'}</h1>
            <p>{isLogin ? 'Inicia sesión para continuar' : 'Regístrate para empezar'}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
              <button
                type="button"
                className="toggle-link"
                onClick={() => {
                  setIsLogin(!isLogin)
                  setEmail('')
                  setPassword('')
                }}
              >
                {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth

