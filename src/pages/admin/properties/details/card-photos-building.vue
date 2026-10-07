<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    photos_building: [],
  }),
});
</script>

<template>
  <base-card title="Photos - Building">
    <div class="my-5">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <!-- Photos -->
        <div
          v-for="(photo, index) in data.photos_building"
          :key="index"
          class="relative aspect-square overflow-hidden rounded-lg border bg-gray-50"
        >
          <a :href="photo" target="_blank">
            <img
              :src="photo"
              class="h-full w-full object-cover"
            >
          </a>

          <!-- Cover -->
          <div
            v-if="index === 0"
            class="absolute left-2 top-2 rounded-full bg-primary-500 px-2 py-1 text-xs font-medium text-white bg-black/60"
          >
            Cover
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>