import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RentalList: React.FC = () => {
  // Mock data
  const rentals = [
    {
      id: 'AQ0001', cliDoc: 'DNI: 11112222', cliNom: 'Carlos Lopez',
      inicio: '2026-06-01', fin: '2026-06-30', periodo: 'MENSUAL', valor: 1, precio: '150.00', estado: 'EN EJECUCION',
      equipos: [
        { id: 'F0001', nombre: 'Impresora A', marca: 'Canon', modelo: 'X1', serie: 'SN123', dimensiones: '50x60x50' }
      ]
    }
  ];

  const [selectedRental, setSelectedRental] = useState<any>(null);

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

                return (
                  <tr key={item.id}>
                    <td className="text-muted fw-medium">{item.id}</td>
                    <td>
                      <p className="mb-0">{item.cliDoc}</p>
                      <p className="mb-0">{item.cliNom}</p>
                    </td>
                    <td>{item.inicio}</td>
                    <td>{item.fin}</td>
                    <td>{item.periodo}</td>
                    <td className="text-center fw-semibold">{item.valor}</td>
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
                      <Link to={`/rentals/edit/${item.id}`} className="btn btn-sm btn-outline-primary me-1" title="Editar">
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <button className="btn btn-sm btn-outline-danger btn-eliminar" title="Eliminar" disabled={item.estado === "FINALIZADO"}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
              {!selectedRental || selectedRental.equipos.length === 0 ? (
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
                      {selectedRental.equipos.map((f: any) => (
                        <tr key={f.id}>
                          <td className="fw-bold text-primary">{f.id}</td>
                          <td>{f.nombre}</td>
                          <td>
                            <span className="d-block fw-semibold">{f.marca}</span>
                            <span className="text-muted small">{f.modelo}</span>
                          </td>
                          <td><code className="text-secondary">{f.serie}</code></td>
                          <td className="text-center">
                            <small className="text-muted">{f.dimensiones} cm</small>
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
