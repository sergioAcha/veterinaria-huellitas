import { saveContact } from '../models/contact.model.js';

export async function createContact(req, res, next) {
  const { name, email, phone = '', subject, message } = req.body || {};
  if (![name, email, subject, message].every((value) => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Completa nombre, correo, asunto y mensaje.' });
  }
  if (name.length > 120 || email.length > 190 || subject.length > 180 || message.length > 4000 || phone.length > 40) {
    return res.status(400).json({ error: 'Uno de los campos supera el tamaño permitido.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Escribe un correo válido.' });
  try {
    const result = await saveContact({ name: name.trim(), email: email.trim(), phone: phone.trim(), subject: subject.trim(), message: message.trim() });
    return res.status(201).json({ message: '¡Gracias! Recibimos tu mensaje.', id: result.insertId });
  } catch (error) {
    error.status = 503;
    error.message = 'No se pudo guardar el mensaje. Verifica que MySQL esté iniciado y configurado.';
    return next(error);
  }
}
