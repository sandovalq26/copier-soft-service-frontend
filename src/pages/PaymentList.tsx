import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPayments } from '../api/paymentService';
import type { PagoDTO } from '../api/paymentService';

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<PagoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error al cargar los pagos.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Pagos</h2>
          <p className="page-description">Registro y seguimiento de pagos de alquileres</p>
        </div>
        <div>
          <Link to="/payments/new" className="btn btn-primary" id="btnNuevoPago">
            <i className="bi bi-plus-lg me-1"></i>Registrar Pago
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show d-flex align-items-center gap-2 mb-3" role="alert">
          <i className="bi bi-exclamation-triangle-fill"></i>
          <span>{error}</span>
          <button type="button" className="btn-close ms-auto" onClick={() => setError(null)}></button>
        </div>
      )}

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
              {loading ? (
                <tr>
                  <td colSpan={12} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center py-4 text-muted">No hay pagos registrados.</td>
                </tr>
              ) : (
                payments.map((p) => {
                  let medioIcon = "bi-cash-coin text-success";
                  if (p.medioPagoNombre?.includes("YAPE")) medioIcon = "bi-phone text-primary";
                  else if (p.medioPagoNombre?.includes("PLIN")) medioIcon = "bi-phone text-info";
                  else if (p.medioPagoNombre?.includes("TRANSFER") || p.medioPagoNombre?.includes("DEPOSITO")) medioIcon = "bi-bank text-info";

                  return (
                    <tr key={p.codPago}>
                      <td className="text-muted fw-medium">{p.codPago}</td>
                      <td><span className="badge bg-light text-dark border">{p.codAlquiler}</span></td>
                      <td>
                        <p className="mb-0 text-muted small">{p.clienteDocumento}</p>
                        <p className="mb-0 fw-medium">{p.clienteNombres}</p>
                      </td>
                      <td>{p.tipoPago}</td>
                      <td>{p.comprobanteNombre}</td>
                      <td>{p.numeroComprobante}</td>
                      <td>
                        <span className={`badge ${p.formaPago === "CONTADO" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}>
                          {p.formaPago}
                        </span>
                      </td>
                      <td>
                        <span className="d-flex align-items-center gap-2">
                          <i className={`bi ${medioIcon}`}></i>{p.medioPagoNombre}
                        </span>
                      </td>
                      <td className="text-end text-muted">S/ {p.subTotal.toFixed(2)}</td>
                      <td className="text-end text-muted">S/ {p.igv.toFixed(2)}</td>
                      <td className="text-end fw-bold">S/ {p.importeTotal.toFixed(2)}</td>
                      <td>{p.fechaEmision}</td>
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
