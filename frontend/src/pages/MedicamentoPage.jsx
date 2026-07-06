import { useState } from 'react';
import MedicamentoForm from '../components/MedicamentoForm.jsx';
import MedicamentoList from '../components/MedicamentoList.jsx';

function MedicamentoPage() {
  const [medicamentoEditar, setMedicamentoEditar] = useState(null);
  const [actualizarLista, setActualizarLista] = useState(false);

  return (
    <div className="contenedor">
      <h1>FarmaStock — Gestión de Medicamentos</h1>
      <p>Administre el inventario de medicamentos de forma rápida y segura.</p>

    <MedicamentoForm
        medicamentoEditar={medicamentoEditar}
        setMedicamentoEditar={setMedicamentoEditar}
        onGuardar={() => setActualizarLista(prev => !prev)}
    />

    <MedicamentoList
        actualizar={actualizarLista}
        onEditar={setMedicamentoEditar}
    />
    </div>
  );
}

export default MedicamentoPage;