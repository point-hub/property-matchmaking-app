import { defineStore } from 'pinia';
import { reactive } from 'vue';

export interface ICustomerPreference {
  location?: string;
  budget_min?: number;
  budget_max?: number;
}

const defaultData = (): ICustomerPreference => ({
  location: undefined,
  budget_min: undefined,
  budget_max: undefined,
});

export const useCustomerPreferenceStore = defineStore('customer-preference', () => {
  const data = reactive<ICustomerPreference>(defaultData());

  const reset = () => {
    Object.assign(data, defaultData());
  };

  const setLocation = (location?: string) => {
    data.location = location;
  };

  const setBudget = (budgetMin?: number, budgetMax?: number) => {
    data.budget_min = budgetMin;
    data.budget_max = budgetMax;
  };

  return {
    data,
    reset,
    setLocation,
    setBudget,
  };
}, {
  persist: {
    storage: localStorage,
    pick: ['data'],
  },
});