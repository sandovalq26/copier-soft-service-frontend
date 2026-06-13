import axiosInstance from './axiosConfig';

export interface SupplierDTO {
  codProveedor?: string;
  rucEmpresa: string;
  razonSocial: string;
  direccion: string;
  correo: string;
}

export const getAllSuppliers = async (): Promise<SupplierDTO[]> => {
  const response = await axiosInstance.get('/suppliers');
  return response.data;
};

export const getSupplierById = async (id: string): Promise<SupplierDTO> => {
  const response = await axiosInstance.get(`/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (supplierData: SupplierDTO): Promise<SupplierDTO> => {
  const response = await axiosInstance.post('/suppliers', supplierData);
  return response.data;
};

export const updateSupplier = async (id: string, supplierData: SupplierDTO): Promise<SupplierDTO> => {
  const response = await axiosInstance.put(`/suppliers/${id}`, supplierData);
  return response.data;
};
