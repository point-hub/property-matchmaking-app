import { reactive } from 'vue';

export interface IForm {
  _id?: string
  name?: string
  is_archived?: boolean
  notes?: string
}

export function useForm() {
  const defaultForm: IForm = {
    _id: undefined,
    name: undefined,
    is_archived: undefined,
    notes: undefined,
  };

  const data = reactive<IForm>(defaultForm);

  return { data };
}
