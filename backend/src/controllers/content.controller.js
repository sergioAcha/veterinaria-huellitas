import { getCafeInfo, getSiteContent, listPrices, listServices, listSpecialties } from '../models/content.model.js';

async function respondWithDatabaseData(res, read, map = (data) => data) {
  try {
    const data = await read();
    const result = map(data);
    if (result === null) {
      return res.status(503).json({ error: 'Falta información del negocio en la base de datos.' });
    }
    return res.json(result);
  } catch (error) {
    console.error(`Error al leer información de MySQL: ${error.message}`);
    return res.status(503).json({ error: 'No se pudo leer la información de MySQL. Verifica XAMPP y la configuración de la base de datos.' });
  }
}

export function getHome(_req, res) {
  return respondWithDatabaseData(res, async () => {
    const [[info], content] = await Promise.all([getCafeInfo(), getSiteContent()]);
    if (!info || content.length === 0) return null;
    return {
      ...Object.fromEntries(content.map(({ content_key, content_value }) => [content_key, content_value])),
      cafeName: info.name,
      cafeTagline: info.tagline
    };
  });
}

export function getServices(_req, res) {
  return respondWithDatabaseData(res, listServices);
}

export function getSpecialties(_req, res) {
  return respondWithDatabaseData(res, listSpecialties);
}

export function getPrices(_req, res) {
  return respondWithDatabaseData(res, listPrices);
}

export function getAbout(_req, res) {
  return respondWithDatabaseData(res, getCafeInfo, (rows) => rows[0] || null);
}

export function getContactInfo(_req, res) {
  return respondWithDatabaseData(res, getCafeInfo, (rows) => {
    const info = rows[0];
    if (!info) return null;
    const { name, address, phone, email, hours, instagram } = info;
    return { name, address, phone, email, hours, instagram };
  });
}
