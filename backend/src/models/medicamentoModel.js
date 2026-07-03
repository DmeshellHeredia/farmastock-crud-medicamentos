// Modelo de Medicamentos (capa de acceso a datos)
// Responsabilidad única: SOLO habla con la base de datos (consultas SQL).
// No conoce req/res ni nada de HTTP. El controlador lo usa.

const { pool } = require('../config/db');

// Devuelve todos los medicamentos.
async function findAll() {
  const [rows] = await pool.query('SELECT * FROM medicamentos ORDER BY id DESC');
  return rows;
}

// TODO (Backend): Devolver un medicamento por su id.
async function findById(id) {}

// TODO (Backend): Insertar un medicamento y devolver el creado.
async function create(medicamento) {}

// TODO (Backend): Actualizar un medicamento por su id.
async function update(id, medicamento) {}

// TODO (Backend): Eliminar un medicamento por su id.
async function remove(id) {}

module.exports = { findAll, findById, create, update, remove };
