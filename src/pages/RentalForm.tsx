import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const RentalForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const formTitle = isEdit ? "Editar Alquiler" : "Nuevo Alquiler";
  const formDesc = isEdit ? "Modifica los datos del contrato de alquiler" : "Registra un nuevo contrato de alquiler";

  // Mock available photocopiers
  const availablePhotocopiers = [
    { id: 'F001', nombre: 'Impresora A', marca: 'Canon', modelo: 'X1', serie: 'SN123', anio: 2023, ancho: 50, alto: 60, fondo: 50 },
    { id: 'F002', nombre: 'Impresora B', marca: 'Ricoh', modelo: 'R2', serie: 'SN456', anio: 2022, ancho: 60, alto: 70, fondo: 60 }
  ];

  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);
  const [photoSelectId, setPhotoSelectId] = useState('');

  const handleAddPhoto = () => {
    if (!photoSelectId) return;
    const photo = availablePhotocopiers.find(p => p.id === photoSelectId);
    if (photo && !selectedPhotos.find(p => p.id === photo.id)) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
    setPhotoSelectId('');
  };

  const handleRemovePhoto = (photoId: string) => {
    setSelectedPhotos(selectedPhotos.filter(p => p.id !== photoId));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate('/rentals');
    } else {
      form.classList.add('was-validated');
    }
  };

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
                      <option value="C001">Lopez, Carlos (DNI: 11112222)</option>
                      <option value="C002">Empresa SAC (RUC: 20123456789)</option>
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
                          <option key={f.id} value={f.id} disabled={!!selectedPhotos.find(p => p.id === f.id)}>
                            {f.id} - {f.nombre} ({f.modelo})
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
                        <th>Año de Fabricación</th>
                        <th>Ancho (cm)</th>
                        <th>Alto (cm)</th>
                        <th>Fondo (cm)</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPhotos.map(f => (
                        <tr key={f.id}>
                          <td className="text-muted fw-medium">{f.id}</td>
                          <td>{f.nombre}</td>
                          <td>{f.marca}</td>
                          <td>{f.modelo}</td>
                          <td><code className="text-muted">{f.serie}</code></td>
                          <td className="text-end">{f.anio}</td>
                          <td>{f.ancho} cm</td>
                          <td>{f.alto} cm</td>
                          <td>{f.fondo} cm</td>
                          <td className="text-center">
                            <button type="button" className="btn btn-sm btn-outline-danger" title="Quitar" onClick={() => handleRemovePhoto(f.id)}>
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {selectedPhotos.length === 0 && (
                        <tr>
                          <td colSpan={10} className="text-center py-4 text-muted">No se han asignado equipos.</td>
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
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarAlquiler">
            <i className="bi bi-save2 me-1"></i>{isEdit ? "Actualizar" : "Registrar Alquiler"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RentalForm;
