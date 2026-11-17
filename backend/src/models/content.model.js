import { query } from '../config/db.js';

export const listServices = () => query('SELECT id,name,description,icon FROM menu_items WHERE active=1 ORDER BY sort_order,id');
export const listSpecialties = () => query('SELECT id,name,description,icon FROM cafe_features WHERE active=1 ORDER BY sort_order,id');
export const listPrices = () => query('SELECT id,service_name,amount,currency,note FROM prices WHERE active=1 ORDER BY sort_order,id');
export const getCafeInfo = () => query('SELECT name,tagline,history,address,phone,email,hours,instagram FROM cafe_info WHERE id=1 LIMIT 1');
export const getSiteContent = () => query('SELECT content_key,content_value FROM site_content ORDER BY content_key');
