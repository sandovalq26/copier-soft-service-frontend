import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPhotocopiers } from '../api/photocopierService';
import { getAllWarehouses } from '../api/warehouseService';
import { getAllSuppliers } from '../api/supplierService';
import type { PhotocopierDTO } from '../api/photocopierService';
import type { WarehouseDTO } from '../api/warehouseService';
import type { SupplierDTO } from '../api/supplierService';

const PhotocopierList: React.FC = () => {
  const [photocopiers, setPhotocopiers] = useState<PhotocopierDTO[]>([]);
  const [warehouses, setWarehouses] = useState<WarehouseDTO[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photoData, wareData, suppData] = await Promise.all([
          getAllPhotocopiers(),
          getAllWarehouses(),
          getAllSuppliers()
        ]);
        setPhotocopiers(photoData);
        setWarehouses(wareData);
        setSuppliers(suppData);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError('Ocurrió un error al intentar cargar las fotocopiadoras.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWarehouseName = (id: string) => {
    const w = warehouses.find(w => w.codAlmacen === id);
    return w ? w.nombre : id;
  };

  const getSupplierName = (id: string) => {
    const s = suppliers.find(s => s.codProveedor === id);
    return s ? s.razonSocial : id;
  };

  const getSupplierDoc = (id: string) => {
    const s = suppliers.find(s => s.codProveedor === id);
    return s ? s.rucEmpresa : '';
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
          <h2 className="page-title">Fotocopiadoras</h2>
          <p className="page-description">Inventario de equipos disponibles para alquiler</p>
        </div>
        <Link to="/photocopiers/new" className="btn btn-primary" id="btnNuevaMaquina">
          <i className="bi bi-plus-lg me-1"></i>Nueva Fotocopiadora
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Fotocopiadoras</h5>
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
                <th>Año</th>
                <th>Medidas (cm)</th>
                <th>Estado</th>
                <th>Almacén</th>
                <th>Proveedor</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {photocopiers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-4 text-muted">No hay equipos registrados.</td>
                </tr>
              ) : (
                photocopiers.map((item) => {
                  let statusClass = "bg-secondary-subtle text-secondary";
                  if (item.estado === "DISPONIBLE") statusClass = "bg-success-subtle text-success";
                  else if (item.estado === "ALQUILADO") statusClass = "bg-warning-subtle text-warning";
                  else if (item.estado === "MANTENIMIENTO") statusClass = "bg-danger-subtle text-danger";

                  return (
                    <tr key={item.codFotocopiadora}>
                      <td className="text-muted fw-medium">{item.codFotocopiadora}</td>
                      <td className="fw-semibold">{item.nombre}</td>
                      <td>{item.marca}</td>
                      <td>{item.modelo}</td>
                      <td><code className="text-muted">{item.serie}</code></td>
                      <td className="text-center">{item.anioFabricacion}</td>
                      <td className="small">
                        <span className="d-block">An: {item.ancho}</span>
                        <span className="d-block">Al: {item.alto}</span>
                        <span className="d-block">Fo: {item.fondo}</span>
                      </td>
                      <td>
                        <span className={`badge ${statusClass} fw-semibold`}>
                          <i className="bi bi-circle-fill me-1" style={{ fontSize: '.4rem' }}></i>
                          {item.estado}
                        </span>
                      </td>
                      <td className="small text-uppercase">{getWarehouseName(item.codAlmacen)}</td>
                      <td>
                        <p className="mb-0 small fw-medium">{getSupplierName(item.codProveedor)}</p>
                        <p className="mb-0 x-small text-muted">RUC: {getSupplierDoc(item.codProveedor)}</p>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <Link to={`/photocopiers/edit/${item.codFotocopiadora}`} className="btn btn-sm btn-outline-primary" title="Editar">
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PhotocopierList;
