// Erick_Alquileres
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getAllRentals, deleteRental, type AlquilerDTO} from '../api/rentalService';

const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<AlquilerDTO[]>([]);
  const [selectedRental, setSelectedRental] = useState<AlquilerDTO | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRentals = async () => {
    try {
      const data = await getAllRentals();
      setRentals(data);
    } catch (err) {
      console.error('Error al cargar alquileres:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este alquiler?')) return;
    try {
      await deleteRental(id);
      setRentals(prev => prev.filter(r => r.codAlquiler !== id));
    } catch (err) {
      console.error('Error al eliminar alquiler:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Alquileres</h2>
          <p className="page-description">Control de contratos de alquiler de equipos</p>
        </div>
        <div>
          <button className="btn btn-secondary me-2" id="btnDescargarAlquileres">
            <i className="bi bi-cloud-download-fill me-1"></i>Descargar reporte
          </button>
          <Link to="/rentals/new" className="btn btn-primary" id="btnNuevoAlquiler">
            <i className="bi bi-plus-lg me-1"></i>Nuevo Alquiler
          </Link>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Alquileres</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="rentalTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Periodo</th>
                <th>Cantidad / Periodo</th>
                <th className="text-end">Total</th>
                <th>Estado</th>
                <th>Fotocopiadoras</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((item) => {
                let statusClass = "bg-primary-subtle text-primary";
                if (item.estado === "FINALIZADO") statusClass = "bg-success-subtle text-success";
                else if (item.estado === "EN EJECUCION") statusClass = "bg-secondary-subtle text-secondary";

                const cliDoc = `${item.clienteTipoDocumento}: ${item.clienteNumeroDocumento}`;
                const cliNom = `${item.clienteNombres} ${item.clienteApellidos}`;

                return (
                  <tr key={item.codAlquiler}>
                    <td className="text-muted fw-medium">{item.codAlquiler}</td>
                    <td>
                      <p className="mb-0">{cliDoc}</p>
                      <p className="mb-0">{cliNom}</p>
                    </td>
                    <td>{item.fechaInicio}</td>
                    <td>{item.fechaFin}</td>
                    <td>{item.periodo}</td>
                    <td className="text-center fw-semibold">{item.valorPeriodo}</td>
                    <td className="text-end fw-semibold">S/ {item.precio}</td>
                    <td>
                      <span className={`badge ${statusClass} fw-semibold`}>{item.estado}</span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-decoration-none"
                        data-bs-toggle="modal"
                        data-bs-target="#fotosModal"
                        onClick={() => setSelectedRental(item)}
                      >
                        <i className="bi bi-eye me-1"></i>Ver fotocopiadoras
                      </button>
                    </td>
                    <td className="text-center">
                      <Link to={`/rentals/edit/${item.codAlquiler}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger btn-eliminar"
                        title="Eliminar"
                        disabled={item.estado === "FINALIZADO"}
                        onClick={() => handleDelete(item.codAlquiler)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rentals.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-4 text-muted">No hay alquileres registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Fotocopiadoras */}
      <div className="modal fade" id="fotosModal" tabIndex={-1} aria-labelledby="fotosModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="fotosModalLabel">
                <i className="bi bi-printer-fill me-2"></i>Equipos Asignados
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" id="fotosModalBody">
              {!selectedRental || selectedRental.fotocopiadoras.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-info-circle fs-2 d-block mb-2"></i>
                  Este contrato no tiene fotocopiadoras asignadas.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Marca/Modelo</th>
                        <th>N° Serie</th>
                        <th className="text-center">Dimensiones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRental.fotocopiadoras.map((f) => (
                        <tr key={f.codFotocopiadora}>
                          <td className="fw-bold text-primary">{f.codFotocopiadora}</td>
                          <td>{f.nombre}</td>
                          <td>
                            <span className="d-block fw-semibold">{f.marca}</span>
                            <span className="text-muted small">{f.modelo}</span>
                          </td>
                          <td><code className="text-secondary">{f.serie}</code></td>
                          <td className="text-center">
                            <small className="text-muted">{f.ancho}x{f.alto}x{f.fondo} cm</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="modal-footer border-top-0">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalList;
