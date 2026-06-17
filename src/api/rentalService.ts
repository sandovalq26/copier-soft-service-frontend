import axiosInstance from './axiosConfig';

export interface AlquilerDropdownDTO {
  codAlquiler: string;
  clienteNombres: string;
  precio: number;
}

export const getActiveRentals = async (): Promise<AlquilerDropdownDTO[]> => {
  const response = await axiosInstance.get('/rentals/active');
  return response.data;
};
