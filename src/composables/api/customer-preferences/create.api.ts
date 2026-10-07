import { apiRequest } from '@/utils/api';

export interface IResponse {
  inserted_id: string
}

export const createCustomerPreferenceApi = async (data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/customer-preferences', data);

  return response.data;
};
