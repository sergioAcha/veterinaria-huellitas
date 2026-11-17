import { getClinicInfo, listPrices, listServices, listSpecialties } from '../models/content.model.js';
import { demo } from '../data/demo.js';

async function safe(read, fallback) {
  try { return await read(); } catch (error) { console.warn(`Usando datos de demostración: ${error.message}`); return fallback; }
}

export async function getHome(_req, res) { res.json(demo.home); }
export async function getServices(_req, res) { res.json(await safe(listServices, demo.services)); }
export async function getSpecialties(_req, res) { res.json(await safe(listSpecialties, demo.specialties)); }
export async function getPrices(_req, res) { res.json(await safe(listPrices, demo.prices)); }
export async function getAbout(_req, res) {
  const rows = await safe(getClinicInfo, [demo.about]);
  res.json(rows[0] || demo.about);
}
export async function getContactInfo(_req, res) {
  const rows = await safe(getClinicInfo, [demo.about]);
  const { name, address, phone, email, hours, instagram } = rows[0] || demo.about;
  res.json({ name, address, phone, email, hours, instagram });
}
