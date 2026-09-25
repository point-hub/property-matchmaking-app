import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createFacilityApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/master/facilities', data);

  return response.data;
};
