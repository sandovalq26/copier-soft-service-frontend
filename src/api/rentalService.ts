// Erick_Alquileres
import api from './axiosConfig';

export interface AlquilerDropdownDTO {
    codAlquiler: string;
    clienteNombres: string;
    precio: number;
}

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

export interface AlquilerDTO {
    codAlquiler: string;
    codEmpleado: string;
    empleadoNombres: string;
    empleadoApellidos: string;
    codCliente: string;
    clienteTipoDocumento: string;
    clienteNumeroDocumento: string;
    clienteNombres: string;
    clienteApellidos: string;
    fechaInicio: string;
    fechaFin: string;
    periodo: string;
    valorPeriodo: number;
    precio: number;
    estado: string;
    fechaRegistro: string;
    fotocopiadoras: FotocopiadoraDTO[];
}

export interface CrearAlquilerDTO {
    codEmpleado: string;
    codCliente: string;
    fechaInicio: string;
    fechaFin: string;
    periodo: string;
    valorPeriodo: number;
    precio: number;
    estado: string;
    fotocopiadoras: string[];
}

export const getActiveRentals = async (): Promise<AlquilerDropdownDTO[]> => {
    const response = await api.get('/rentals/active');
    return response.data;
};

export const getAllRentals = async (): Promise<AlquilerDTO[]> => {
    const response = await api.get('/rentals');
    return response.data;
};

export const getRentalById = async (id: string): Promise<AlquilerDTO> => {
    const response = await api.get(`/rentals/${id}`);
    return response.data;
};

export const createRental = async (data: CrearAlquilerDTO): Promise<AlquilerDTO> => {
    const response = await api.post('/rentals', data);
    return response.data;
};

export const updateRental = async (id: string, data: CrearAlquilerDTO): Promise<AlquilerDTO> => {
    const response = await api.put(`/rentals/${id}`, data);
    return response.data;
};

export const deleteRental = async (id: string): Promise<void> => {
    await api.delete(`/rentals/${id}`);
};
