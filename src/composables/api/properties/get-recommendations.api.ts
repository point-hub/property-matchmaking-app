import type { IPagination, IQuery } from '@/types';
import { apiRequest } from '@/utils/api';

export interface IPropertiesData {
  _id: string
  code?: string
  name?: string
  address?: string
  village?: string
  district?: string
  city?: string
  google_map_link?: string
  instagram?: string
  pricelists?: { land_area: number, building_area: number, type: string, price: number }[]
  land_titles?: string[]
  facilities?: string[]
  promos?: { name: string, description: string }[]
  developer_name?: string
  whatsapp?: string
  mou?: string
  photos_gate?: string[]
  photos_building?: string[]
  notes: string
  is_archived: string
  created_at: Date
  created_by_id: string
}

export interface IResponse {
  data: IPropertiesData[]
  pagination: IPagination
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null;

export const getPropertyRecommendationsApi = async (query?: IQuery): Promise<IResponse> => {
  // Abort the previous request if it exists
  if (controller) {
    controller.abort();
  }

  // Create a new AbortController for this request
  controller = new AbortController();
  const response = await apiRequest.get('/v1/master/properties/recommendations', {
    params: {
      search: query?.search,
      preferences: query?.preferences,
      page: query?.page || 1,
      page_size: query?.page_size || 10,
      sort: query?.sort || '-_id',
    },
    signal: controller.signal,
  });

  return response.data;
};
