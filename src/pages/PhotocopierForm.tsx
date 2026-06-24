import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPhotocopierById, createPhotocopier, updatePhotocopier } from '../api/photocopierService';
import { getAllWarehouses } from '../api/warehouseService';
import { getAllSuppliers } from '../api/supplierService';
import type { PhotocopierDTO } from '../api/photocopierService';
import type { WarehouseDTO } from '../api/warehouseService';
import type { SupplierDTO } from '../api/supplierService';

const PhotocopierForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PhotocopierDTO>({
    codAlmacen: '',
    codProveedor: '',
    nombre: '',
    marca: '',
    modelo: '',
    serie: '',
    anioFabricacion: new Date().getFullYear(),
    ancho: 0,
    alto: 0,
    fondo: 0,
    estado: 'DISPONIBLE'
  });

  const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const formTitle = isEdit ? "Editar Fotocopiadora" : "Nueva Fotocopiadora";
  const formDesc = isEdit ? "Modifica los datos del equipo" : "Registra un nuevo equipo en el inventario";

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [wData, sData] = await Promise.all([
          getAllWarehouses(),
          getAllSuppliers()
        ]);
        setWarehouses(wData);
        setSuppliers(sData);

        if (isEdit && id) {
          const pData = await getPhotocopierById(id);
          setFormData(pData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMsg("No se pudieron cargar los datos necesarios.");
      } finally {
        setLoading(false);
      }
    };

    loadDependencies();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let parsedValue: string | number = value;
    if (type === 'number') {
      parsedValue = value ? parseInt(value, 10) : 0;
    }
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrorMsg('');

    if (form.checkValidity()) {
      setSaving(true);
      try {
        if (isEdit && id) {
          await updatePhotocopier(id, formData);
        } else {
          await createPhotocopier(formData);
        }
        navigate('/photocopiers');
      } catch (error: any) {
        console.error("Error saving photocopier:", error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Ocurrió un error al guardar el equipo. Verifica los datos.");
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
        <Link to="/photocopiers" className="btn btn-outline-secondary" id="btnVolverFotocopiadoras">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      {errorMsg && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}

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
                    <select className="form-select" id="photoAlmacen" name="codAlmacen" required
                            value={formData.codAlmacen} onChange={handleChange}>
                      <option value="" disabled>Seleccionar...</option>
                      {warehouses.map(w => (
                        <option key={w.codAlmacen} value={w.codAlmacen}>{w.nombre}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">El Almacén es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoProveedor" className="form-label fw-medium">
                      Proveedor <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="photoProveedor" name="codProveedor" required
                            value={formData.codProveedor} onChange={handleChange}>
                      <option value="" disabled>Seleccionar...</option>
                      {suppliers.map(s => (
                        <option key={s.codProveedor} value={s.codProveedor}>{s.razonSocial} (RUC: {s.rucEmpresa})</option>
                      ))}
                    </select>
                    <div className="invalid-feedback">El Proveedor es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoNombre" className="form-label fw-medium">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoNombre" name="nombre"
                           placeholder="Ej: Fotocopiadora Multifuncional" required
                           value={formData.nombre} onChange={handleChange} />
                    <div className="invalid-feedback">El Nombre es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoMarca" className="form-label fw-medium">
                      Marca <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoMarca" name="marca"
                           placeholder="Ej: Canon" required
                           value={formData.marca} onChange={handleChange} />
                    <div className="invalid-feedback">La Marca es obligatoria.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoModelo" className="form-label fw-medium">
                      Modelo <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoModelo" name="modelo"
                           placeholder="Ej: IR 2520" required
                           value={formData.modelo} onChange={handleChange} />
                    <div className="invalid-feedback">El modelo es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoSerie" className="form-label fw-medium">
                      N° de Serie <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="photoSerie" name="serie"
                           placeholder="Ej: SN-C2520-001" required
                           value={formData.serie} onChange={handleChange} />
                    <div className="invalid-feedback">El número de serie es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoFabricacion" className="form-label fw-medium">
                      Año de Fabricación <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoFabricacion" name="anioFabricacion"
                           placeholder="Ej: 2026" min="1" max="9999" required
                           value={formData.anioFabricacion || ''} onChange={handleChange} />
                    <div className="invalid-feedback">El año de fabricación es obligatorio y válido.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoAncho" className="form-label fw-medium">
                      Ancho (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoAncho" name="ancho"
                           placeholder="Ej: 100" min="1" max="9999" required
                           value={formData.ancho || ''} onChange={handleChange} />
                    <div className="invalid-feedback">El ancho es obligatorio.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="photoAlto" className="form-label fw-medium">
                      Alto (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoAlto" name="alto"
                           placeholder="Ej: 100" min="1" max="9999" required
                           value={formData.alto || ''} onChange={handleChange} />
                    <div className="invalid-feedback">El alto es obligatorio.</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="photoFondo" className="form-label fw-medium">
                      Fondo (cm) <span className="text-danger">*</span>
                    </label>
                    <input type="number" className="form-control" id="photoFondo" name="fondo"
                           placeholder="Ej: 100" min="1" max="9999" required
                           value={formData.fondo || ''} onChange={handleChange} />
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
                  <select className="form-select" id="photoEstado" name="estado"
                          value={formData.estado} onChange={handleChange} disabled={!isEdit}>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="ALQUILADO" disabled={formData.estado !== 'ALQUILADO'}>En Alquiler</option>
                    {isEdit && <option value="MANTENIMIENTO">Mantenimiento</option>}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/photocopiers" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-primary px-4" id="btnGuardarFotocopiadora" disabled={saving}>
            {saving ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-save2 me-1"></i>
            )}
            {isEdit ? "Actualizar Equipo" : "Guardar Equipo"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PhotocopierForm;
