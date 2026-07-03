import { useState } from 'react';
// import { createMedicamento } from '../services/medicamentoService.js';

// Formulario de registro / edición de medicamentos.
// Semiarmado: tiene el estado y la estructura mínima. El equipo debe completar
// los campos restantes y conectar el envío con el servicio.
//
// TODO (Frontend):
//   - Agregar los campos faltantes (categoria, precio, cantidad,
//     fecha_vencimiento, proveedor, estado).
//   - Al enviar, llamar a createMedicamento() o updateMedicamento().
//   - Mostrar mensajes de éxito / error.
//   - Soportar modo edición (recibir un medicamento por props).

function MedicamentoForm() {
  const [nombre, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO (Frontend): Construir el objeto medicamento y enviarlo al backend.
    // await createMedicamento({ nombre, categoria, precio, ... });
    console.log('Enviar medicamento:', { nombre });
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '24px 0' }}>
      <h2>Registrar medicamento</h2>

      <label>
        Nombre:{' '}
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Paracetamol 500mg"
        />
      </label>

      {/* TODO (Frontend): Agregar aquí el resto de los campos del formulario. */}

      <div style={{ marginTop: 12 }}>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}

export default MedicamentoForm;
