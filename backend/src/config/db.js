import mysql from 'mysql2/promise';

let pool;
export function getPool() {
  if (!pool && process.env.DB_HOST) {
    pool = mysql.createPool({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, waitForConnections: true, connectionLimit: 10, charset: 'utf8mb4' });
  }
  return pool;
}

export async function query(sql, params = []) {
  const db = getPool();
  if (!db) throw new Error('MySQL no está configurado');
  const [rows] = await db.execute(sql, params);
  return rows;
}
