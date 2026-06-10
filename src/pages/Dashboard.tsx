import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const today = "10 de junio de 2026"; // Mock
  const totalEmpleados = 5;
  const totalClientes = 120;
  const totalFotocopiadoras = 45;
  const alquileresActivos = 18;

  const alquileresRecientes = [
    { id: 'AQ0001', cliente: 'Perez, Juan', inicio: '2026-06-01', fin: '2026-06-30', estado: 'EN EJECUCION', precio: '150.00' },
    { id: 'AQ0002', cliente: 'Gomez, Maria', inicio: '2026-05-15', fin: '2026-06-15', estado: 'FINALIZADO', precio: '200.00' }
  ];

  const pagosRecientes = [
    { cliente: 'Perez, Juan', monto: '150.00', medio: 'YAPE' },
    { cliente: 'Gomez, Maria', monto: '200.00', medio: 'EFECTIVO' }
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-description">Bienvenido al panel de administración</p>
        </div>
        <span className="text-muted small align-self-center">
          <i className="bi bi-calendar3 me-1"></i>{today}
        </span>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#e8f0fe' }}>
              <i className="bi bi-people-fill" style={{ color: '#1a73e8' }}></i>
            </div>
            <div>
              <div className="stat-value">{totalEmpleados}</div>
              <p className="stat-label">Empleados</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#e6f4ea' }}>
              <i className="bi bi-person-lines-fill" style={{ color: '#1e8e3e' }}></i>
            </div>
            <div>
              <div className="stat-value">{totalClientes}</div>
              <p className="stat-label">Clientes</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#fce8e6' }}>
              <i className="bi bi-printer-fill" style={{ color: '#d93025' }}></i>
            </div>
            <div>
              <div className="stat-value">{totalFotocopiadoras}</div>
              <p className="stat-label">Fotocopiadoras</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: '#fef3e2' }}>
              <i className="bi bi-file-earmark-text-fill" style={{ color: '#f09300' }}></i>
            </div>
            <div>
              <div className="stat-value">{alquileresActivos}</div>
              <p className="stat-label">Alquileres Activos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="table-card">
            <div className="table-card-header">
              <h5 className="table-card-title">
                <i className="bi bi-file-earmark-text me-2 text-primary"></i>Últimos Alquileres
              </h5>
              <Link to="/rentals" className="btn btn-sm btn-outline-primary">Ver todos</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Estado</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {alquileresRecientes.map((item, index) => (
                    <tr key={index}>
                      <td className="text-muted fw-medium">{item.id}</td>
                      <td>{item.cliente}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fin}</td>
                      <td>
                        <span className={`badge ${item.estado === 'FINALIZADO' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'} fw-semibold`}>
                          {item.estado}
                        </span>
                      </td>
                      <td className="text-end">S/ {item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="table-card h-100">
            <div className="table-card-header">
              <h5 className="table-card-title">
                <i className="bi bi-credit-card me-2 text-success"></i>Últimos Pagos
              </h5>
              <Link to="/payments" className="btn btn-sm btn-outline-success">Ver todos</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th className="text-end">Monto</th>
                    <th>Medio</th>
                  </tr>
                </thead>
                <tbody>
                  {pagosRecientes.map((pago, index) => (
                    <tr key={index}>
                      <td>{pago.cliente}</td>
                      <td className="text-end">S/ {pago.monto}</td>
                      <td><span className="badge bg-success-subtle text-success fw-semibold">{pago.medio}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
