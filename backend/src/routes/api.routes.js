import { Router } from 'express';
import { getAbout, getContactInfo, getHome, getPrices, getServices, getSpecialties } from '../controllers/content.controller.js';
import { createContact } from '../controllers/contact.controller.js';
import { sendChat } from '../controllers/chat.controller.js';
import { query } from '../config/db.js';

const router = Router();

async function getOllamaStatus() {
  const baseUrl = (process.env.OLLAMA_URL || 'http://localhost:11434').replace(/\/$/, '');
  try {
    const response = await fetch(`${baseUrl}/api/tags`, { cache: 'no-store' });
    return response.ok ? 'ok' : 'unavailable';
  } catch (error) {
    return 'unavailable';
  }
}

router.get('/health', async (_req, res) => {
  try {
    await query('SELECT 1');
    const ollama = await getOllamaStatus();
    res.json({ status: 'ok', service: 'cafe-aroma-api', database: 'ok', ollama });
  } catch (error) {
    console.error(`Health check de MySQL falló: ${error.message}`);
    res.status(503).json({ status: 'error', service: 'cafe-aroma-api', database: 'unavailable' });
  }
});
router.get('/home', getHome);
router.get('/services', getServices);
router.get('/specialties', getSpecialties);
router.get('/about', getAbout);
router.get('/prices', getPrices);
router.get('/contact-info', getContactInfo);
router.post('/contact', createContact);
router.post('/chat', sendChat);
export default router;
