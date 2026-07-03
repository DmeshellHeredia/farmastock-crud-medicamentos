// Punto de entrada del backend
// Levanta el servidor Express y verifica la conexión a MySQL.
// Comando para correr:  npm run dev   (o)   npm start

const app = require('./app');
const { testConnection } = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  // Verifica la conexión a la base de datos al arrancar.
  testConnection();
});
