import { useState } from 'react';
import MedicamentoForm from '../components/MedicamentoForm.jsx';
import MedicamentoList from '../components/MedicamentoList.jsx';

function MedicamentoPage() {
  const [medicamentoAEditar, setMedicamentoAEditar] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMedicamentoGuardado = () => {
    setMedicamentoAEditar(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="contenedor">
      {/* Quitamos el color en línea para usar el estilo corporativo del CSS */}
      <h1>FarmaStock</h1>
      <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.1rem' }}>Gestión de inventario y medicamentos.</p>

      <div className="panel">
        <MedicamentoForm
          medicamentoAEditar={medicamentoAEditar}
          onMedicamentoGuardado={handleMedicamentoGuardado}
          onCancelarEdicion={() => setMedicamentoAEditar(null)}
        />
      </div>

      <div className="panel">
        <MedicamentoList
          refreshTrigger={refreshTrigger}
          onEditar={setMedicamentoAEditar}
        />
      </div>
    </div>
  );
}

export default MedicamentoPage;