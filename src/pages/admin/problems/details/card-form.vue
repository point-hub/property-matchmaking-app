<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    name: undefined,
    description: undefined,
  }),
});
</script>

<template>
  <base-card title="Problem">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input layout="horizontal" label="Description" readonly v-model="data.description" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
