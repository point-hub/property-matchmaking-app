<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getLandTitlesApi } from '@/composables/api/land-titles/get.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    land_titles: [],
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    land_titles: [],
  }),
});

const isSaving = defineModel('is-saving', { default: false });
const isLoading = defineModel<boolean>('is-loading', { default: false });
const name = ref();
const error = ref();
const landTitles = ref();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await getLandTitlesApi({
      page: 1,
      page_size: 10,
    });
    landTitles.value = response.data;

  } finally {
    isLoading.value = false;
  }
});

const addLandTitle = () => {
  if (!name.value) {
    error.value = ['The name field is required.'];
    return;
  }

  const isDuplicate = landTitles.value.some(
    (landTitle: { name: string }) =>
      landTitle.name.trim().toLowerCase() === name.value.toLowerCase(),
  );

  if (isDuplicate) {
    error.value = ['The name is exists.'];
    return;
  }

  landTitles.value.push({
    name: name.value,
  });

  data.value.land_titles?.push(name.value);
  name.value = '';
};
</script>

<template>
  <base-card title="Land Titles">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <template v-for="landTitle in landTitles" >
          <base-checkbox v-model="data.land_titles" :true-value="landTitle.name" :text="landTitle.name" />
        </template>
      </div>
      <div class="mt-10">
        <b class="uppercase">Add another land title</b>
        <base-divider orientation="vertical" />
      </div>
      <div class="flex flex-col gap-4">
        <base-input layout="horizontal" label="Name" v-model="name" :errors="error" class="w-full" />
        <base-form layout="horizontal" label="&nbsp;">
          <base-button class="flex-0" color="info" @click="addLandTitle">Add</base-button>
        </base-form>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
