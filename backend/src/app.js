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

// TODO (Backend): Agregar aquí un middleware global de manejo de errores.

module.exports = app;
