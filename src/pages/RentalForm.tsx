// Erick_Alquileres
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAllClients, ClienteDTO } from '../api/clientService';
import { getAllPhotocopiers, FotocopiadoraDTO } from '../api/photocopierService';
import { createRental, updateRental, getRentalById, CrearAlquilerDTO } from '../api/rentalService';
import { useAuth } from '../context/AuthContext';

const RentalForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();

  const formTitle = isEdit ? 'Editar Alquiler' : 'Nuevo Alquiler';
  const formDesc = isEdit ? 'Modifica los datos del contrato de alquiler' : 'Registra un nuevo contrato de alquiler';

  const [clients, setClients] = useState<ClienteDTO[]>([]);
  const [availablePhotocopiers, setAvailablePhotocopiers] = useState<FotocopiadoraDTO[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<FotocopiadoraDTO[]>([]);
  const [photoSelectId, setPhotoSelectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientData, photoData] = await Promise.all([
          getAllClients(),
          getAllPhotocopiers(),
        ]);
        setClients(clientData);
        setAvailablePhotocopiers(photoData);

        if (isEdit && id) {
          const rental = await getRentalById(id);
          const form = document.getElementById('rentalForm') as HTMLFormElement;
          (form.elements.namedItem('clienteId') as HTMLSelectElement).value = rental.codCliente;
          (form.elements.namedItem('fechaInicio') as HTMLInputElement).value = rental.fechaInicio;
          (form.elements.namedItem('fechaFin') as HTMLInputElement).value = rental.fechaFin;
          (form.elements.namedItem('periodo') as HTMLSelectElement).value = rental.periodo;
          (form.elements.namedItem('cantidad') as HTMLInputElement).value = String(rental.valorPeriodo);
          (form.elements.namedItem('price') as HTMLInputElement).value = String(rental.precio);
          (form.elements.namedItem('estado') as HTMLSelectElement).value = rental.estado;
          setSelectedPhotos(rental.fotocopiadoras);
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isEdit, id]);

  const handleAddPhoto = () => {
    if (!photoSelectId) return;
    const photo = availablePhotocopiers.find(p => p.codFotocopiadora === photoSelectId);
    if (photo && !selectedPhotos.find(p => p.codFotocopiadora === photo.codFotocopiadora)) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
    setPhotoSelectId('');
  };

  const handleRemovePhoto = (photoId: string) => {
    setSelectedPhotos(selectedPhotos.filter(p => p.codFotocopiadora !== photoId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    if (!user) {
      alert('Debes iniciar sesión para registrar un alquiler.');
      return;
    }

    setSubmitting(true);
    const formData = new FormData(form);

    const dto: CrearAlquilerDTO = {
      codEmpleado: user.codEmpleado,
      codCliente: formData.get('clienteId') as string,
      fechaInicio: formData.get('fechaInicio') as string,
      fechaFin: formData.get('fechaFin') as string,
      periodo: formData.get('periodo') as string,
      valorPeriodo: Number(formData.get('cantidad')),
      precio: Number(formData.get('price')),
      estado: formData.get('estado') as string,
      fotocopiadoras: selectedPhotos.map(p => p.codFotocopiadora),
    };

    try {
      if (isEdit && id) {
        await updateRental(id, dto);
      } else {
        await createRental(dto);
      }
      navigate('/rentals');
    } catch (err) {
      console.error('Error al guardar alquiler:', err);
      alert('Ocurrió un error al guardar el alquiler.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">{formTitle}</h2>
          <p className="page-description">{formDesc}</p>
        </div>
        <Link to="/rentals" className="btn btn-outline-secondary" id="btnVolverAlquileres">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="rentalForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-file-earmark-text me-2"></i>Datos del Contrato</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="rentCliente" className="form-label fw-medium">
                      Cliente <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="rentCliente" name="clienteId" required defaultValue="">
                      <option value="" disabled>-- Seleccionar cliente --</option>
                      {clients.map(c => (
                        <option key={c.codCliente} value={c.codCliente}>
                          {c.apellidos}, {c.nombres} ({c.tipoDocumento}: {c.numeroDocumento})
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Selecciona un cliente.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rentFechaInicio" className="form-label fw-medium">
                      Fecha de Inicio <span className="text-danger">*</span>
                    </label>
                    <input type="date" className="form-control" id="rentFechaInicio" name="fechaInicio" required />
                    <div className="invalid-feedback">La fecha de inicio es obligatoria.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="rentFechaFin" className="form-label fw-medium">
                      Fecha de Fin <span className="text-danger">*</span>
                    </label>
                    <input type="date" className="form-control" id="rentFechaFin" name="fechaFin" required />
                    <div className="invalid-feedback">La fecha de fin es obligatoria.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rentPeriodo" className="form-label fw-medium">
                      Periodo <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="rentPeriodo" name="periodo" required defaultValue="DIA">
                      <option value="DIA">DIARIO</option>
                      <option value="SEMANA">SEMANAL</option>
                      <option value="MES">MENSUAL</option>
                    </select>
                    <div className="invalid-feedback">Selecciona un periodo.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="rentCantidad" className="form-label fw-medium">
                      Cantidad (Periodo) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="rentCantidad" name="cantidad"
                           placeholder="Ej: 1" min="1" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="rentPrice" className="form-label fw-medium">
                      Costo Total (S/) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" step="0.01" className="form-control" id="rentPrice" name="price"
                             placeholder="0.00" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-sliders me-2"></i>Estado del Alquiler</h6>
              </div>
              <div className="form-card-body">
                <div className="mb-3">
                  <label htmlFor="rentEstado" className="form-label fw-medium">Estado</label>
                  <select className="form-select" id="rentEstado" name="estado" defaultValue="REGISTRADO">
                    <option value="REGISTRADO">Registrado</option>
                    <option value="EN EJECUCION">En Ejecución</option>
                    <option value="FINALIZADO" disabled>Finalizado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-file-earmark-text me-2"></i>Asignación de Fotocopiadoras</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-lg-6">
                    <div className="input-group">
                      <select
                        className="form-select"
                        id="filterPhoto"
                        value={photoSelectId}
                        onChange={(e) => setPhotoSelectId(e.target.value)}
                      >
                        <option value="" disabled>-- Seleccionar fotocopiadora --</option>
                        {availablePhotocopiers.map(f => (
                          <option key={f.codFotocopiadora} value={f.codFotocopiadora}
                            disabled={!!selectedPhotos.find(p => p.codFotocopiadora === f.codFotocopiadora)}>
                            {f.codFotocopiadora} - {f.nombre} ({f.modelo})
                          </option>
                        ))}
                      </select>
                      <button type="button" className="btn btn-outline-primary" onClick={handleAddPhoto}>
                        <i className="bi bi-plus me-1"></i> Agregar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover mb-0" id="photocopierTable">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>N° Serie</th>
                        <th>Ancho (cm)</th>
                        <th>Alto (cm)</th>
                        <th>Fondo (cm)</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPhotos.map(f => (
                        <tr key={f.codFotocopiadora}>
                          <td className="text-muted fw-medium">{f.codFotocopiadora}</td>
                          <td>{f.nombre}</td>
                          <td>{f.marca}</td>
                          <td>{f.modelo}</td>
                          <td><code className="text-muted">{f.serie}</code></td>
                          <td>{f.ancho} cm</td>
                          <td>{f.alto} cm</td>
                          <td>{f.fondo} cm</td>
                          <td className="text-center">
                            <button type="button" className="btn btn-sm btn-outline-danger" title="Quitar" onClick={() => handleRemovePhoto(f.codFotocopiadora)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {selectedPhotos.length === 0 && (
                        <tr>
                          <td colSpan={9} className="text-center py-4 text-muted">No se han asignado equipos.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/rentals" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarAlquiler" disabled={submitting}>
            <i className="bi bi-save2 me-1"></i>{submitting ? 'Guardando...' : isEdit ? 'Actualizar' : 'Registrar Alquiler'}
          </button>
        </div>
      </form>
    </>
  );
};

export default RentalForm;
