<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    developer_name: undefined,
    whatsapp: undefined,
    mou: undefined,
  }),
});
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Developer Name" v-model="data.developer_name" disabled />
      <base-input layout="horizontal" label="Whatsapp" v-model="data.whatsapp" disabled />
      <base-input layout="horizontal" label="MOU" v-model="data.mou" disabled />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
