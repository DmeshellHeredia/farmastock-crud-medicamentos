// Modelo de Medicamentos (capa de acceso a datos)
// Responsabilidad única: SOLO habla con la base de datos (consultas SQL).
// No conoce req/res ni nada de HTTP. El controlador lo usa.

const { pool } = require('../config/db');

// 1. Obtener todos los medicamentos (Renombrado a findAll)
const findAll = async () => {
    const query = 'SELECT * FROM medicamentos WHERE estado = "activo"';
    const [rows] = await pool.query(query);
    return rows;
};

// 2. Obtener un medicamento por su ID
const findById = async (id) => {
    const query = 'SELECT * FROM medicamentos WHERE id = ? AND estado = "activo"';
    const [rows] = await pool.query(query, [id]);
    return rows[0]; 
};

// 3. Crear un nuevo medicamento
const create = async (medicamento) => {
    const { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor } = medicamento;
    
    const query = `
        INSERT INTO medicamentos 
        (nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor, estado) 
        VALUES (?, ?, ?, ?, ?, ?, 'activo')
    `;

    const [result] = await pool.query(query, [
        nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor
    ]);
    return result;
};

// 4. Actualizar un medicamento existente
const update = async (id, medicamento) => {
    const { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor } = medicamento;

    const query = `
        UPDATE medicamentos 
        SET nombre = ?, categoria = ?, precio = ?, cantidad = ?, fecha_vencimiento = ?, proveedor = ?
        WHERE id = ?
    `;

    const [result] = await pool.query(query, [
        nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor, id
    ]);
    return result;
};

// 5. Eliminar un medicamento (Borrado lógico)
const remove = async (id) => {
    const query = 'UPDATE medicamentos SET estado = "inactivo" WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
};

module.exports = {
    findAll, // <-- Cambiado aquí también
    findById,
    create,
    update,
    remove
};