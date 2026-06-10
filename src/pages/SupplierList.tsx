import React from 'react';
import { Link } from 'react-router-dom';

const SupplierList: React.FC = () => {
  // Mock data for suppliers
  const suppliers = [
    { id: 'P0001', ruc: '20102030405', razonSocial: 'Proveedor A SAC', direccion: 'Av. Industria 100', correo: 'ventas@proveedora.com' },
    { id: 'P0002', ruc: '20504030201', razonSocial: 'Distribuidora B EIRL', direccion: 'Calle Comercio 200', correo: 'contacto@distribuidorab.com' }
  ];

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
                  <tr key={prov.id}>
                    <td className="text-muted fw-medium">{prov.id}</td>
                    <td>{prov.ruc}</td>
                    <td><strong>{prov.razonSocial}</strong></td>
                    <td>{prov.direccion || "-"}</td>
                    <td>{prov.correo || "-"}</td>
                    <td className="text-center">
                      <Link to={`/suppliers/edit/${prov.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
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
