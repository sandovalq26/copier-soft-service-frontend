import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCustomerById, createCustomer, updateCustomer } from '../api/customerService';
import type { CustomerDTO } from '../api/customerService';

const CustomerForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CustomerDTO>({
    tipoDocumento: '',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    correo: ''
  });
  const [loading, setLoading] = useState<boolean>(isEdit);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formTitle = isEdit ? "Editar Cliente" : "Nuevo Cliente";
  const formDesc = isEdit ? "Modifica los datos del cliente" : "Completa los datos para registrar un nuevo cliente";

  useEffect(() => {
    if (isEdit && id) {
      const fetchCustomer = async () => {
        try {
          const data = await getCustomerById(id);
          setFormData(data);
        } catch (error) {
          console.error("Error fetching customer:", error);
          setErrorMsg("No se pudo cargar la información del cliente.");
        } finally {
          setLoading(false);
        }
      };
      fetchCustomer();
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
          await updateCustomer(id, formData);
        } else {
          await createCustomer(formData);
        }
        navigate('/customers');
      } catch (error: any) {
        console.error("Error saving customer:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Ocurrió un error al guardar el cliente. Verifica los datos.");
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
        <Link to="/customers" className="btn btn-outline-secondary" id="btnVolverClientes">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

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
                    <select className="form-select" id="custTipoDoc" name="tipoDocumento" required
                            value={formData.tipoDocumento} onChange={handleChange}>
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
                           placeholder="Ej: 71234567" maxLength={15} required
                           value={formData.numeroDocumento} onChange={handleChange} />
                    <div className="invalid-feedback">Documento requerido.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="custNombres" className="form-label fw-medium">
                      Nombres <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="custNombres" name="nombres"
                           placeholder="Ej: Ana María" required
                           value={formData.nombres} onChange={handleChange} />
                    <div className="invalid-feedback">El nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="custApellidos" className="form-label fw-medium">
                      Apellidos <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="custApellidos" name="apellidos"
                           placeholder="Ej: Castro Mendoza" required
                           value={formData.apellidos} onChange={handleChange} />
                    <div className="invalid-feedback">Los apellidos son obligatorios.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="custTelefono" className="form-label fw-medium">
                      Teléfono <span className="text-danger">*</span>
                    </label>
                    <input type="tel" className="form-control" id="custTelefono" name="telefono"
                           placeholder="Ej: 999 111 222" required
                           value={formData.telefono} onChange={handleChange} />
                    <div className="invalid-feedback">El teléfono es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="custEmail" className="form-label fw-medium">Email</label>
                    <input type="email" className="form-control" id="custEmail" name="correo"
                           placeholder="cliente@correo.com"
                           value={formData.correo} onChange={handleChange} />
                    <div className="invalid-feedback">Email inválido.</div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="custDireccion" className="form-label fw-medium">Dirección</label>
                    <input type="text" className="form-control" id="custDireccion" name="direccion"
                           placeholder="Ej: Jr. Comercio 456, Lima"
                           value={formData.direccion} onChange={handleChange} />
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
                  <label className="form-label fw-medium">Código del Cliente</label>
                  <p className="text-muted mb-0">{isEdit ? id : "Se generará automáticamente (CXXXX)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/customers" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarCliente" disabled={saving}>
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

export default CustomerForm;
