import axiosInstance from './axiosConfig';

export interface PhotocopierDTO {
  codFotocopiadora?: string;
  codAlmacen: string;
  codProveedor: string;
  nombre: string;
  marca: string;
  modelo: string;
  serie: string;
  anioFabricacion: number;
  ancho: number;
  alto: number;
  fondo: number;
  estado: string;
}

export const getAllPhotocopiers = async (): Promise<PhotocopierDTO[]> => {
  const response = await axiosInstance.get('/photocopiers');
  return response.data;
};

export const getPhotocopierById = async (id: string): Promise<PhotocopierDTO> => {
  const response = await axiosInstance.get(`/photocopiers/${id}`);
  return response.data;
};

export const createPhotocopier = async (data: PhotocopierDTO): Promise<PhotocopierDTO> => {
  const response = await axiosInstance.post('/photocopiers', data);
  return response.data;
};

export const updatePhotocopier = async (id: string, data: PhotocopierDTO): Promise<PhotocopierDTO> => {
  const response = await axiosInstance.put(`/photocopiers/${id}`, data);
  return response.data;
};
