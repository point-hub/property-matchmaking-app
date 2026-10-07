<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getFacilitiesApi } from '@/composables/api/facilities/get.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    facilities: [],
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    facilities: [],
  }),
});

const isSaving = defineModel('is-saving', { default: false });
const isLoading = defineModel<boolean>('is-loading', { default: false });
const name = ref();
const error = ref();
const facilities = ref();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await getFacilitiesApi({
      page: 1,
      page_size: 10,
    });
    facilities.value = response.data;

  } finally {
    isLoading.value = false;
  }
});

const addFacility = () => {
  if (!name.value) {
    error.value = ['The name field is required.'];
    return;
  }

  const isDuplicate = facilities.value.some(
    (facility: { name: string }) =>
      facility.name.trim().toLowerCase() === name.value.toLowerCase(),
  );

  if (isDuplicate) {
    error.value = ['The name is exists.'];
    return;
  }

  facilities.value.push({
    name: name.value,
  });

  data.value.facilities?.push(name.value);
  name.value = '';
};
</script>

<template>
  <base-card title="Facilities">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <template v-for="facility in facilities" >
          <base-checkbox v-model="data.facilities" :true-value="facility.name" :text="facility.name" />
        </template>
      </div>
      <div class="mt-10">
        <b class="uppercase">Add another facility</b>
        <base-divider orientation="vertical" />
      </div>
      <div class="flex flex-col gap-4">
        <base-input layout="horizontal" label="Name" v-model="name" :errors="error" class="w-full" />
        <base-form layout="horizontal" label="&nbsp;">
          <base-button class="flex-0" color="info" @click="addFacility">Add</base-button>
        </base-form>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
