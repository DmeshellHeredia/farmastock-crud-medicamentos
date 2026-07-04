// Modelo de Medicamentos (capa de acceso a datos)
// Responsabilidad única: SOLO habla con la base de datos (consultas SQL).
// No conoce req/res ni nada de HTTP. El controlador lo usa.

const db = require('../config/db');

// 1. Obtener todos los medicamentos (Usando el nombre original del repo)
const getMedicamentos = async () => {
    const query = 'SELECT * FROM medicamentos WHERE estado = "activo"';
    // Usamos .promise().query() para asegurar compatibilidad con mysql2 estándar
    const [rows] = await db.promise().query(query);
    return rows;
};

// 2. Obtener un medicamento por su ID
const findById = async (id) => {
    const query = 'SELECT * FROM medicamentos WHERE id = ? AND estado = "activo"';
    const [rows] = await db.promise().query(query, [id]);
    return rows[0]; // Retorna el objeto
};

// 3. Crear un nuevo medicamento
const create = async (medicamento) => {
    // CORRECCIÓN: Usamos exactamente las columnas del schema.sql de tu equipo
    const { nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor } = medicamento;
    
    const query = `
        INSERT INTO medicamentos 
        (nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor, estado) 
        VALUES (?, ?, ?, ?, ?, ?, 'activo')
    `;

    const [result] = await db.promise().query(query, [
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

    const [result] = await db.promise().query(query, [
        nombre, categoria, precio, cantidad, fecha_vencimiento, proveedor, id
    ]);
    return result;
};

// 5. Eliminar un medicamento (Borrado lógico)
const remove = async (id) => {
    const query = 'UPDATE medicamentos SET estado = "inactivo" WHERE id = ?';
    const [result] = await db.promise().query(query, [id]);
    return result;
};

module.exports = {
    getMedicamentos, // Nombre restaurado
    findById,
    create,
    update,
    remove
};