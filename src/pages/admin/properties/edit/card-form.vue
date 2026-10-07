<script setup lang="ts">
import type { IForm, IFormError } from './form';

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
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Code" required v-model="data.code" :errors="errors.code" :disabled="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Address" required v-model="data.address" :errors="errors.address" :disabled="isSaving" />
      <base-input layout="horizontal" label="Village" required v-model="data.village" :errors="errors.village" :disabled="isSaving" />
      <base-input layout="horizontal" label="District" required v-model="data.district" :errors="errors.district" :disabled="isSaving" />
      <base-input layout="horizontal" label="City" required v-model="data.city" :errors="errors.city" :disabled="isSaving" />
      <base-input layout="horizontal" label="Google Map Link" v-model="data.google_map_link" :errors="errors.google_map_link" :disabled="isSaving" />
      <base-input layout="horizontal" label="Instagram" v-model="data.instagram" :errors="errors.instagram" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
