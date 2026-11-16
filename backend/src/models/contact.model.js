import { query } from '../config/db.js';

export function saveContact({ name, email, phone, subject, message }) {
  return query('INSERT INTO contacts (name,email,phone,subject,message) VALUES (?,?,?,?,?)', [name, email, phone, subject, message]);
}
