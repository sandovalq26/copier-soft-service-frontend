import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList: React.FC = () => {
  // Mock data for employees
  const employees = [
    { id: 'E0001', tipoDoc: 'DNI', numDoc: '12345678', nombres: 'Juan', apellidos: 'Perez', cargo: 'VENDEDOR', telefono: '987654321', email: 'juan@example.com' },
    { id: 'E0002', tipoDoc: 'DNI', numDoc: '87654321', nombres: 'Maria', apellidos: 'Gomez', cargo: 'ADMINISTRADOR', telefono: '912345678', email: 'maria@example.com' }
  ];

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
                  <tr key={emp.id}>
                    <td className="text-muted fw-medium">{emp.id}</td>
                    <td>{emp.tipoDoc}: {emp.numDoc}</td>
                    <td>{emp.nombres} {emp.apellidos}</td>
                    <td><span className="badge bg-primary-subtle text-primary fw-semibold">{emp.cargo}</span></td>
                    <td>{emp.telefono || "-"}</td>
                    <td>{emp.email || "-"}</td>
                    <td className="text-center">
                      <Link to={`/employees/edit/${emp.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
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

export default EmployeeList;
