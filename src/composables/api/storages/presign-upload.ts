import { apiRequest } from '@/utils/api';

interface IResponse {
  upload_url: string;
  domain: string;
  path: string;
}

export const presignUploadApi = async (extension?: string): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/storages/presign-upload', { extension });

  return response.data;
};
