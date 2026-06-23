// Erick_Alquileres
import api from './axiosConfig';

export interface FotocopiadoraDTO {
  codFotocopiadora: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  ancho: number;
  alto: number;
  fondo: number;
}

export const getAllPhotocopiers = async (): Promise<FotocopiadoraDTO[]> => {
  const response = await api.get('/photocopiers');
  return response.data;
};
