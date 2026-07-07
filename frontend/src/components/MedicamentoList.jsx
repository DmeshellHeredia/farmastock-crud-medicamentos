import { useEffect, useState } from 'react';
import { getMedicamentos, deleteMedicamento } from '../services/medicamentoService.js';

// Listado / tabla de medicamentos.
//  CONECTADO AL BACKEND: lista los medicamentos y permite eliminarlos
//    con un modal de confirmación propio (SCRUM-27).

function MedicamentoList({ onEditar, actualizar }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Medicamento pendiente de eliminar. null = modal cerrado.
  const [medicamentoAEliminar, setMedicamentoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [errorEliminar, setErrorEliminar] = useState(null);

  const cargarMedicamentos = () => {
    setCargando(true);
    getMedicamentos()
      .then((data) => setMedicamentos(data))
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con el backend. ¿Está corriendo en el puerto 3001?');
      })
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarMedicamentos();
  }, [actualizar]);

  // Abre el modal de confirmación para el medicamento elegido.
  const confirmarEliminar = (medicamento) => {
    setErrorEliminar(null);
    setMedicamentoAEliminar(medicamento);
  };

  // Cierra el modal sin eliminar.
  const cancelarEliminar = () => {
    if (eliminando) return; // evita cerrar mientras se está borrando
    setMedicamentoAEliminar(null);
  };

  // Confirma: llama al backend y refresca la lista.
  const ejecutarEliminar = async () => {
    if (!medicamentoAEliminar) return;
    setEliminando(true);
    setErrorEliminar(null);
    try {
      await deleteMedicamento(medicamentoAEliminar.id);
      setMedicamentoAEliminar(null);
      cargarMedicamentos();
    } catch (err) {
      console.error(err);
      setErrorEliminar('No se pudo eliminar el medicamento. Intentá de nuevo.');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div>
      <h2>Listado de medicamentos</h2>

      {cargando && <p>Cargando medicamentos...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Vencimiento</th>
            <th>Proveedor</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.length === 0 ? (
            <tr>
              <td colSpan="9">
                {cargando ? 'Cargando...' : 'No hay medicamentos cargados.'}
              </td>
            </tr>
          ) : (
            medicamentos.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nombre}</td>
                <td>{m.categoria}</td>
                <td>{m.precio}</td>
                <td>{m.cantidad}</td>
                <td>{m.fecha_vencimiento}</td>
                <td>{m.proveedor}</td>
                <td>{m.estado}</td>
                <td className="acciones">

                    <button className="btn-editar" onClick={() => onEditar(m)}>
                        Editar
                    </button>

                    <button className="btn-eliminar" onClick={() => confirmarEliminar(m)}>
                        Eliminar
                    </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal de confirmación de borrado */}
      {medicamentoAEliminar && (
        <div className="modal-overlay" onClick={cancelarEliminar}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icono">🗑️</div>
            <h3 className="modal-titulo">Eliminar medicamento</h3>
            <p className="modal-texto">
              ¿Seguro que querés eliminar <strong>{medicamentoAEliminar.nombre}</strong>?
              <br />
              Esta acción no se puede deshacer.
            </p>

            {errorEliminar && <p className="modal-error">{errorEliminar}</p>}

            <div className="modal-acciones">
              <button
                className="btn-modal-cancelar"
                onClick={cancelarEliminar}
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                className="btn-modal-eliminar"
                onClick={ejecutarEliminar}
                disabled={eliminando}
              >
                {eliminando ? 'Eliminando…' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicamentoList;
