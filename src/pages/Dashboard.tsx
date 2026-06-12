import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../api/dashboardService';
import type { DashboardStatsDTO } from '../api/dashboardService';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStatsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Error fetching dashboard stats', err);
        setError('No se pudieron cargar las estadísticas del dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const today = new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="alert alert-danger" role="alert">
        {error || 'Error al cargar datos.'}
      </div>
    );
  }

  const {
    totalEmpleados,
    totalClientes,
    totalFotocopiadoras,
    alquileresActivos,
    alquileresRecientes,
    pagosRecientes
  } = stats;

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
                      <td className="text-muted fw-medium">{item.codAlquiler}</td>
                      <td>{item.clienteApellidos}, {item.clienteNombres}</td>
                      <td>{item.fechaInicio}</td>
                      <td>{item.fechaFin}</td>
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
                      <td>{pago.clienteApellidos}, {pago.clienteNombres}</td>
                      <td className="text-end">S/ {pago.importeTotal}</td>
                      <td><span className="badge bg-success-subtle text-success fw-semibold">{pago.medioPagoNombre}</span></td>
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
