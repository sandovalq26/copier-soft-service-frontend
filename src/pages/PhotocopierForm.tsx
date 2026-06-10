import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PhotocopierForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const formTitle = isEdit ? "Editar Fotocopiadora" : "Nueva Fotocopiadora";
  const formDesc = isEdit ? "Modifica los datos del equipo" : "Registra un nuevo equipo en el inventario";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate('/photocopiers');
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
        <Link to="/photocopiers" className="btn btn-outline-secondary" id="btnVolverFotocopiadoras">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="photocopierForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-printer me-2"></i>Datos del Equipo</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="photoAlmacen" className="form-label fw-medium">
                      Almacén <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="photoAlmacen" name="almacen" required defaultValue="">
                      <option value="" disabled>Seleccionar...</option>
                      <option value="A001">Sede Principal</option>
                      <option value="A002">Almacén Norte</option>
                    </select>
                    <div className="invalid-feedback">El Almacén es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoProveedor" className="form-label fw-medium">
                      Proveedor <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="photoProveedor" name="proveedor" required defaultValue="">
                      <option value="" disabled>Seleccionar...</option>
                      <option value="P001">Canon SAC</option>
                      <option value="P002">Ricoh Peru</option>
                    </select>
                    <div className="invalid-feedback">El Proveedor es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoNombre" className="form-label fw-medium">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoNombre" name="nombre"
                           placeholder="Ej: Fotocopiadora Multifuncional" required />
                    <div className="invalid-feedback">El Nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoMarca" className="form-label fw-medium">
                      Marca <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoMarca" name="marca"
                           placeholder="Ej: Canon" required />
                    <div className="invalid-feedback">La Marca es obligatoria.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoModelo" className="form-label fw-medium">
                      Modelo <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoModelo" name="modelo"
                           placeholder="Ej: IR 2520" required />
                    <div className="invalid-feedback">El modelo es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoSerie" className="form-label fw-medium">
                      N° de Serie <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoSerie" name="serie"
                           placeholder="Ej: SN-C2520-001" required />
                    <div className="invalid-feedback">El número de serie es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoFabricacion" className="form-label fw-medium">
                      Año de Fabricación <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoFabricacion" name="fabricacion"
                           placeholder="Ej: 2026" min="1990" max="2100" required defaultValue="2025" />
                    <div className="invalid-feedback">El año de fabricación es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoAncho" className="form-label fw-medium">
                      Ancho (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoAncho" name="ancho"
                           placeholder="Ej: 100" min="1" required />
                    <div className="invalid-feedback">El ancho es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoAlto" className="form-label fw-medium">
                      Alto (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoAlto" name="alto"
                           placeholder="Ej: 100" min="1" required />
                    <div className="invalid-feedback">El alto es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoFondo" className="form-label fw-medium">
                      Fondo (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoFondo" name="fondo"
                           placeholder="Ej: 100" min="1" required />
                    <div className="invalid-feedback">El fondo es obligatorio.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-sliders me-2"></i>Estado</h6>
              </div>
              <div className="form-card-body">
                <div className="mb-0">
                  <label htmlFor="photoEstado" className="form-label fw-medium">Estado</label>
                  <select className="form-select" id="photoEstado" name="estado" defaultValue="DISPONIBLE">
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="ALQUILADO">En Alquiler</option>
                    <option value="MANTENIMIENTO">Mantenimiento</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/photocopiers" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarFotocopiadora">
            <i className="bi bi-save2 me-1"></i>{isEdit ? "Actualizar Equipo" : "Guardar Equipo"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PhotocopierForm;
