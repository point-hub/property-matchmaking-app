import { apiRequest } from '@/utils/api';

interface IResponse {
  upload_url: string;
  domain: string;
  path: string;
}

export const presignUploadApi = async (): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/storages/presign-upload');

  return response.data;
};
