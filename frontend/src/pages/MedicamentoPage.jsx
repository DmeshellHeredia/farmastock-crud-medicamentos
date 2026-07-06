import MedicamentoForm from '../components/MedicamentoForm.jsx';
import MedicamentoList from '../components/MedicamentoList.jsx';

// Página principal del CRUD de Medicamentos.
// Aquí se juntan el formulario y el listado.
//
// TODO (Frontend): Manejar aquí el estado compartido (lista de medicamentos,
// medicamento en edición) y pasar props/funciones a los componentes hijos.

function MedicamentoPage() {
  return (
    <div className="contenedor">
      <h1>FarmaStock — Gestión de Medicamentos</h1>
      <p>Administre el inventario de medicamentos de forma rápida y segura.</p>

      {/* Formulario para crear / editar */}
      <MedicamentoForm />

      {/* Tabla / listado de medicamentos */}
      <MedicamentoList />
    </div>
  );
}

export default MedicamentoPage;
