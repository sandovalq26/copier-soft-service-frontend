import api from './axiosConfig';

export interface EmpleadoDTO {
  codEmpleado: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  correo: string;
  telefono: string;
}

export const login = async (usuario: string, contrasena: string): Promise<EmpleadoDTO> => {
  const response = await api.post<EmpleadoDTO>('/auth/login', { usuario, contrasena });
  return response.data;
};
