import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCustomers } from '../api/customerService';
import type { CustomerDTO } from '../api/customerService';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (err: any) {
        console.error('Error fetching customers:', err);
        setError('Ocurrió un error al intentar cargar los clientes.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
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
          <h2 className="page-title">Clientes</h2>
          <p className="page-description">Gestión de clientes registrados</p>
        </div>
        <Link to="/customers/new" className="btn btn-primary" id="btnNuevoCliente">
          <i className="bi bi-plus-lg me-1"></i>Nuevo Cliente
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

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
                  <tr key={cli.codCliente}>
                    <td className="text-muted fw-medium">{cli.codCliente}</td>
                    <td>{cli.tipoDocumento}: {cli.numeroDocumento}</td>
                    <td><strong>{cli.nombres} {cli.apellidos}</strong></td>
                    <td>{cli.direccion || "-"}</td>
                    <td>{cli.telefono || "-"}</td>
                    <td>{cli.correo || "-"}</td>
                    <td className="text-center">
                      <Link to={`/customers/edit/${cli.codCliente}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
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

export default CustomerList;
