import { query } from '../config/db.js';

export const listServices = () => query('SELECT id,name,description,icon FROM services WHERE active=1 ORDER BY sort_order,id');
export const listSpecialties = () => query('SELECT id,name,description,icon FROM specialties WHERE active=1 ORDER BY sort_order,id');
export const listPrices = () => query('SELECT id,service_name,amount,currency,note FROM prices WHERE active=1 ORDER BY sort_order,id');
export const getClinicInfo = () => query('SELECT name,history,address,phone,email,hours,instagram FROM clinic_info WHERE id=1 LIMIT 1');
