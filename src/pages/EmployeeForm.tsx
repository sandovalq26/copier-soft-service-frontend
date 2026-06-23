import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getEmployeeById, createEmployee, updateEmployee } from '../api/employeeService';
import type { EmployeeDTO } from '../api/employeeService';

const EmployeeForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<EmployeeDTO>({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    cargo: '',
    telefono: '',
    correo: '',
    usuario: '',
    contrasena: ''
  });
  
  const [loading, setLoading] = useState<boolean>(isEdit);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formTitle = isEdit ? "Editar Empleado" : "Nuevo Empleado";
  const formDesc = isEdit ? "Modifica los datos del empleado" : "Completa los datos para registrar un nuevo empleado";

  useEffect(() => {
    if (isEdit && id) {
      const fetchEmployee = async () => {
        try {
          const data = await getEmployeeById(id);
          // Al editar la contraseña no se recibe del backend
          setFormData({ ...data, contrasena: '' });
        } catch (error) {
          console.error("Error fetching employee:", error);
          setErrorMsg("No se pudo cargar la información del empleado.");
        } finally {
          setLoading(false);
        }
      };
      fetchEmployee();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrorMsg('');

    if (form.checkValidity()) {
      setSaving(true);
      try {
        if (isEdit && id) {
          await updateEmployee(id, formData);
        } else {
          await createEmployee(formData);
        }
        navigate('/employees');
      } catch (error: any) {
        console.error("Error saving employee:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Ocurrió un error al guardar el empleado. Verifica los datos.");
        }
      } finally {
        setSaving(false);
      }
    } else {
      form.classList.add('was-validated');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

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

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

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
                    <select className="form-select" id="empTipoDoc" name="tipoDocumento" required
                            value={formData.tipoDocumento} onChange={handleChange}>
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
                           placeholder="Ej: 45231876" maxLength={15} required
                           value={formData.numeroDocumento} onChange={handleChange} />
                    <div className="invalid-feedback">Documento requerido.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="empNombres" className="form-label fw-medium">
                      Nombres <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="empNombres" name="nombres"
                           placeholder="Ej: Juan Carlos" required
                           value={formData.nombres} onChange={handleChange} />
                    <div className="invalid-feedback">El nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empApellidos" className="form-label fw-medium">
                      Apellidos <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="empApellidos" name="apellidos"
                           placeholder="Ej: García López" required
                           value={formData.apellidos} onChange={handleChange} />
                    <div className="invalid-feedback">Los apellidos son obligatorios.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="empTelefono" className="form-label fw-medium">Teléfono</label>
                    <input type="tel" className="form-control" id="empTelefono" name="telefono"
                           placeholder="Ej: 987 654 321"
                           value={formData.telefono} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empEmail" className="form-label fw-medium">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input type="email" className="form-control" id="empEmail" name="correo"
                           placeholder="usuario@copiersoft.pe" required
                           value={formData.correo} onChange={handleChange} />
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
                    <label htmlFor="empUsuario" className="form-label fw-medium">Usuario del Sistema <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" id="empUsuario" name="usuario" required
                           placeholder="Ej: j.garcia" value={formData.usuario} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="empContrasena" className="form-label fw-medium">
                      Contraseña {isEdit ? <small className="text-muted fw-normal">(dejar en blanco para no cambiar)</small> : <span className="text-danger">*</span>}
                    </label>
                    <input type="password" className="form-control" id="empContrasena" name="contrasena"
                           placeholder="••••••••" required={!isEdit}
                           value={formData.contrasena || ''} onChange={handleChange} />
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
                  <select className="form-select" id="empCargo" name="cargo" required
                          value={formData.cargo} onChange={handleChange}>
                    <option value="" disabled>Seleccionar...</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="TECNICO">TÉCNICO</option>
                    <option value="RECEPCIONISTA">RECEPCIONISTA</option>
                    <option value="VENDEDOR">VENDEDOR</option>
                  </select>
                  <div className="invalid-feedback">Selecciona un cargo.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/employees" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarEmpleado" disabled={saving}>
            {saving ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-save2 me-1"></i>
            )}
            {isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
