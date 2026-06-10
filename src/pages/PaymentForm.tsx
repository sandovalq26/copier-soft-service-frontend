import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentForm: React.FC = () => {
  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [descuento, setDescuento] = useState<number>(0);
  const [igv, setIgv] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const t = subTotal - descuento + igv;
    setTotal(t > 0 ? t : 0);
  }, [subTotal, descuento, igv]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      navigate('/payments');
    } else {
      form.classList.add('was-validated');
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2 className="page-title">Registrar Pago</h2>
          <p className="page-description">Registra un nuevo pago de alquiler</p>
        </div>
        <Link to="/payments" className="btn btn-outline-secondary" id="btnVolverPagos">
          <i className="bi bi-arrow-left me-1"></i>Volver
        </Link>
      </div>

      <form id="paymentForm" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-12">
            <div className="form-card">
              <div className="form-card-header">
                <h6><i className="bi bi-credit-card me-2"></i>Datos del Pago</h6>
              </div>
              <div className="form-card-body">
                <div className="row g-3">

                  <div className="col-12 col-lg-3">
                    <label htmlFor="payType" className="form-label fw-medium">
                      Tipo de Pago <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="payType" name="paymentType" required defaultValue="ALQUILER">
                      <option value="ALQUILER">ALQUILER</option>
                    </select>
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="payAlquiler" className="form-label fw-medium">
                      Alquiler en ejecución <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="payAlquiler" name="alquilerId" required defaultValue="">
                      <option value="" disabled>-- Seleccionar alquiler --</option>
                      <option value="AQ001">AQ001 — Carlos Lopez (S/ 150.00)</option>
                    </select>
                    <div className="invalid-feedback">Selecciona un alquiler.</div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payTipoComp" className="form-label fw-medium">
                      Tipo de Comprobante <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="payTipoComp" name="TipoComprobante" required defaultValue="">
                      <option value="" disabled>-- Seleccionar --</option>
                      <option value="1">FACTURA</option>
                      <option value="2">BOLETA</option>
                    </select>
                    <div className="invalid-feedback">Selecciona tipo de comprobante.</div>
                  </div>

                  <div className="col-12 col-md-3">
                    <label htmlFor="payNumComp" className="form-label fw-medium">
                      Número de Comprobante <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" id="payNumComp" name="NumeroComprobante"
                           placeholder="Ej: F001-001" maxLength={9} required />
                    <div className="invalid-feedback">Mínimo 1 y máximo 9 caracteres.</div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payForma" className="form-label fw-medium">
                      Forma de pago <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="payForma" name="FormaPago" required defaultValue="CONTADO">
                      <option value="CONTADO">CONTADO</option>
                      <option value="CREDITO">CREDITO</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payMedio" className="form-label fw-medium">
                      Medio de Pago <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" id="payMedio" name="medioPago" required defaultValue="">
                      <option value="" disabled>-- Seleccionar --</option>
                      <option value="1">YAPE</option>
                      <option value="2">PLIN</option>
                      <option value="3">EFECTIVO</option>
                    </select>
                    <div className="invalid-feedback">Selecciona un medio de pago.</div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payFecha" className="form-label fw-medium">
                      Fecha de Pago <span className="text-danger">*</span>
                    </label>
                    <input type="date" className="form-control" id="payFecha" name="fechaPago"
                           defaultValue={new Date().toISOString().split('T')[0]} required />
                    <div className="invalid-feedback">La fecha de pago es obligatoria.</div>
                  </div>

                  <div className="col-12 col-md-3">
                    <label htmlFor="paySubTotal" className="form-label fw-medium">
                      Sub Total (S/) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" className="form-control" id="paySubTotal" name="subTotal"
                             placeholder="0.00" min="0" step="0.01" required
                             value={subTotal || ''} onChange={(e) => setSubTotal(parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payDesc" className="form-label fw-medium">
                      Descuento (S/) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" className="form-control" id="payDesc" name="descuento"
                             placeholder="0.00" min="0" step="0.01" required
                             value={descuento || ''} onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payIGV" className="form-label fw-medium">
                      IGV (S/) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" className="form-control" id="payIGV" name="igv"
                             placeholder="0.00" min="0" step="0.01" required
                             value={igv || ''} onChange={(e) => setIgv(parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                  <div className="col-12 col-md-3">
                    <label htmlFor="payTotal" className="form-label fw-medium">
                      Total (S/) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">S/</span>
                      <input type="number" className="form-control" id="payTotal" name="total"
                             placeholder="0.00" readOnly value={total.toFixed(2)} />
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div className="form-check form-switch p-0 ps-5">
                      <input className="form-check-input" type="checkbox" id="payComplete" name="pagoCompleto" value="SI" />
                      <label className="form-check-label fw-semibold text-primary" htmlFor="payComplete">
                        ¿Es un Pago Completo? (Finaliza el alquiler y libera equipos)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex gap-2 mt-3 justify-content-end">
          <Link to="/payments" className="btn btn-outline-secondary px-4">Cancelar</Link>
          <button type="submit" className="btn btn-success px-4" id="btnGuardarPago">
            <i className="bi bi-check-circle me-1"></i>Confirmar Pago
          </button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
