import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createPropertyApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/properties', data);

  return response.data;
};
