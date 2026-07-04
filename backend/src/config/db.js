// Conexión a MySQL usando mysql2 (pool de conexiones)
// Un "pool" reutiliza conexiones abiertas en lugar de crear una nueva por cada
// consulta. Se usa la versión con Promesas para poder usar async/await.

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'farmastock_db',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4', // Soporta acentos (á, é, í) y caracteres especiales
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Función para verificar la conexión al arrancar el servidor.
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente.');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    console.error('   Revisa tu archivo .env y que el servicio MySQL esté encendido.');
  }
}

module.exports = { pool, testConnection };
