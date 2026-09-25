import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createLandTitleApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/land-titles', data);

  return response.data;
};
