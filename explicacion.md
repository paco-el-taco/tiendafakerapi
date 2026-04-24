# Explicación del Proyecto API Faker

## ¿Qué es este proyecto?

Este es una tienda en línea interactiva construida con React. Permite a los usuarios ver productos, agregarlos al carrito, marcar favoritos, calificar productos y crear cuentas de usuario.

---

## Conceptos Básicos

### Estados (useState)
Los estados son variables que React usa para recordar información. Cuando un estado cambia, React actualiza automáticamente la pantalla.

Ejemplo:
```javascript
const [cantidad, setCantidad] = useState(1)
```
- `cantidad` es la variable
- `setCantidad` es la función para cambiarla
- `useState(1)` establece el valor inicial en 1

### Efectos (useEffect)
Los efectos se ejecutan cuando el componente carga o cuando algo cambia. Se usan para cargar datos de APIs o hacer tareas especiales.

Ejemplo:
```javascript
useEffect(() => {
  // Esto se ejecuta al cargar el componente
  cargarProductos()
}, [])
```

### Props
Las props son valores que un componente recibe de otro componente. Es como pasar argumentos a una función.

---

## Estructura del Proyecto

### 1. **App.tsx** - Componente Principal
El archivo principal que organiza toda la aplicación.

**Lo que hace:**
- Define la barra de navegación (menú) con 5 enlaces: Home, Favoritos, Carrito, Info, Usuario
- Usa React Router para mostrar diferentes páginas según el enlace que el usuario clickee
- No tiene estados complejos, solo renderiza (muestra) otros componentes

**Flujo:**
```
Usuario hace click en "Home" → App muestra el componente Home
Usuario hace click en "Favoritos" → App muestra el componente Favoritos
Y así sucesivamente...
```

---

### 2. **Home** - Página Principal de Productos

**Archivos:**
- `src/home/index.tsx` - Lógica
- `src/home/style.css` - Estilos

**Lo que hace:**
- Carga todos los productos de la API fakestoreapi.com
- Permite filtrar productos por nombre, categoría y precio
- Muestra los productos en una grilla

**Estados principales:**
- `products` → Lista de todos los productos de la API
- `categories` → Lista de categorías disponibles
- `filters` → Objeto con los valores actuales de búsqueda y filtros

**Cómo funciona:**
1. Cuando carga la página, useFetch trae los productos de `https://fakestoreapi.com/products`
2. Los productos se guardan en `products`
3. El usuario escribe en los filtros (buscar, categoría, precio)
4. `useMemo` recalcula cuáles productos mostrar basado en los filtros
5. Los productos filtrados se muestran en la pantalla

**Flujo de datos:**
```
API fakestoreapi.com
        ↓
    useEffect
        ↓
   setProducts
        ↓
    useMemo filtra
        ↓
   Mostrar en pantalla
```

---

### 3. **Producto** - Detalles de un Producto

**Archivos:**
- `src/producto/index.tsx` - Lógica
- `src/producto/style.css` - Estilos

**Lo que hace:**
- Muestra todos los detalles de un producto específico
- Permite marcar/desmarcar como favorito
- Permite calificar el producto (1-5 estrellas)
- Permite agregar el producto al carrito

**Estados principales:**
- `product` → Datos del producto actual
- `isFavorite` → Si el usuario marcó como favorito
- `quantity` → Cantidad a agregar al carrito
- `userRating` → La calificación que dio el usuario

**Funciones principales:**
- `toggleFavorite()` → Agregar/quitar de favoritos (guarda en localStorage)
- `handleRate(rate)` → Guardar la calificación del usuario
- `handleAddToCart()` → Agregar producto al carrito y navegar allá

**Cómo funciona la calificación:**
1. El usuario solo puede calificar si está logueado
2. Se guarda en localStorage en un objeto como: `{ productoId: { email: rating } }`
3. Importante: Solo sube el contador una vez por usuario (no se duplica)

---

### 4. **Auth** - Registro e Iniciar Sesión

**Archivos:**
- `src/auth/index.tsx`
- `src/auth/style.css`

**Lo que hace:**
- Formulario para registrarse (crear cuenta)
- Formulario para iniciar sesión
- Guarda los usuarios en localStorage

**Estados:**
- `isLogin` → Mostrar formulario de login o registro
- `email` → Email ingresado
- `password` → Contraseña ingresada

**Cómo funciona:**
1. Si es registro nuevo: Crea un usuario y lo guarda en localStorage
2. Si es login: Busca si existe el usuario con esas credenciales
3. Si existe: Guarda al usuario como "usuario actual" (currentUser)
4. Navega a la página de inicio

**Flujo:**
```
Usuario ingresa email y contraseña
            ↓
    ¿Es nuevo o existente?
            ↓
    Guardar en localStorage
            ↓
    Navegar a home
```

---

### 5. **Usuario** - Perfil del Usuario

**Archivos:**
- `src/usuario/index.tsx`
- `src/usuario/style.css`

**Lo que hace:**
- Si NO estás logueado: Muestra un botón para ir a iniciar sesión
- Si ESTÁS logueado: Muestra tu email y un botón para cerrar sesión
- Muestra estadísticas (productos en carrito, favoritos)

**Estados:**
- `currentUser` → Datos del usuario logueado (o null)
- `isLoadingUser` → Si está cargando los datos

**Cómo funciona:**
1. Al cargar, lee localStorage para ver si hay un usuario logueado
2. Si hay usuario: Muestra su información
3. Si no hay: Muestra el formulario de login
4. El botón "Cerrar Sesión" borra el usuario de localStorage

---

### 6. **Favoritos** - Productos Marcados como Favoritos

**Archivos:**
- `src/favoritos/index.tsx`
- `src/favoritos/style.css`

**Lo que hace:**
- Muestra todos los productos que el usuario marcó como favorito
- Los favoritos se guardan en localStorage

**Estados:**
- `favorites` → Lista de productos favoritos

**Cómo funciona:**
1. Lee localStorage para obtener los IDs de favoritos
2. Obtiene los datos completos del archivo allProducts (guardado cuando carga Home)
3. Muestra esos productos

---

### 7. **Original (Carrito)** - Carrito de Compras

**Archivos:**
- `src/original/index.tsx`
- `src/original/style.css`

**Lo que hace:**
- Muestra todos los productos agregados al carrito
- Permite cambiar la cantidad de cada producto
- Calcula el subtotal, impuestos y total
- Permite vaciar el carrito

**Estados:**
- `cartItems` → Lista de productos en el carrito

**Cómo funciona:**
1. Cada producto en el carrito tiene: id, title, price, image, quantity
2. Los datos se guardan en localStorage
3. Cuando cambias cantidad, se actualiza localStorage
4. El componente escucha cambios en localStorage (para sincronizar con otras pestañas)

**Cálculo de totales:**
```
Subtotal = suma de (precio × cantidad) de cada producto
Impuesto = Subtotal × 10%
Total = Subtotal + Impuesto
```

---

### 8. **Informativa** - Página de Información

**Archivos:**
- `src/informativa/index.tsx`
- `src/informativa/style.css`

**Lo que hace:**
- Muestra información general sobre la tienda
- Actualmente es un componente básico

---

## Flujo de Datos General

```
┌─────────────────────────────────────────────────────────────┐
│                    APLICACIÓN (App.tsx)                     │
│                  Menú de navegación fijo                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    ┌───▼────┐      ┌──────▼──────┐     ┌────▼────┐
    │  Home  │      │   Producto  │     │  Usuario │
    └───┬────┘      └──────┬──────┘     └────┬────┘
        │                  │                  │
   Carga API      Lee detalles API    Lee localStorage
        │                  │                  │
   localStorage       Favoritos        currentUser
   allProducts       Carrito
   Favoritos        Calificaciones
```

## LocalStorage - Almacenamiento en el Navegador

localStorage es como una pequeña base de datos en el navegador del usuario. Los datos persisten incluso después de cerrar la página.

**Lo que se guarda:**

1. **allProducts** - Lista completa de productos (cargada una vez en Home)
2. **favorites** - Array de IDs de productos favoritos
3. **cart** - Array de objetos con productos en el carrito
4. **ratings** - Objeto con calificaciones de productos por usuario
5. **users** - Array de usuarios registrados
6. **currentUser** - Usuario que está logueado actualmente

---

## Cómo se Comunica la App con el Servidor

**Paso 1:** 
```javascript
const res = await fetch('https://fakestoreapi.com/products')
```
Hace una petición HTTP GET a la API.

**Paso 2:**
```javascript
const data = await res.json()
```
Convierte la respuesta JSON a un objeto JavaScript.

**Paso 3:**
```javascript
setProducts(data)
```
Guarda los datos en el estado.

**Paso 4:**
React actualiza la pantalla automáticamente.

---

## Resumen de Funcionalidades Principales

| Función | Ubicación | Qué hace |
|---------|-----------|----------|
| Buscar productos | Home | Filtra por nombre, categoría, precio |
| Ver detalles | Producto | Muestra info completa del producto |
| Calificar | Producto | Guarda rating del usuario (solo una vez) |
| Agregar favoritos | Producto | Marca/desmarca como favorito |
| Carrito | Original | Muestra productos agregados, calcula total |
| Login/Registro | Auth | Crea cuenta o inicia sesión |
| Perfil | Usuario | Muestra info del usuario logueado |

---

## Tecnologías Usadas

- **React** - Framework para crear interfaces
- **TypeScript** - Lenguaje de programación (JavaScript con tipos)
- **React Router** - Para navegar entre páginas
- **localStorage** - Almacenar datos en el navegador
- **CSS** - Para estilos
- **Fetch API** - Para comunicarse con servidores

---

## Notas Importantes

1. **Sin base de datos real** - Todo se guarda en localStorage del navegador del usuario
2. **API pública** - Usa fakestoreapi.com, es una API de prueba gratuita
3. **Datos no persisten entre dispositivos** - Cada navegador tiene su propio localStorage
4. **Calificaciones locales** - Las calificaciones se guardan solo en ese navegador, no afectan la API real
