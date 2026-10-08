import { apiRequest } from '@/utils/api';

export interface IResponse {
  _id: string
  locations: string[];
  budget_min: number;
  budget_max: number;
  down_payment_min: number;
  down_payment_max: number;
  monthly_payment_min: number;
  monthly_payment_max: number;
  age: number;
  marital_status: string;
  dependents: number;
  problems: string[];
  promos: string[];
  name: string;
  whatsapp: number;
  notes: string
  is_archived: boolean
  created_at: Date
  created_by_id: string
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null;

export const findCustomerPreferenceApi = async (_id: string): Promise<IResponse> => {
  // Abort the previous request if it exists
  if (controller) {
    controller.abort();
  }

  // Create a new AbortController for this request
  controller = new AbortController();
  const response = await apiRequest.get(`/v1/customer-preferences/${_id}`, {
    signal: controller.signal,
  });

  return response.data;
};
