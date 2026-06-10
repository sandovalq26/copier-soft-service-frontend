import React from 'react';
import { Link } from 'react-router-dom';

const CustomerList: React.FC = () => {
  // Mock data for customers
  const customers = [
    { id: 'C0001', tipoDoc: 'DNI', numDoc: '11112222', nombres: 'Carlos', apellidos: 'Lopez', direccion: 'Av. Siempre Viva 123', telefono: '999888777', email: 'carlos@example.com' },
    { id: 'C0002', tipoDoc: 'RUC', numDoc: '20123456789', nombres: 'Empresa', apellidos: 'SAC', direccion: 'Calle Falsa 456', telefono: '988777666', email: 'contacto@empresa.com' }
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Clientes</h2>
          <p className="page-description">Gestión de clientes registrados</p>
        </div>
        <Link to="/customers/new" className="btn btn-primary" id="btnNuevoCliente">
          <i className="bi bi-plus-lg me-1"></i>Nuevo Cliente
        </Link>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Clientes</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="customerTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>Documento</th>
                <th>Nombres</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No hay clientes registrados.</td>
                </tr>
              ) : (
                customers.map((cli) => (
                  <tr key={cli.id}>
                    <td className="text-muted fw-medium">{cli.id}</td>
                    <td>{cli.tipoDoc}: {cli.numDoc}</td>
                    <td>{cli.nombres} {cli.apellidos}</td>
                    <td>{cli.direccion || "-"}</td>
                    <td>{cli.telefono || "-"}</td>
                    <td>{cli.email || "-"}</td>
                    <td className="text-center">
                      <Link to={`/customers/edit/${cli.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button className="btn btn-sm btn-outline-danger btn-eliminar" title="Eliminar">
                        <i className="bi bi-trash"></i>
                      </button>
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

export default CustomerList;
