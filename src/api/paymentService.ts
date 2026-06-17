import axiosInstance from './axiosConfig';

export interface PagoDTO {
  codPago?: string;
  codAlquiler: string;
  clienteDocumento?: string;
  clienteNombres?: string;
  comprobanteNombre?: string;
  medioPagoNombre?: string;
  tipoPago: string;
  codTipoComprobante: string;
  numeroComprobante: string;
  formaPago: string;
  codMedioPago: string;
  fechaEmision: string;
  subTotal: number;
  descuento: number;
  igv: number;
  importeTotal: number;
  pagoCompleto: boolean;
}

export const getAllPayments = async (): Promise<PagoDTO[]> => {
  const response = await axiosInstance.get('/payments');
  return response.data;
};

export const createPayment = async (paymentData: PagoDTO): Promise<PagoDTO> => {
  const response = await axiosInstance.post('/payments', paymentData);
  return response.data;
};
