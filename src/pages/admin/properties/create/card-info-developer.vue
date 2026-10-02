<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    developer_name: undefined,
    whatsapp: undefined,
    mou: undefined,
  }),
});
const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    developer_name: [],
    whatsapp: [],
    mou: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Developer Name" required v-model="data.developer_name" :errors="errors.developer_name" :disabled="isSaving" />
      <base-input layout="horizontal" label="Whatsapp" required v-model="data.whatsapp" :errors="errors.whatsapp" :disabled="isSaving" />
      <base-input layout="horizontal" label="MOU" v-model="data.mou" :errors="errors.mou" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
