<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { getPublicPromosApi } from '@/composables/api/promos/get-public.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';

const preference = useCustomerPreferenceStore();

const isLoading = ref(false);
const promos = ref();
const isOtherSelected = ref(false);
const otherPromo = ref('');

watch(
  [isOtherSelected, otherPromo],
  () => {
    const currentPromos = preference.data.promos ?? [];

    const normalPromos = currentPromos.filter(
      (promo) => !promo.startsWith('Others:'),
    );

    if (
      isOtherSelected.value &&
      otherPromo.value.trim()
    ) {
      normalPromos.push(
        `Others: ${otherPromo.value.trim()}`,
      );
    }

    preference.data.promos = normalPromos;
  },
);

const getData = async (page = 1) => {
  try {
    isLoading.value = true;

    const response = await getPublicPromosApi({
      page,
      page_size: 10,
    });

    promos.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

const restoreOtherPromo = (): void => {
  const otherValue = preference.data.promos?.find(
    (promo) => promo.startsWith('Others:'),
  );

  if (!otherValue) {
    return;
  }

  isOtherSelected.value = true;
  otherPromo.value = otherValue.replace(/^Others:\s*/, '');
};

onMounted(async () => {
  restoreOtherPromo();
  await getData();
});
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-12">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>80% Complete</span>
        <span>4 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-4/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-10">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Kebutuhan Promo
      </h1>

      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Pilih promo yang sesuai dengan kebutuhan Anda agar kami dapat
        memberikan rekomendasi terbaik.
      </p>
    </div>

    <!-- Form Card -->
    <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <div class="flex flex-col gap-4">
        <label
          v-for="promo in promos"
          :key="promo.name"
          class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md"
        >
          <base-checkbox
            v-model="preference.data.promos"
            :true-value="promo.name"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          />

          <div>
            <div class="text-xl font-semibold">
              {{ promo.name }}
            </div>

            <p class="mt-2 text-slate-500">
              {{ promo.description }}
            </p>
          </div>
        </label>

        <label
          class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md"
        >
          <input
            v-model="isOtherSelected"
            type="checkbox"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          >

          <div class="w-full">
            <div class="text-xl font-semibold">
              Lainnya
            </div>

            <textarea
              v-model="otherPromo"
              rows="4"
              placeholder="Beritahu kami kebutuhan promo Anda"
              class="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>
        </label>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-12 flex items-center justify-between">
      <router-link
        to="/customer-preferences/buying-problem"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <router-link
        to="/customer-preferences/user-info"
        class="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>