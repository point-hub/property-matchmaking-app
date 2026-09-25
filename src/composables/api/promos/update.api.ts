import { apiRequest } from '@/utils/api';

interface IResponse {
  matched_count: string
  modified_count: string
}

export const updatePromoApi = async (id: string, data: unknown): Promise<IResponse> => {
  const response = await apiRequest.patch(`/v1/master/promos/${id}`, data);

  return response.data;
};
