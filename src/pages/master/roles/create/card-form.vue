<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    name: undefined,
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    name: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="role">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="errors.name" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
