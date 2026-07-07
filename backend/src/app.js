// Configuración de la aplicación Express
// Aquí se registran los middlewares (CORS, JSON) y las rutas.
// El arranque del servidor está separado en server.js.

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const medicamentoRoutes = require('./routes/medicamentoRoutes');

const app = express();

//  Middlewares 
app.use(cors());            // Permite peticiones desde el frontend (Vite: puerto 5173)
app.use(express.json());    // Permite leer body en formato JSON

//  Ruta de prueba (health check) 
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de FarmaStock funcionando 🚑' });
});

//  Rutas del CRUD de medicamentos
app.use('/api/medicamentos', medicamentoRoutes);

//  Ruta no encontrada (404)
// Si ninguna ruta anterior coincidió, la petición cae acá.
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

//  Middleware global de manejo de errores
// Captura cualquier error no controlado (o pasado con next(err)) y responde
// un JSON uniforme, sin exponer detalles internos al cliente.
// Express reconoce este middleware por tener 4 parámetros (err primero).
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.message);
  const status = err.status || 500;
  const mensaje = status < 500
    ? 'Petición inválida.'          // errores del cliente (ej. JSON malformado)
    : 'Error interno del servidor.'; // errores del servidor
  res.status(status).json({ error: mensaje });
});

module.exports = app;
