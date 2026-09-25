import { apiRequest } from '@/utils/api';

interface IResponse {
  matched_count: string
  modified_count: string
}

export const archivePromoApi = async (id: string, data: unknown): Promise<IResponse> => {
  const response = await apiRequest.post(`/v1/master/promos/${id}/archive`, data);

  return response.data;
};
