import { apiRequest } from '@/utils/api';

interface IResponse {
  matched_count: string
  modified_count: string
}

export const restorePromoApi = async (id: string, data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post(`/v1/master/promos/${id}/restore`, data);

  return response.data;
};
