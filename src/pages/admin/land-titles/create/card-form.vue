<script setup lang="ts">
import { genderOptions } from '../gender';
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    name: undefined,
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    name: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Land Titles">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="['The name field is required.']" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
