// Modelo de Medicamentos (capa de acceso a datos)
// Responsabilidad única: SOLO habla con la base de datos (consultas SQL).
// No conoce req/res ni nada de HTTP. El controlador lo usa.

const db = require('../config/db');

// Obtener todos los medicamentos activos (Listar)
const findAll = async () => {
    const query = 'SELECT * FROM medicamentos WHERE estado = "activo"';
    const [rows] = await db.execute(query);
    return rows;
};

// Obtener un medicamento por su ID
const findById = async (id) => {
    const query = 'SELECT * FROM medicamentos WHERE id = ? AND estado = "activo"';
    const [rows] = await db.execute(query, [id]);
    return rows[0]; // Retorna solo el objeto encontrado
};

// Crear un nuevo medicamento (El requerimiento clave de tu ticket)
const create = async (medicamento) => {
    const { 
        nombre_comercial, 
        principio_activo, 
        lote, 
        fecha_vencimiento, 
        costo_adquisicion, 
        precio_venta, 
        stock_actual, 
        stock_minimo 
    } = medicamento;

    const query = `
        INSERT INTO medicamentos 
        (nombre_comercial, principio_activo, lote, fecha_vencimiento, costo_adquisicion, precio_venta, stock_actual, stock_minimo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
        nombre_comercial, 
        principio_activo, 
        lote, 
        fecha_vencimiento, 
        costo_adquisicion, 
        precio_venta, 
        stock_actual, 
        stock_minimo
    ]);

    return result;
};

// Actualizar un medicamento existente
const update = async (id, medicamento) => {
    const { 
        nombre_comercial, principio_activo, lote, fecha_vencimiento, 
        costo_adquisicion, precio_venta, stock_actual, stock_minimo 
    } = medicamento;

    const query = `
        UPDATE medicamentos 
        SET nombre_comercial = ?, principio_activo = ?, lote = ?, fecha_vencimiento = ?, 
            costo_adquisicion = ?, precio_venta = ?, stock_actual = ?, stock_minimo = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [
        nombre_comercial, principio_activo, lote, fecha_vencimiento, 
        costo_adquisicion, precio_venta, stock_actual, stock_minimo, id
    ]);
    
    return result;
};

// Eliminar un medicamento (Borrado lógico cambiando el estado)
const remove = async (id) => {
    const query = 'UPDATE medicamentos SET estado = "inactivo" WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};