import api from './axiosConfig';

export interface AlquilerRecienteDTO {
  codAlquiler: string;
  clienteNombres: string;
  clienteApellidos: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  precio: number;
}

export interface PagoRecienteDTO {
  codPago: string;
  clienteNombres: string;
  clienteApellidos: string;
  importeTotal: number;
  medioPagoNombre: string;
}

export interface DashboardStatsDTO {
  totalEmpleados: number;
  totalClientes: number;
  totalFotocopiadoras: number;
  alquileresActivos: number;
  alquileresRecientes: AlquilerRecienteDTO[];
  pagosRecientes: PagoRecienteDTO[];
}

export const getDashboardStats = async (): Promise<DashboardStatsDTO> => {
  const response = await api.get<DashboardStatsDTO>('/dashboard/stats');
  return response.data;
};
