import axiosInstance from './axiosConfig';

export interface TipoComprobanteDTO {
  codTipoComprobante: string;
  nombre: string;
}

export const getReceiptTypes = async (): Promise<TipoComprobanteDTO[]> => {
  const response = await axiosInstance.get('/receipt-types');
  return response.data;
};
