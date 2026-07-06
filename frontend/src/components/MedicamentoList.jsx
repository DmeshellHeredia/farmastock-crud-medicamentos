import { useEffect, useState } from 'react';
import { getMedicamentos, deleteMedicamento } from '../services/medicamentoService.js';

function MedicamentoList({ refreshTrigger, onEditar }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarMedicamentos = () => {
    setCargando(true);
    getMedicamentos()
      .then((data) => setMedicamentos(data))
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con el backend.');
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarMedicamentos();
  }, [refreshTrigger]);

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este medicamento de FarmaStock?');

    if (confirmar) {
      try {
        await deleteMedicamento(id);
        cargarMedicamentos(); 
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Hubo un error al eliminar el medicamento.');
      }
    }
  };

  return (
    <div>
      <h2>Inventario Actual</h2>

      {cargando && <p style={{ color: '#64748b' }}>Cargando datos...</p>}
      {error && <div className="alerta alerta-error">{error}</div>}

      {!cargando && !error && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Vencimiento</th>
              <th>Proveedor</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', color: '#64748b', padding: '32px' }}>
                  No hay medicamentos registrados en el sistema.
                </td>
              </tr>
            ) : (
              medicamentos.map((m) => (
                <tr key={m.id}>
                  <td style={{ color: '#64748b', fontWeight: '500' }}>#{m.id}</td>
                  <td style={{ fontWeight: '600', color: '#0f172a' }}>{m.nombre}</td>
                  <td>{m.categoria}</td>
                  <td>${m.precio}</td>
                  <td>{m.cantidad}</td>
                  <td>{new Date(m.fecha_vencimiento).toLocaleDateString()}</td>
                  <td>{m.proveedor}</td>
                  <td>
                    <span style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '6px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                      {m.estado}
                    </span>
                  </td>
                  {/* Contenedor flexible para los botones */}
                  <td style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button className="btn-warning" onClick={() => onEditar(m)}>
                      Editar
                    </button>
                    <button className="btn-danger" onClick={() => handleEliminar(m.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MedicamentoList;