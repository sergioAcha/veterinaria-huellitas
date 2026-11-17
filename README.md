# Café Aroma

Sitio web para una cafetería con frontend estático, API en Node.js, MariaDB/MySQL y asistente opcional conectado a Ollama/Gemma 3.

## Inicio rápido con XAMPP

1. Inicia **MySQL** desde XAMPP Control Panel. La configuración de ejemplo usa `localhost:3306`.
2. Ejecuta `backend/database/schema.sql` desde phpMyAdmin. Crea la base independiente `cafeteria_xampp`, sus tablas y el contenido inicial.
3. Copia `backend/.env.example` como `backend/.env`. Para el XAMPP local predeterminado, `root` suele tener contraseña vacía; ajusta `DB_USER` y `DB_PASSWORD` si configuraste otra.
4. En `backend/`, ejecuta `npm install` y `npm run dev`.
5. Abre `http://localhost:3000`.

La app consulta textos, imágenes (sus URLs), carta, precios e información del negocio en la base. No muestra datos de demostración si falla la conexión: presenta un error. El formulario guarda mensajes en `contacts`. Para usar el chat también se necesita Ollama y el modelo `gemma3`; sus respuestas se basan en datos de la base.

**Seguridad:** usar `root` es solo para desarrollo local con XAMPP. En un entorno compartido o publicado, configura un usuario de aplicación con permisos limitados.

## API

- `GET /api/health`
- `GET /api/home`, `/api/services`, `/api/specialties`, `/api/about`, `/api/prices`, `/api/contact-info`
- `POST /api/contact` con `{ name, email, phone, subject, message }`
- `POST /api/chat` con `{ message, history? }`

## Personalización

Edita `site_content`, `cafe_info`, `menu_items`, `cafe_features` y `prices` desde phpMyAdmin. Los mensajes enviados por el formulario se guardan en `contacts`.
