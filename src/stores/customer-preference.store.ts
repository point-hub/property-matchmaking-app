import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface ICustomerPreference {
  location?: string;
  budget_min?: number;
  budget_max?: number;
  down_payment_min?: number;
  down_payment_max?: number;
  monthly_payment_min?: number;
  monthly_payment_max?: number;
  age?: number;
  marital_status?: string;
  dependents?: number;
  problems?: string[];
  promos?: string[];
  name?: string;
  whatsapp?: number;
}

const defaultData = (): ICustomerPreference => ({
  location: undefined,
  budget_min: undefined,
  budget_max: undefined,
  down_payment_min: undefined,
  down_payment_max: undefined,
  monthly_payment_min: undefined,
  monthly_payment_max: undefined,
  age: undefined,
  marital_status: undefined,
  dependents: undefined,
  problems: [],
  promos: [],
  name: undefined,
  whatsapp: undefined,
});

export const useCustomerPreferenceStore = defineStore('customer-preference', () => {
  const data = reactive<ICustomerPreference>(defaultData());

  const reset = () => {
    Object.assign(data, defaultData());
  };

  return {
    data,
    reset,
  };
}, {
  persist: {
    storage: localStorage,
    pick: ['data'],
  },
});