<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { onMounted, ref, watch } from 'vue';

import { getCitiesApi } from '@/composables/api/locations/get-cities.api';
import { getDistrictsApi } from '@/composables/api/locations/get-districts.api';
import { getVillagesApi } from '@/composables/api/locations/get-villages.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    code: undefined,
    name: undefined,
    address: undefined,
    village: undefined,
    district: undefined,
    city: undefined,
    google_map_link: undefined,
    instagram: undefined,
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    code: [],
    name: [],
    address: [],
    village: [],
    district: [],
    city: [],
    google_map_link: [],
    instagram: [],
  }),
});
const isLoading = defineModel<boolean>('is-loading', { default: false });
const isSaving = defineModel<boolean>('is-saving', { default: false });

const searchCity = ref('');
const optionsCity = ref<object>([]);
const getCities = async () => {
  try {
    isLoading.value = true;
    const response = await getCitiesApi({
      search: {
        city_name: searchCity.value,
      },
      distinct: 'city',
      page: 1,
      page_size: 50,
    });

    optionsCity.value = response.data.map((item) => ({
      _id: item._id,
      label: item.city_name,
      value: item.city_name,
    }));
  } finally {
    isLoading.value = false;
  }
};

const searchDistrict = ref('');
const optionsDistrict = ref<object>([]);
const getDistricts = async () => {
  try {
    isLoading.value = true;
    const response = await getDistrictsApi({
      search: {
        city_name: data.value.city,
        district_name: searchDistrict.value,
      },
      distinct: 'district',
      page: 1,
      page_size: 50,
    });

    optionsDistrict.value = response.data.map((item) => ({
      _id: item._id,
      label: item.district_name,
      value: item.district_name,
    }));
  } finally {
    isLoading.value = false;
  }
};

const searchVillage = ref('');
const optionsVillage = ref<object>([]);
const getVillages = async () => {
  try {
    isLoading.value = true;
    const response = await getVillagesApi({
      search: {
        district_name: data.value.district,
        village_name: searchVillage.value,
      },
      distinct: 'village',
      page: 1,
      page_size: 50,
    });

    optionsVillage.value = response.data.map((item) => ({
      _id: item._id,
      label: item.village_name,
      value: item.village_name,
    }));
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getCities();
});

watchDebounced(
  searchCity,
  async () => {
    if (searchCity.value) {
      await getCities();
    }
  },
  { debounce: 300, maxWait: 500 },
);

watchDebounced(
  searchDistrict,
  async () => {
    if (searchDistrict.value) {
      await getDistricts();
    }
  },
  { debounce: 300, maxWait: 500 },
);

watchDebounced(
  searchVillage,
  async () => {
    if (searchVillage.value) {
      await getVillages();
    }
  },
  { debounce: 300, maxWait: 500 },
);

watch(() => data.value.city, async () => {
  data.value.district = '';
  data.value.village = '';

  optionsDistrict.value = [];
  optionsVillage.value = [];

  await getDistricts();
});

watch(() => data.value.district, async () => {
  data.value.village = '';

  optionsVillage.value = [];

  await getVillages();
});

watch(() => data.value.village, () => {

});
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Code" required v-model="data.code" :errors="errors.code" :disabled="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Address" required v-model="data.address" :errors="errors.address" :disabled="isSaving" />
      <base-select
        layout="horizontal"
        label="City"
        placeholder="Select"
        required
        v-model="data.city"
        v-model:search="searchCity"
        :options="optionsCity"
      />
      <base-select
        layout="horizontal"
        label="District"
        placeholder="Select"
        required
        v-model="data.district"
        v-model:search="searchDistrict"
        :options="optionsDistrict"
      />
      <base-select
        layout="horizontal"
        label="Village"
        placeholder="Select"
        required
        v-model="data.village"
        v-model:search="searchVillage"
        :options="optionsVillage"
      />
      <base-input layout="horizontal" label="Google Map Link" v-model="data.google_map_link" :errors="errors.google_map_link" :disabled="isSaving" />
      <base-input layout="horizontal" label="Instagram" v-model="data.instagram" :errors="errors.instagram" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
