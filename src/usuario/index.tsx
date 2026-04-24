import { useState } from 'react'
import './style.css'

function Usuario() {
  const [user, setUser] = useState({
    nombre: 'Usuario',
    email: 'usuario@example.com',
    ciudad: 'No especificada',
    pais: 'No especificado'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    setUser(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length
  const favCount = JSON.parse(localStorage.getItem('favorites') || '[]').length

  return (
    <div className="usuario-container">
      <h1>Mi Perfil</h1>

      <div className="profile-card">
        <div className="profile-avatar">
          <span className="avatar-letter">{user.nombre[0].toUpperCase()}</span>
        </div>

        {!isEditing ? (
          <div className="profile-info">
            <div className="info-row">
              <label>Nombre:</label>
              <p>{user.nombre}</p>
            </div>
            <div className="info-row">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            <div className="info-row">
              <label>Ciudad:</label>
              <p>{user.ciudad}</p>
            </div>
            <div className="info-row">
              <label>País:</label>
              <p>{user.pais}</p>
            </div>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Editar Perfil
            </button>
          </div>
        ) : (
          <div className="profile-form">
            <div className="form-row">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="ciudad">Ciudad:</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor="pais">País:</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-buttons">
              <button className="save-button" onClick={handleSave}>
                Guardar Cambios
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        )}
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

      <div className="preferences-card">
        <h2>Preferencias</h2>
        <div className="preference-item">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Recibir notificaciones de ofertas</span>
          </label>
        </div>
        <div className="preference-item">
          <label className="checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Recordar mis datos de compra</span>
          </label>
        </div>
        <div className="preference-item">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Permitir cookies de terceros</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Usuario