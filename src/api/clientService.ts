// Erick_Alquileres
import api from './axiosConfig';

export interface ClienteDTO {
  codCliente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  correo: string;
}

export const getAllClients = async (): Promise<ClienteDTO[]> => {
  const response = await api.get('/customers');
  return response.data;
};
