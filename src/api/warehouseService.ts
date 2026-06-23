import axiosInstance from './axiosConfig';

export interface WarehouseDTO {
  codAlmacen?: string;
  nombre: string;
  direccion: string;
}

export const getAllWarehouses = async (): Promise<WarehouseDTO[]> => {
  const response = await axiosInstance.get('/warehouses');
  return response.data;
};
