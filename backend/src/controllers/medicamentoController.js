// Controlador de Medicamentos (capa HTTP)
// Responsabilidad única: recibir la petición (req), llamar al modelo y
// responder (res). NO escribe SQL: eso vive en models/medicamentoModel.js.

const medicamentoModel = require('../models/medicamentoModel');

// GET /api/medicamentos  -> Listar todos los medicamentos
const getMedicamentos = async (req, res) => {
  try {
    const medicamentos = await medicamentoModel.findAll();
    return res.json(medicamentos);
  } catch (error) {
    console.error('Error en getMedicamentos:', error.message);
    return res.status(500).json({ error: 'Error al obtener los medicamentos.' });
  }
};

// GET /api/medicamentos/:id  -> Obtener un medicamento por su id
const getMedicamentoById = async (req, res) => {
  // TODO (Backend): Implementar.
  return res.status(501).json({ mensaje: 'No implementado todavía.' });
};

// POST /api/medicamentos  -> Crear un medicamento
const createMedicamento = async (req, res) => {
  // TODO (Backend): Implementar.
  return res.status(501).json({ mensaje: 'No implementado todavía.' });
};

// PUT /api/medicamentos/:id  -> Actualizar un medicamento
const updateMedicamento = async (req, res) => {
  // TODO (Backend): Implementar.
  return res.status(501).json({ mensaje: 'No implementado todavía.' });
};

// DELETE /api/medicamentos/:id  -> Eliminar un medicamento
const deleteMedicamento = async (req, res) => {
  // TODO (Backend): Implementar.
  return res.status(501).json({ mensaje: 'No implementado todavía.' });
};

module.exports = {
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
};
