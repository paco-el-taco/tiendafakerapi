import './style.css'

function Informativa() {
  return (
    <div className="informativa-container">
      <div className="info-card">
        <h1>Sobre la Tienda</h1>
        <p>
          Bienvenido a nuestra tienda online de productos de calidad. Ofrecemos una amplia
          variedad de artículos a precios competitivos con envío rápido y seguro.
        </p>
      </div>

      <div className="info-card">
        <h2>Nuestros Servicios</h2>
        <ul>
          <li>Catálogo completo de productos</li>
          <li>Búsqueda y filtrado avanzado</li>
          <li>Sistema de favoritos</li>
          <li>Carrito de compras persistente</li>
          <li>Información detallada de productos</li>
          <li>Sistema de calificaciones y reseñas</li>
        </ul>
      </div>

      <div className="info-card">
        <h2>Tecnologías Utilizadas</h2>
        <div className="tech-grid">
          <div className="tech-item">
            <h3>React</h3>
            <p>Librería JavaScript para construir interfaces de usuario interactivas y dinámicas</p>
          </div>
          <div className="tech-item">
            <h3>React Router</h3>
            <p>Sistema de enrutamiento para navegación fluida entre páginas sin recargas</p>
          </div>
          <div className="tech-item">
            <h3>TypeScript</h3>
            <p>Lenguaje de programación que añade tipos estáticos a JavaScript para mayor seguridad</p>
          </div>
          <div className="tech-item">
            <h3>Vite</h3>
            <p>Herramienta de construcción ultra rápida para desarrollo web moderno</p>
          </div>
          <div className="tech-item">
            <h3>FakeStore API</h3>
            <p>API gratuita que proporciona datos de productos para demostración</p>
          </div>
          <div className="tech-item">
            <h3>LocalStorage</h3>
            <p>Almacenamiento local en el navegador para persistencia de datos como favoritos y carrito</p>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h2>¿Cómo Usar la Aplicación?</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <div>
              <h4>Explora Productos</h4>
              <p>En la pestaña Home puedes ver todos los productos disponibles</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <div>
              <h4>Filtra y Busca</h4>
              <p>Usa los filtros para buscar por nombre, categoría o rango de precio</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <div>
              <h4>Ver Detalles</h4>
              <p>Haz clic en un producto para ver sus atributos completos</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <div>
              <h4>Agregar a Favoritos</h4>
              <p>Marca tus productos favoritos para acceder a ellos fácilmente después</p>
            </div>
          </div>
          <div className="step">
            <span className="step-number">5</span>
            <div>
              <h4>Comprar</h4>
              <p>Añade productos al carrito y procede al pago en la pestaña Original</p>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card contact-card">
        <h2>Contacto</h2>
        <p>Para más información o consultas, no dudes en contactarnos a través de nuestros canales de atención.</p>
      </div>
    </div>
  )
}

export default Informativa