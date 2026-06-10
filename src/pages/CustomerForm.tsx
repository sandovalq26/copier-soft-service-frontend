import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CustomerForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const formTitle = isEdit ? "Editar Cliente" : "Nuevo Cliente";
  const formDesc = isEdit ? "Modifica los datos del cliente" : "Completa los datos para registrar un nuevo cliente";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate('/customers');
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
        <Link to="/customers" className="btn btn-outline-secondary" id="btnVolverClientes">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="customerForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-person me-2"></i>Datos Personales</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="custTipoDoc" className="form-label fw-medium">
                      Tipo de Documento <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="custTipoDoc" name="tipoDocumento" required defaultValue="">
                      <option value="" disabled>Seleccionar...</option>
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                      <option value="CEX">CEX</option>
                    </select>
                    <div className="invalid-feedback">Selecciona tipo de documento.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="custNumDoc" className="form-label fw-medium">
                      Número de Documento <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="custNumDoc" name="numeroDocumento"
                           placeholder="Ej: 71234567" maxLength={11} required />
                    <div className="invalid-feedback">Documento requerido.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="custNombres" className="form-label fw-medium">
                      Nombres <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="custNombres" name="nombres"
                           placeholder="Ej: Ana María" required />
                    <div className="invalid-feedback">El nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="custApellidos" className="form-label fw-medium">
                      Apellidos <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="custApellidos" name="apellidos"
                           placeholder="Ej: Castro Mendoza" required />
                    <div className="invalid-feedback">Los apellidos son obligatorios.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="custTelefono" className="form-label fw-medium">
                      Teléfono <span className="text-danger">*</span>
                    </label>
                    <input type="tel" className="form-control" id="custTelefono" name="telefono"
                           placeholder="Ej: 999 111 222" required />
                    <div className="invalid-feedback">El teléfono es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="custEmail" className="form-label fw-medium">Email</label>
                    <input type="email" className="form-control" id="custEmail" name="correo"
                           placeholder="cliente@correo.com" />
                    <div className="invalid-feedback">Email inválido.</div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="custDireccion" className="form-label fw-medium">Dirección</label>
                    <input type="text" className="form-control" id="custDireccion" name="direccion"
                           placeholder="Ej: Jr. Comercio 456, Lima" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-sliders me-2"></i>Información</h6>
              </div>
              <div className="form-card-body">
                <div className="mb-3">
                  <label className="form-label fw-medium">Fecha de Registro</label>
                  <p className="text-muted mb-0">Se asignará automáticamente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/customers" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarCliente">
            <i className="bi bi-save2 me-1"></i>{isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerForm;
