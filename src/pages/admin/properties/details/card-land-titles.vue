<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    land_titles: [],
  }),
});
</script>

<template>
  <base-card title="Land Titles">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <template v-for="landTitle in data.land_titles" >
          <base-checkbox v-model="data.land_titles" :true-value="landTitle" :text="landTitle" disabled />
        </template>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
