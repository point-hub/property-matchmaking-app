import { reactive } from 'vue';

export interface IForm {
  name?: string
  description?: string
  notes?: string
  // audit log
  update_reason?: string
}

export interface IFormError {
  name?: string[]
  description?: string[]
  notes?: string[]
  // audit log
  update_reason?: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: undefined,
    description: undefined,
    notes: undefined,
    update_reason: undefined,
  };

  const defaultFormError: IFormError = {
    name: [],
    description: [],
    notes: [],
    update_reason: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
