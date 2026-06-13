import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getSupplierById, createSupplier, updateSupplier } from '../api/supplierService';
import type { SupplierDTO } from '../api/supplierService';

const SupplierForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SupplierDTO>({
    rucEmpresa: '',
    razonSocial: '',
    direccion: '',
    correo: ''
  });
  const [loading, setLoading] = useState<boolean>(isEdit);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formTitle = isEdit ? "Editar Proveedor" : "Nuevo Proveedor";
  const formDesc = isEdit ? "Modifica los datos del proveedor" : "Completa los datos para registrar un nuevo proveedor";

  useEffect(() => {
    if (isEdit && id) {
      const fetchSupplier = async () => {
        try {
          const data = await getSupplierById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching supplier:", error);
          setErrorMsg("No se pudo cargar la información del proveedor.");
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          await updateSupplier(id, formData);
        } else {
          await createSupplier(formData);
        }
        navigate('/suppliers');
      } catch (error: any) {
        console.error("Error saving supplier:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Ocurrió un error al guardar el proveedor. Verifica los datos.");
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
        <Link to="/suppliers" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

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
                           placeholder="Ej: 20123456789" maxLength={11} pattern="\d{11}" required
                           value={formData.rucEmpresa} onChange={handleChange} />
                    <div className="invalid-feedback">El RUC debe tener 11 dígitos numéricos.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="provRazon" className="form-label fw-medium">
                      Razón Social <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="provRazon" name="razonSocial"
                           placeholder="Ej: Konica Minolta S.A." required
                           value={formData.razonSocial} onChange={handleChange} />
                    <div className="invalid-feedback">La razón social es obligatoria.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="provEmail" className="form-label fw-medium">Correo Electrónico</label>
                    <input type="email" className="form-control" id="provEmail" name="correo"
                           placeholder="ventas@proveedor.com"
                           value={formData.correo} onChange={handleChange} />
                    <div className="invalid-feedback">Ingresa un correo válido.</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="provDireccion" className="form-label fw-medium">Dirección</label>
                    <input type="text" className="form-control" id="provDireccion" name="direccion"
                           placeholder="Ej: Av. Industrial 123, Lima"
                           value={formData.direccion} onChange={handleChange} />
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
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarProveedor" disabled={saving}>
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

export default SupplierForm;
