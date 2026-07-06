import { useState, useEffect } from 'react';
import {
  createMedicamento,
  updateMedicamento,
} from '../services/medicamentoService.js';

function MedicamentoForm({ medicamentoEditar, setMedicamentoEditar, onGuardar }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    cantidad: '',
    fecha_vencimiento: '',
    proveedor: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (medicamentoEditar) {
      setFormulario({
        nombre: medicamentoEditar.nombre,
        categoria: medicamentoEditar.categoria,
        precio: medicamentoEditar.precio,
        cantidad: medicamentoEditar.cantidad,
        fecha_vencimiento:
          medicamentoEditar.fecha_vencimiento?.split('T')[0] || '',
        proveedor: medicamentoEditar.proveedor,
      });

      setMensaje('');
      setError('');
    }
  }, [medicamentoEditar]);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombre: '',
      categoria: '',
      precio: '',
      cantidad: '',
      fecha_vencimiento: '',
      proveedor: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje('');
    setError('');

    if (
      !formulario.nombre ||
      !formulario.categoria ||
      !formulario.precio ||
      !formulario.fecha_vencimiento ||
      !formulario.proveedor
    ) {
      setError('Complete todos los campos obligatorios.');
      return;
    }

    try {
      if (medicamentoEditar) {
        await updateMedicamento(
          medicamentoEditar.id,
          {
            ...formulario,
            precio: Number(formulario.precio),
            cantidad: Number(formulario.cantidad) || 0,
          }
        );

        setMensaje('Medicamento actualizado correctamente.');

        onGuardar();

      } else {
        await createMedicamento({
          ...formulario,
          precio: Number(formulario.precio),
          cantidad: Number(formulario.cantidad) || 0,
        });

        setMensaje('Medicamento registrado correctamente.');
      }

        onGuardar();


      limpiarFormulario();
      setMedicamentoEditar(null);
    } catch (err) {
      console.error(err);
      setError('Error al guardar el medicamento.');

    }
  };

  return (
    <form className="medicamento-form" onSubmit={handleSubmit}>
      <h2>
        {medicamentoEditar
          ? 'Editar medicamento'
          : 'Registrar medicamento'}
      </h2>

      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      {error && <div className="mensaje-error">{error}</div>}

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          placeholder="Ej. Paracetamol 500mg"
        />
      </div>

      <div className="form-group">
        <label>Categoría</label>
        <input
          type="text"
          name="categoria"
          value={formulario.categoria}
          onChange={handleChange}
          placeholder="Ej. Analgésico"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={formulario.cantidad}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Fecha de vencimiento</label>
          <input
            type="date"
            name="fecha_vencimiento"
            value={formulario.fecha_vencimiento}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Proveedor</label>
          <input
            type="text"
            name="proveedor"
            value={formulario.proveedor}
            onChange={handleChange}
            placeholder="Ej. Bayer"
          />
        </div>
      </div>

      <button className="btn-guardar" type="submit">
        {medicamentoEditar
          ? 'Actualizar medicamento'
          : 'Guardar medicamento'}
      </button>
    </form>
  );
}

export default MedicamentoForm;