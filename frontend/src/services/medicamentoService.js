// Servicio de Medicamentos (capa de comunicación con el backend)
// Centraliza todas las llamadas HTTP a la API. Los componentes NO deben usar
// fetch directamente: deben llamar a estas funciones.
//
// NOTA PARA EL EQUIPO:
//   - La lógica base con fetch ya está lista.
//   - Completen validaciones/manejo de errores según lo que necesiten.

// URL base del backend. Se puede configurar con VITE_API_URL en un archivo .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const ENDPOINT = `${API_URL}/medicamentos`;

// Obtener todos los medicamentos
export async function getMedicamentos() {
  // TODO (Frontend): Manejar errores y estados de carga en el componente.
  const respuesta = await fetch(ENDPOINT);
  if (!respuesta.ok) throw new Error('Error al obtener los medicamentos');
  return respuesta.json();
}

// Obtener un medicamento por id
export async function getMedicamentoById(id) {
  const respuesta = await fetch(`${ENDPOINT}/${id}`);
  if (!respuesta.ok) throw new Error('Error al obtener el medicamento');
  return respuesta.json();
}

// Crear un medicamento
export async function createMedicamento(medicamento) {
  const respuesta = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
  if (!respuesta.ok) throw new Error('Error al crear el medicamento');
  return respuesta.json();
}

// Actualizar un medicamento
export async function updateMedicamento(id, medicamento) {
  const respuesta = await fetch(`${ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento),
  });
  if (!respuesta.ok) throw new Error('Error al actualizar el medicamento');
  return respuesta.json();
}

// Eliminar un medicamento
export async function deleteMedicamento(id) {
  const respuesta = await fetch(`${ENDPOINT}/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error('Error al eliminar el medicamento');
  return respuesta.json();
}
