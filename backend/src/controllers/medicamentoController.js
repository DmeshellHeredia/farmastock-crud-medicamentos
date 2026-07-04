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
    try {
        const { id } = req.params; // Sacamos el ID de la URL
        const medicamento = await medicamentoModel.findById(id);
        
        if (!medicamento) {
            return res.status(404).json({ error: 'Medicamento no encontrado' });
        }
        
        return res.json(medicamento);
    } catch (error) {
        console.error('Error en getMedicamentoById:', error.message);
        return res.status(500).json({ error: 'Error al obtener el medicamento.' });
    }
};

// POST /api/medicamentos  -> Crear un medicamento
const createMedicamento = async (req, res) => {
    try {
        const { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor } = req.body;

        if (!nombre || !categoria || !precio || !fecha_vencimiento || !proveedor) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const nuevoMedicamento = { 
            nombre, 
            categoria, 
            precio, 
            cantidad: cantidad || 0, 
            fecha_vencimiento, 
            proveedor 
        };
        
        const result = await medicamentoModel.create(nuevoMedicamento);

        res.status(201).json({ 
            message: 'Medicamento creado exitosamente',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error al crear medicamento:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el medicamento' });
    }
};

// PUT /api/medicamentos/:id -> Actualizar un medicamento
const updateMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor } = req.body;

        // Validamos que por lo menos envíen el nombre para actualizar
        if (!nombre || !categoria || !precio) {
            return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar' });
        }

        const datosActualizados = { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor };
        const result = await medicamentoModel.update(id, datosActualizados);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medicamento no encontrado o no se pudo actualizar' });
        }

        return res.json({ mensaje: 'Medicamento actualizado correctamente' });
    } catch (error) {
        console.error('Error en updateMedicamento:', error.message);
        return res.status(500).json({ error: 'Error al actualizar el medicamento.' });
    }
};

// DELETE /api/medicamentos/:id -> Eliminar un medicamento (lógico)
const deleteMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await medicamentoModel.remove(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Medicamento no encontrado para eliminar' });
        }

        return res.json({ mensaje: 'Medicamento eliminado correctamente' });
    } catch (error) {
        console.error('Error en deleteMedicamento:', error.message);
        return res.status(500).json({ error: 'Error al eliminar el medicamento.' });
    }
};

module.exports = {
  getMedicamentos,
  getMedicamentoById,
  createMedicamento,
  updateMedicamento,
  deleteMedicamento,
};