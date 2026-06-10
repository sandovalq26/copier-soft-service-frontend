import React from 'react';
import { Link } from 'react-router-dom';

const PaymentList: React.FC = () => {
  // Mock data
  const payments = [
    {
      id: 'PG0001', alquiler: 'AQ0001', cliDoc: 'DNI: 11112222', cliNom: 'Carlos Lopez',
      tipoPago: 'ALQUILER', comprobanteNom: 'FACTURA', comprobanteNum: 'F001-001',
      forma: 'CONTADO', medioNom: 'YAPE', subTotal: '100.00', igv: '18.00', total: '118.00',
      fecha: '28/04/2026'
    }
  ];

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Pagos</h2>
          <p className="page-description">Registro y seguimiento de pagos de alquileres</p>
        </div>
        <div>
          <button className="btn btn-secondary me-2" id="btnDescargarPagos">
            <i className="bi bi-cloud-download-fill me-1"></i>Descargar reporte
          </button>
          <Link to="/payments/new" className="btn btn-primary" id="btnNuevoPago">
            <i className="bi bi-plus-lg me-1"></i>Registrar Pago
          </Link>
        </div>
      </div>

      <div className="table-card">
        <div className="table-card-header">
          <h5 className="table-card-title">Lista de Pagos</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" id="paymentTable">
            <thead>
              <tr>
                <th>Código</th>
                <th>Alquiler</th>
                <th>Cliente</th>
                <th>Tipo Pago</th>
                <th>Comprobante</th>
                <th>Número</th>
                <th>Forma</th>
                <th>Medio de Pago</th>
                <th className="text-end">Sub Total</th>
                <th className="text-end">IGV</th>
                <th className="text-end">Total</th>
                <th>Fecha Pago</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4 text-muted">No hay pagos registrados.</td>
                </tr>
              ) : (
                payments.map((p) => {
                  let medioIcon = "bi-cash-coin text-success";
                  if (p.medioNom.includes("YAPE")) medioIcon = "bi-phone text-primary";
                  else if (p.medioNom.includes("PLIN")) medioIcon = "bi-phone text-info";
                  else if (p.medioNom.includes("TRANSFER") || p.medioNom.includes("DEPOSITO")) medioIcon = "bi-bank text-info";

                  return (
                    <tr key={p.id}>
                      <td className="text-muted fw-medium">{p.id}</td>
                      <td><span className="badge bg-light text-dark border">{p.alquiler}</span></td>
                      <td>
                        <p className="mb-0 text-muted small">{p.cliDoc}</p>
                        <p className="mb-0 fw-medium">{p.cliNom}</p>
                      </td>
                      <td>{p.tipoPago}</td>
                      <td>{p.comprobanteNom}</td>
                      <td>{p.comprobanteNum}</td>
                      <td>
                        <span className={`badge ${p.forma === "CONTADO" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                          {p.forma}
                        </span>
                      </td>
                      <td>
                        <span className="d-flex align-items-center gap-2">
                          <i className={`bi ${medioIcon}`}></i>{p.medioNom}
                        </span>
                      </td>
                      <td className="text-end text-muted">S/ {p.subTotal}</td>
                      <td className="text-end text-muted">S/ {p.igv}</td>
                      <td className="text-end fw-bold">S/ {p.total}</td>
                      <td>{p.fecha}</td>
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

export default PaymentList;
