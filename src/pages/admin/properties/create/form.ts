import { reactive } from 'vue';

export interface IForm {
  code?: string
  name?: string
  address?: string
  subdistrict?: string
  district?: string
  city?: string
  google_map_link?: string
  instagram?: string
  pricelists?: {
    land_area?: number
    building_area?: number
    price?: number
  }[]
  land_titles?: string[]
  facilities?: string[]
  promos?: { name: string, description: string }[]
  developer_name?: string[]
  whatsapp?: string[]
  mou?: string[]
  photos_gate?: string[]
  photos_building?: string[]
  notes?: string
}

export interface IFormError {
  code?: string[]
  name?: string[]
  address?: string[]
  subdistrict?: string[]
  district?: string[]
  city?: string[]
  google_map_link?: string[]
  instagram?: string[]
  pricelists?: string[]
  land_titles?: string[]
  facilities?: string[]
  promos?: string[]
  developer_name?: string[]
  whatsapp?: string[]
  mou?: string[]
  photos_gate?: string[]
  photos_building?: string[]
  notes?: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: undefined,
    name: undefined,
    address: undefined,
    subdistrict: undefined,
    district: undefined,
    city: undefined,
    google_map_link: undefined,
    instagram: undefined,
    pricelists: [],
    land_titles: [],
    facilities: [],
    promos: [],
    developer_name: undefined,
    whatsapp: undefined,
    mou: undefined,
    photos_gate: [],
    photos_building: [],
    notes: undefined,
  };

  const defaultFormError: IFormError = {
    code: [],
    name: [],
    address: [],
    subdistrict: [],
    district: [],
    city: [],
    google_map_link: [],
    instagram: [],
    pricelists: [],
    land_titles: [],
    facilities: [],
    promos: [],
    developer_name: [],
    whatsapp: [],
    mou: [],
    photos_gate: [],
    photos_building: [],
    notes: [],
  };

  const data = reactive<IForm>(defaultForm);
  const errors = reactive<IFormError>(defaultFormError);

  const reset = () => {
    Object.assign(data, defaultForm);
    Object.assign(errors, defaultFormError);
  };

  return { data, errors, reset };
}
