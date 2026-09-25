import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createPromoApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/promos', data);

  return response.data;
};
