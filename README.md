# Veterinaria Huellitas

Sitio web informativo para una veterinaria, con frontend estático, API en Node.js, base MySQL y chatbot conectado a Ollama/Gemma 3.

## Inicio rápido

1. Instala Node.js y MySQL. Para usar el asistente también instala [Ollama](https://ollama.com/) y descarga el modelo: `ollama pull gemma3`.
2. Ejecuta `backend/database/schema.sql` en MySQL Workbench. El script crea la base independiente `veterinaria_huellitas` y sus tablas, sin modificar otras bases.
3. En otra pestaña de Workbench, crea el usuario local que usará Node (cambia `TU_CLAVE` por una clave propia):

   ```sql
   CREATE USER 'huellitas_app'@'127.0.0.1' IDENTIFIED BY 'TU_CLAVE';
   GRANT SELECT, INSERT, UPDATE, DELETE ON veterinaria_huellitas.* TO 'huellitas_app'@'127.0.0.1';
   FLUSH PRIVILEGES;
   ```

4. Copia `backend/.env.example` como `backend/.env` y coloca la misma clave en `DB_PASSWORD`.
5. En `backend/`: `npm install` y `npm run dev`.
6. Abre `http://localhost:3000`.

El backend sirve también el frontend. El sitio puede mostrar datos de demostración por API cuando MySQL no está disponible; para guardar mensajes de contacto hay que iniciar MySQL.

## API

- `GET /api/health`
- `GET /api/home`, `/api/services`, `/api/specialties`, `/api/about`, `/api/prices`, `/api/contact-info`
- `POST /api/contact` con `{ name, email, phone, subject, message }`
- `POST /api/chat` con `{ message, history? }`

## GitHub

El repositorio contiene las dos carpetas (`frontend` y `backend`) para compartir el proyecto completo. No se ha creado ni publicado un repositorio remoto: hace falta que el propietario cree/indique el repositorio de GitHub y autorice el envío.

## Personalización

Los datos de demostración, teléfono, dirección, historia y precios se encuentran en `backend/src/data/demo.js`; reemplázalos por los datos reales de la veterinaria. El video de portada enlaza a Pexels y requiere conexión a internet.
