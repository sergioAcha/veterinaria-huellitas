import { Router } from 'express';
import { getAbout, getContactInfo, getHome, getPrices, getServices, getSpecialties } from '../controllers/content.controller.js';
import { createContact } from '../controllers/contact.controller.js';
import { sendChat } from '../controllers/chat.controller.js';

const router = Router();
router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'huellitas-api' }));
router.get('/home', getHome);
router.get('/services', getServices);
router.get('/specialties', getSpecialties);
router.get('/about', getAbout);
router.get('/prices', getPrices);
router.get('/contact-info', getContactInfo);
router.post('/contact', createContact);
router.post('/chat', sendChat);
export default router;
