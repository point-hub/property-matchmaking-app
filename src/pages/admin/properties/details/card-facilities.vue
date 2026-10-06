<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    facilities: [],
  }),
});
</script>

<template>
  <base-card title="Facilities">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <template v-for="facility in data.facilities" >
          <base-checkbox v-model="data.facilities" :true-value="facility" :text="facility" disabled />
        </template>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
