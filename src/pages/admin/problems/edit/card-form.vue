<script setup lang="ts">
import type { IForm, IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    name: undefined,
    description: undefined,
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    name: [],
    description: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Problems">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Description" required v-model="data.description" :errors="errors.description" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
