import { useState, useEffect } from 'react';
import { createMedicamento, updateMedicamento } from '../services/medicamentoService.js';

function MedicamentoForm({ medicamentoAEditar, onMedicamentoGuardado, onCancelarEdicion }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha_vencimiento, setFechaVencimiento] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (medicamentoAEditar) {
      setNombre(medicamentoAEditar.nombre);
      setCategoria(medicamentoAEditar.categoria);
      setPrecio(medicamentoAEditar.precio);
      setCantidad(medicamentoAEditar.cantidad);
      const fecha = new Date(medicamentoAEditar.fecha_vencimiento).toISOString().split('T')[0];
      setFechaVencimiento(fecha);
      setProveedor(medicamentoAEditar.proveedor);
    } else {
      setNombre(''); setCategoria(''); setPrecio(''); setCantidad(''); setFechaVencimiento(''); setProveedor('');
    }
  }, [medicamentoAEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!nombre || !categoria || !precio || !cantidad || !fecha_vencimiento || !proveedor) {
      setMensaje({ tipo: 'error', texto: 'Por favor, completa todos los campos.' });
      return;
    }

    try {
      const datosMedicamento = { nombre, categoria, precio: parseFloat(precio), cantidad: parseInt(cantidad, 10), fecha_vencimiento, proveedor };

      if (medicamentoAEditar) {
        await updateMedicamento(medicamentoAEditar.id, datosMedicamento);
        setMensaje({ tipo: 'exito', texto: 'Medicamento actualizado correctamente.' });
      } else {
        await createMedicamento(datosMedicamento);
        setMensaje({ tipo: 'exito', texto: 'Medicamento registrado correctamente.' });
      }

      setNombre(''); setCategoria(''); setPrecio(''); setCantidad(''); setFechaVencimiento(''); setProveedor('');
      if (onMedicamentoGuardado) onMedicamentoGuardado();
    } catch (error) {
      console.error(error);
      setMensaje({ tipo: 'error', texto: 'Hubo un error al procesar el medicamento.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{medicamentoAEditar ? '✏️ Editar Medicamento' : '📦 Registrar Medicamento'}</h2>

      {mensaje && (
        <div className={`alerta ${mensaje.tipo === 'exito' ? 'alerta-exito' : 'alerta-error'}`}>
          {mensaje.texto}
        </div>
      )}

      {/* Grid para poner 2 campos por fila si la pantalla es grande */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0 20px' }}>
        <div className="campo">
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Paracetamol 500mg" />
        </div>
        <div className="campo">
          <label>Categoría</label>
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ej: Analgésico" />
        </div>
        <div className="campo">
          <label>Precio</label>
          <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 2.50" />
        </div>
        <div className="campo">
          <label>Cantidad en stock</label>
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} placeholder="Ej: 100" />
        </div>
        <div className="campo">
          <label>Fecha de Vencimiento</label>
          <input type="date" value={fecha_vencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
        </div>
        <div className="campo">
          <label>Proveedor</label>
          <input type="text" value={proveedor} onChange={(e) => setProveedor(e.target.value)} placeholder="Ej: Genfar" />
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
        <button type="submit" className="btn-primary">
          {medicamentoAEditar ? 'Guardar Cambios' : 'Registrar'}
        </button>
        {medicamentoAEditar && (
          <button type="button" className="btn-secondary" onClick={onCancelarEdicion}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MedicamentoForm;