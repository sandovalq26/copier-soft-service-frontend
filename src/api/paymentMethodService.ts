import axiosInstance from './axiosConfig';

export interface MedioPagoDTO {
  codMedioPago: string;
  nombre: string;
}

export const getPaymentMethods = async (): Promise<MedioPagoDTO[]> => {
  const response = await axiosInstance.get('/payment-methods');
  return response.data;
};
