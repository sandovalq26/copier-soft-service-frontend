import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllEmployees } from '../api/employeeService';
import type { EmployeeDTO } from '../api/employeeService';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err: any) {
        console.error('Error fetching employees:', err);
        setError('Ocurrió un error al intentar cargar los empleados.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
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
          <h2 className="page-title">Empleados</h2>
          <p className="page-description">Gestión del personal de la empresa</p>
        </div>
        <Link to="/employees/new" className="btn btn-primary" id="btnNuevoEmpleado">
          <i className="bi bi-plus-lg me-1"></i>Nuevo Empleado
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Empleados</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="employeeTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>Documento</th>
                <th>Nombres</th>
                <th>Cargo</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No hay empleados registrados.</td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.codEmpleado}>
                    <td className="text-muted fw-medium">{emp.codEmpleado}</td>
                    <td>{emp.tipoDocumento}: {emp.numeroDocumento}</td>
                    <td><strong>{emp.nombres} {emp.apellidos}</strong></td>
                    <td><span className="badge bg-primary-subtle text-primary fw-semibold">{emp.cargo}</span></td>
                    <td>{emp.telefono || "-"}</td>
                    <td>{emp.correo || "-"}</td>
                    <td className="text-center">
                      <Link to={`/employees/edit/${emp.codEmpleado}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
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

export default EmployeeList;
