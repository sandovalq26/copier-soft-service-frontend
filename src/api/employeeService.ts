import axiosInstance from './axiosConfig';

export interface EmployeeDTO {
  codEmpleado?: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  cargo: string;
  telefono: string;
  correo: string;
  usuario: string;
  contrasena?: string; // Solo se envía, no se recibe
}

export const getAllEmployees = async (): Promise<EmployeeDTO[]> => {
  const response = await axiosInstance.get('/employees');
  return response.data;
};

export const getEmployeeById = async (id: string): Promise<EmployeeDTO> => {
  const response = await axiosInstance.get(`/employees/${id}`);
  return response.data;
};

export const createEmployee = async (employeeData: EmployeeDTO): Promise<EmployeeDTO> => {
  const response = await axiosInstance.post('/employees', employeeData);
  return response.data;
};

export const updateEmployee = async (id: string, employeeData: EmployeeDTO): Promise<EmployeeDTO> => {
  const response = await axiosInstance.put(`/employees/${id}`, employeeData);
  return response.data;
};
