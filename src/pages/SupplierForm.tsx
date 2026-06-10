import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const SupplierForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const formTitle = isEdit ? "Editar Proveedor" : "Nuevo Proveedor";
  const formDesc = isEdit ? "Modifica los datos del proveedor" : "Completa los datos para registrar un nuevo proveedor";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate('/suppliers');
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
        <Link to="/suppliers" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="supplierForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="form-card mb-3">
              <div className="form-card-header">
                <h6><i className="bi bi-truck me-2"></i>Datos de la Empresa</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="provRuc" className="form-label fw-medium">
                      RUC de la Empresa <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="provRuc" name="rucEmpresa"
                           placeholder="Ej: 20123456789" maxLength={11} pattern="\d{11}" required />
                    <div className="invalid-feedback">El RUC debe tener 11 dígitos numéricos.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="provRazon" className="form-label fw-medium">
                      Razón Social <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="provRazon" name="razonSocial"
                           placeholder="Ej: Konica Minolta S.A." required />
                    <div className="invalid-feedback">La razón social es obligatoria.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="provEmail" className="form-label fw-medium">Correo Electrónico</label>
                    <input type="email" className="form-control" id="provEmail" name="correo"
                           placeholder="ventas@proveedor.com" />
                    <div className="invalid-feedback">Ingresa un correo válido.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="provDireccion" className="form-label fw-medium">Dirección</label>
                    <input type="text" className="form-control" id="provDireccion" name="direccion"
                           placeholder="Ej: Av. Industrial 123, Lima" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-info-circle me-2"></i>Información</h6>
              </div>
              <div className="form-card-body">
                <div className="mb-3">
                  <label className="form-label fw-medium">Código del Proveedor</label>
                  <p className="text-muted mb-0">{isEdit ? id : "Se generará automáticamente (PXXXX)"}</p>
                </div>
                <p className="small text-muted mb-0">
                  Los campos marcados con <span className="text-danger">*</span> son obligatorios.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/suppliers" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarProveedor">
            <i className="bi bi-save2 me-1"></i>{isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SupplierForm;
