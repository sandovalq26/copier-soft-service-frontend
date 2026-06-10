import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EmployeeForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const formTitle = isEdit ? "Editar Empleado" : "Nuevo Empleado";
  const formDesc = isEdit ? "Modifica los datos del empleado" : "Completa los datos para registrar un nuevo empleado";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Simulamos que guarda y regresa
      navigate('/employees');
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
        <Link to="/employees" className="btn btn-outline-secondary" id="btnVolverEmpleados">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="employeeForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-person me-2"></i>Información Personal</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="empTipoDoc" className="form-label fw-medium">
                      Tipo de Documento <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="empTipoDoc" name="tipoDocumento" required defaultValue="">
                      <option value="" disabled>Seleccionar...</option>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CEX">CEX</option>
                    </select>
                    <div className="invalid-feedback">Selecciona tipo de documento.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empNumDoc" className="form-label fw-medium">
                      Número de Documento <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="empNumDoc" name="numeroDocumento"
                           placeholder="Ej: 45231876" maxLength={8} pattern="\d{8}" required />
                    <div className="invalid-feedback">Documento debe tener 8 dígitos.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="empNombres" className="form-label fw-medium">
                      Nombres <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="empNombres" name="nombres"
                           placeholder="Ej: Juan Carlos" required />
                    <div className="invalid-feedback">El nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empApellidos" className="form-label fw-medium">
                      Apellidos <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="empApellidos" name="apellidos"
                           placeholder="Ej: García López" required />
                    <div className="invalid-feedback">Los apellidos son obligatorios.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="empTelefono" className="form-label fw-medium">Teléfono</label>
                    <input type="tel" className="form-control" id="empTelefono" name="telefono"
                           placeholder="Ej: 987 654 321" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empEmail" className="form-label fw-medium">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input type="email" className="form-control" id="empEmail" name="correo"
                           placeholder="usuario@copiersoft.pe" required />
                    <div className="invalid-feedback">Email inválido.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-telephone me-2"></i>Contacto y Acceso al Sistema</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="empUsuario" className="form-label fw-medium">Usuario del Sistema</label>
                    <input type="text" className="form-control" id="empUsuario" name="usuario"
                           placeholder="Ej: j.garcia" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empContrasena" className="form-label fw-medium">
                      Contraseña {isEdit ? <small className="text-muted fw-normal">(dejar en blanco para no cambiar)</small> : <span className="text-danger">*</span>}
                    </label>
                    <input type="password" className="form-control" id="empContrasena" name="contrasena"
                           placeholder="••••••••" required={!isEdit} />
                    <div className="invalid-feedback">La contraseña es obligatoria.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-sliders me-2"></i>Configuración</h6>
              </div>
              <div className="form-card-body">
                <div className="mb-3">
                  <label htmlFor="empCargo" className="form-label fw-medium">
                    Cargo <span className="text-danger">*</span>
                  </label>
                  <select className="form-select" id="empCargo" name="cargo" required defaultValue="">
                    <option value="" disabled>Seleccionar...</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="TECNICO">TÉCNICO</option>
                    <option value="RECEPCIONISTA">RECEPCIONISTA</option>
                  </select>
                  <div className="invalid-feedback">Selecciona un cargo.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/employees" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarEmpleado">
            <i className="bi bi-save2 me-1"></i>{isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
