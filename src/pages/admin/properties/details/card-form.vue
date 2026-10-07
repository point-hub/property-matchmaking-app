<script setup lang="ts">
import { type IForm } from './form';

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
</script>

<template>
  <base-card title="Properties">
    <div class="flex flex-col gap-4">
      <base-input layout="horizontal" label="Code" v-model="data.code" readonly />
      <base-input layout="horizontal" label="Name" v-model="data.name" readonly />
      <base-input layout="horizontal" label="Address" v-model="data.address" readonly />
      <base-input layout="horizontal" label="City" v-model="data.city" readonly />
      <base-input layout="horizontal" label="District" v-model="data.district" readonly />
      <base-input layout="horizontal" label="Village" v-model="data.village" readonly />
      <base-input layout="horizontal" label="Google Map Link" v-model="data.google_map_link" readonly />
      <base-input layout="horizontal" label="Instagram" v-model="data.instagram" readonly />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
