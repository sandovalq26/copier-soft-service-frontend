import axiosInstance from './axiosConfig';

export interface CustomerDTO {
  codCliente?: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  correo: string;
}

export const getAllCustomers = async (): Promise<CustomerDTO[]> => {
  const response = await axiosInstance.get('/customers');
  return response.data;
};

export const getCustomerById = async (id: string): Promise<CustomerDTO> => {
  const response = await axiosInstance.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customerData: CustomerDTO): Promise<CustomerDTO> => {
  const response = await axiosInstance.post('/customers', customerData);
  return response.data;
};

export const updateCustomer = async (id: string, customerData: CustomerDTO): Promise<CustomerDTO> => {
  const response = await axiosInstance.put(`/customers/${id}`, customerData);
  return response.data;
};
