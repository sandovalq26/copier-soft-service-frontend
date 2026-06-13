import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSuppliers } from '../api/supplierService';
import type { SupplierDTO } from '../api/supplierService';

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<SupplierDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (err: any) {
        console.error('Error fetching suppliers:', err);
        setError('Ocurrió un error al intentar cargar los proveedores.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

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
          <h2 className="page-title">Proveedores</h2>
          <p className="page-description">Gestión de proveedores de fotocopiadoras</p>
        </div>
        <Link to="/suppliers/new" className="btn btn-primary" id="btnNuevoProveedor">
          <i className="bi bi-plus-lg me-1"></i>Nuevo Proveedor
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Proveedores</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="supplierTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>RUC</th>
                <th>Razón Social</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">No hay proveedores registrados.</td>
                </tr>
              ) : (
                suppliers.map((prov) => (
                  <tr key={prov.codProveedor}>
                    <td className="text-muted fw-medium">{prov.codProveedor}</td>
                    <td>{prov.rucEmpresa}</td>
                    <td><strong>{prov.razonSocial}</strong></td>
                    <td>{prov.direccion || "-"}</td>
                    <td>{prov.correo || "-"}</td>
                    <td className="text-center">
                      <Link to={`/suppliers/edit/${prov.codProveedor}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
                        <i className="bi bi-pencil"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
