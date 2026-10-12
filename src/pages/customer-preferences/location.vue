<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { ref } from 'vue';

import { getCitiesApi } from '@/composables/api/locations/get-cities.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';
import { toast } from '@/toast';

interface ICityOption {
  _id: string;
  label: string;
  value: string;
}

const preference = useCustomerPreferenceStore();
const isLoading = defineModel<boolean>('is-loading', { default: false });

const city = ref('');
const searchCity = ref('');
const optionsCity = ref<ICityOption[]>([]);
const showErrors = ref(false);

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

    optionsCity.value = response.data.map(item => ({
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
  searchCity.value = '';
};

const removeLocation = (location: string) => {
  preference.data.locations = preference.data.locations?.filter(
    item => item !== location,
  );
};

watchDebounced(
  searchCity,
  async () => {
    if (searchCity.value.trim()) {
      await getCities();
    } else {
      optionsCity.value = [];
    }
  },
  { debounce: 300, maxWait: 500 },
);

const continueWithValidation = () => {
  showErrors.value = true;
};
</script>

<template>
  <main class="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
    <!-- Progress -->
    <div class="mb-10 sm:mb-16">
      <div class="mb-3 flex justify-between text-xs text-slate-500 sm:text-sm">
        <span>20% Complete</span>
        <span>1 / 5</span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full w-1/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-8 sm:mb-12">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-4xl lg:text-5xl">
        Pilih Lokasi <span class="text-red-500">*</span>
      </h1>

      <p class="mt-4 text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8">
        Pilih lokasi yang Anda inginkan, dan kami akan membantu menemukan
        properti yang tepat.
      </p>
    </div>

    <!-- Search -->
    <div class="mb-8 sm:mb-10">
      <div class="w-full rounded-2xl border border-slate-300 bg-white py-1 text-base outline-none transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:text-lg">
        <base-select
          v-model="city"
          v-model:search="searchCity"
          placeholder="Pilih lokasi yang Anda inginkan"
          :options="optionsCity"
          @select="selectLocation"
          border="none"
        />
      </div>

      <p
        v-if="showErrors && !preference.data.locations?.length"
        class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
      >
        <base-icon icon="i-fa7-solid:warning" class="bg-red" />
        Lokasi wajib diisi.
      </p>

      <!-- Selected Locations -->
      <div v-if="preference.data.locations?.length" class="mt-5">
        <p class="mb-3 text-sm font-medium text-slate-600">
          Lokasi pilihan Anda
        </p>

        <div class="flex flex-wrap gap-2 sm:gap-3">
          <div
            v-for="location in preference.data.locations"
            :key="location"
            class="flex max-w-full items-center gap-2 rounded-full bg-blue-50 py-2 pl-3 pr-2 text-sm font-medium text-blue-700 sm:pl-4"
          >
            <span class="break-words">
              {{ location }}
            </span>

            <base-button
              class="shrink-0 rounded-full bg-red-100"
              @click="removeLocation(location)"
            >
              <span class="h-3 w-3 i-fa7-solid:x"></span>
            </base-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-12 flex items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:mt-20 sm:pt-8">
      <router-link
        to="/"
        class="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-100 sm:px-6 sm:text-base"
      >
        Back
      </router-link>

      <router-link
        v-if="preference.data.locations?.length"
        to="/customer-preferences/budget"
        class="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition sm:px-8 sm:text-base"
      >
        Continue
      </router-link>

      <button
        v-else
        type="button"
        class="inline-flex min-h-11 items-center justify-center rounded-xl bg-gray-300 px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:text-base"
        @click="continueWithValidation"
      >
        Continue
      </button>
    </div>
  </main>
</template>