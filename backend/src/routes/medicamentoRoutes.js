// Rutas de Medicamentos
// Conecta cada URL con su función del controlador.
// Base URL final: http://localhost:3001/api/medicamentos

const express = require('express');
const router = express.Router();

const {
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
} = require('../controllers/medicamentoController');

// Listar todos
router.get('/', getMedicamentos);

// Obtener uno por id
router.get('/:id', getMedicamentoById);

// Crear
router.post('/', createMedicamento);

// Actualizar
router.put('/:id', updateMedicamento);

// Eliminar
router.delete('/:id', deleteMedicamento);

module.exports = router;
