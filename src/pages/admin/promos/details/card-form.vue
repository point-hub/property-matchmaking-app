<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    name: undefined,
    description: 'Description for Promo 1',
  }),
});
</script>

<template>
  <base-card title="Example">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input layout="horizontal" label="Description" readonly v-model="data.description" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
