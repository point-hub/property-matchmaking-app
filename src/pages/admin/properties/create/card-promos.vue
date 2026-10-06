<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { getPromosApi } from '@/composables/api/promos/get.api';

import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    promos: [],
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    promos: [],
  }),
});

const isSaving = defineModel('is-saving', { default: false });
const isLoading = defineModel<boolean>('is-loading', { default: false });
const name = ref();
const description = ref();
const errorName = ref();
const errorDescription = ref();
const promos = ref();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await getPromosApi({
      page: 1,
      page_size: 10,
    });
    promos.value = response.data;

  } finally {
    isLoading.value = false;
  }
});

const addPromo = () => {
  if (!name.value || !description.value) {
    if (!name.value) {
      errorName.value = ['The name field is required.'];
    }
    if (!description.value) {
      errorDescription.value = ['The description field is required.'];
    }
    return;
  }

  const isDuplicate = promos.value.some(
    (promo: { name: string }) =>
      promo.name.trim().toLowerCase() === name.value.toLowerCase(),
  );

  if (isDuplicate) {
    errorName.value = ['The name is exists.'];
    return;
  }

  promos.value.push({
    name: name.value,
    description: description.value,
  });

  data.value.promos?.push(name.value);
  name.value = '';
  description.value = '';
};
</script>

<template>
  <base-card title="Promos">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <table class="w-full border-separate border-spacing-y-3"">
          <template v-for="promo in promos" >
            <tr>
              <td class="w-1 align-top pt-1"><base-checkbox v-model="data.promos" :true-value="promo.name" /></td>
              <td>
                <b>{{ promo.name }}</b>
                <br>
                {{ promo.description }}
              </td>
            </tr>
          </template>
        </table>
      </div>
      <div class="mt-10">
        <b class="uppercase">Add another promo</b>
        <base-divider orientation="vertical" />
      </div>
      <div class="flex flex-col gap-4">
        <base-input layout="horizontal" label="Name" v-model="name" :errors="errorName" class="w-full" />
        <base-input layout="horizontal" label="Description" v-model="description" :errors="errorDescription" class="w-full" />
        <base-form layout="horizontal" label="&nbsp;">
          <base-button class="flex-0" color="info" @click="addPromo">Add</base-button>
        </base-form>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
