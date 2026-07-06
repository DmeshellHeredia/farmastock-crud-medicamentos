import { useEffect, useState } from 'react';
import { getMedicamentos } from '../services/medicamentoService.js';
// import { deleteMedicamento } from '../services/medicamentoService.js';

// Listado / tabla de medicamentos.
// ✅ CONECTADO AL BACKEND: carga y muestra los medicamentos reales.
//
// TODO (Frontend):
//   - Agregar botones "Editar" y "Eliminar" funcionales en cada fila.
//   - Manejar mejor los estados de carga y error (mensajes al usuario).

function MedicamentoList() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMedicamentos()
      .then((data) => setMedicamentos(data))
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con el backend. ¿Está corriendo en el puerto 3001?');
      })
      .finally(() => setCargando(false));
  }, []);

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

                    <button className="btn-editar">
                        Editar
                    </button>

                    <button className="btn-eliminar">
                        Eliminar
                    </button>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicamentoList;
