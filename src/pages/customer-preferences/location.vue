<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

import { getCitiesApi } from '@/composables/api/locations/get-cities.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';

const preference = useCustomerPreferenceStore();
const isLoading = defineModel<boolean>('is-loading', { default: false });

const city = ref('');
const searchCity = ref('');
const optionsCity = ref<object>([]);
const getCities = async () => {
  try {
    isLoading.value = true;
    const response = await getCitiesApi({
      search: {
        city_name: searchCity.value,
      },
      distinct: 'city',
      page: 1,
      page_size: 50,
    });

    optionsCity.value = response.data.map((item) => ({
      _id: item._id,
      label: item.city_name,
      value: item.city_name,
    }));
  } finally {
    isLoading.value = false;
  }
};

const selectLocation = () => {
  if (!city.value) return;

  if (!preference.data.locations?.includes(city.value)) {
    preference.data.locations?.push(city.value);
  }

  city.value = '';
};

const removeLocation = (location: string) => {
  preference.data.locations = preference.data.locations?.filter(
    item => item !== location,
  );
};


watchDebounced(
  searchCity,
  async () => {
    if (searchCity.value) {
      await getCities();
    }
  },
  { debounce: 300, maxWait: 500 },
);
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-16">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>20% Complete</span>
        <span>1 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-1/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-12">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Pilih Lokasi
      </h1>

      <p class="mt-5 text-lg leading-8 text-slate-500">
        Pilih lokasi yang Anda inginkan, dan kami akan membantu menemukan properti yang tepat.
      </p>
    </div>

    <!-- Search -->
    <div class="mb-10">
      <div class="relative">
        <div class="w-full rounded-2xl border py-1 border-slate-300 bg-white text-lg outline-none transition focus:border-blue-600">
          <base-select
            placeholder="Pilih lokasi yang Anda inginkan"
            v-model="city"
            v-model:search="searchCity"
            :options="optionsCity"
            @select="selectLocation"
            border="none"
          />
        </div>

      </div>
      <div class="mt-5">
        <!-- Selected Locations -->
        <div class="mb-6 flex flex-wrap gap-3">
          <div
            v-for="location in preference.data.locations"
            class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            {{ location }}

            <base-button @click="removeLocation(location)" class="bg-red-100 rounded-full">
              <span class="h-2 w-2 i-fa7-solid:x"></span>
            </base-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-20 flex items-center justify-between border-t border-slate-200 pt-8">
      <router-link
        to="/"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <router-link
        v-if="preference.data.locations?.length"
        to="/customer-preferences/budget"
        class="rounded-xl bg-primary px-8 py-3 font-semibold text-white"
      >
        Continue
      </router-link>
      <router-link
        v-else
        to="#"
        class="rounded-xl bg-gray-300 px-8 py-3 font-semibold text-white"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>