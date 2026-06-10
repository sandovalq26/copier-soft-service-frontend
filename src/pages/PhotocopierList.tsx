import React from 'react';
import { Link } from 'react-router-dom';

const PhotocopierList: React.FC = () => {
  // Mock data for photocopiers
  const photocopiers = [
    {
      id: 'F0001', nombre: 'Impresora A', marca: 'Canon', modelo: 'X1', serie: 'SN123',
      anio: 2023, ancho: 50, alto: 60, fondo: 50, estado: 'DISPONIBLE',
      almacen: 'Sede Principal', proveedorRuc: '20123456789', proveedorRazon: 'Canon Peru SAC'
    },
    {
      id: 'F0002', nombre: 'Multifuncional B', marca: 'Ricoh', modelo: 'M2', serie: 'SN987',
      anio: 2022, ancho: 60, alto: 100, fondo: 60, estado: 'ALQUILADO',
      almacen: 'Sede Sur', proveedorRuc: '20987654321', proveedorRazon: 'Ricoh S.A.'
    }
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Fotocopiadoras</h2>
          <p className="page-description">Inventario de equipos disponibles para alquiler</p>
        </div>
        <Link to="/photocopiers/new" className="btn btn-primary" id="btnNuevaMaquina">
          <i className="bi bi-plus-lg me-1"></i>Nueva Fotocopiadora
        </Link>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Fotocopiadoras</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="photocopierTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>N° Serie</th>
                <th>Año</th>
                <th>Medidas (cm)</th>
                <th>Estado</th>
                <th>Almacén</th>
                <th>Proveedor</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {photocopiers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-4 text-muted">No hay equipos registrados.</td>
                </tr>
              ) : (
                photocopiers.map((item) => {
                  let statusClass = "bg-secondary-subtle text-secondary";
                  if (item.estado === "DISPONIBLE") statusClass = "bg-success-subtle text-success";
                  else if (item.estado === "ALQUILADO") statusClass = "bg-warning-subtle text-warning";
                  else if (item.estado === "MANTENIMIENTO") statusClass = "bg-danger-subtle text-danger";

                  return (
                    <tr key={item.id}>
                      <td className="text-muted fw-medium">{item.id}</td>
                      <td className="fw-semibold">{item.nombre}</td>
                      <td>{item.marca}</td>
                      <td>{item.modelo}</td>
                      <td><code className="text-muted">{item.serie}</code></td>
                      <td className="text-center">{item.anio}</td>
                      <td className="small">
                        <span className="d-block">An: {item.ancho}</span>
                        <span className="d-block">Al: {item.alto}</span>
                        <span className="d-block">Fo: {item.fondo}</span>
                      </td>
                      <td>
                        <span className={`badge ${statusClass} fw-semibold`}>
                          <i className="bi bi-circle-fill me-1" style={{ fontSize: '.4rem' }}></i>
                          {item.estado}
                        </span>
                      </td>
                      <td className="small text-uppercase">{item.almacen}</td>
                      <td>
                        <p className="mb-0 small fw-medium">{item.proveedorRazon}</p>
                        <p className="mb-0 x-small text-muted">RUC: {item.proveedorRuc}</p>
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <Link to={`/photocopiers/edit/${item.id}`} className="btn btn-sm btn-outline-primary" title="Editar">
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PhotocopierList;
