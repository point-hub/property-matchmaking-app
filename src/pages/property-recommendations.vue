<script setup lang="ts">
import { numberFormat } from '@point-hub/js-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findCustomerPreferenceApi } from '@/composables/api/customer-preferences/find-by-id.api';
import { getPropertyRecommendationsApi } from '@/composables/api/properties/get-recommendations.api';

const route = useRoute();
const id = route.query.id?.toString();
const preference = ref();
const properties = ref();

interface IProperty {
  code?: string
  name?: string
  address?: string
  village?: string
  district?: string
  city?: string
  google_map_link?: string
  instagram?: string
  pricelists?: { building_area: number, land_area: number, price:number }[]
  land_titles?: string[]
  facilities?: string[]
  promos?: string[]
  developer_name?: string
  whatsapp?: string
  mou?: string
  photos_gate?: string[]
  photos_building?: string[]
}

onMounted(async () => {
  if (id) {
    preference.value = await findCustomerPreferenceApi(id);
    properties.value = await getPropertyRecommendationsApi({
      sort: '-match_score',
      page_size: 10,
      preferences: {
        locations: preference.value.locations,
        budget_min: preference.value.budget_min,
        budget_max: preference.value.budget_max,
      },
    });
  }
});

const isLocationMatched = (property: IProperty): boolean => {
  return preference.value.locations?.includes(property.city ?? '') ?? false;
};

const isPriceMatched = (property: IProperty): boolean => {
  const budgetMin = preference.value.budget_min;
  const budgetMax = preference.value.budget_max;

  return property.pricelists?.some(
    pricelist =>
      pricelist.price >= budgetMin &&
      pricelist.price <= budgetMax,
  ) ?? false;
};
</script>

<template>
  <main class="min-h-screen bg-slate-50" v-if="preference">

    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">

        <div>
          <h1 class="text-2xl font-bold text-slate-900">
            Your Property Matches
          </h1>

          <p class="text-sm text-slate-500">
            Personalized recommendations based on your preferences
          </p>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-7xl px-8 py-12">

      <!-- Hero -->

      <section
        class="rounded-[32px] bg-gradient-to-r from-blue-700 to-blue-500 p-12 text-white"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium opacity-90">
              Property Match Complete
            </p>

            <h2 class="mt-3 text-5xl font-bold">
              We found {{ properties.data.length }} properties
            </h2>

            <p class="mt-5 max-w-2xl text-lg opacity-90">
              After analyzing your preferences, we've selected the properties
              that best fit your prefered location and budget.
            </p>
          </div>
        </div>

      </section>

      <!-- Summary -->
      <section class="mt-10 grid gap-6 lg:grid-cols-4">

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Location</div>
          <div class="mt-2 font-semibold">{{ preference.locations?.join(', ') }}</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Budget</div>
          <div class="mt-2 font-semibold">Rp. {{ numberFormat(preference.budget_min) }} - Rp. {{ numberFormat(preference.budget_max) }}</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Buying Problems</div>
          <div class="mt-2 font-semibold">{{ preference.problems?.join(', ') }}</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Promotion Needs</div>
          <div class="mt-2 font-semibold">{{ preference.promos?.join(', ') }}</div>
        </div>
      </section>

      <!-- Comparison -->

      <section v-if="properties.data.length" class="mt-20">

        <h2 class="text-3xl font-bold">
          Compare Our Top Picks
        </h2>

        <div class="flex flex-wrap items-center gap-6 my-4">

          <div class="flex items-center gap-3">
            <div class="h-5 w-5 rounded-md border border-green-400 bg-green-100"></div>

            <span class="text-sm text-slate-600">
              Matches your criteria
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="h-5 w-5 rounded-md border border-red-400 bg-red-100"></div>

            <span class="text-sm text-slate-600">
              Doesn't match your criteria
            </span>
          </div>

        </div>

        <div class="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">

          <base-table class="w-full" v-if="properties?.data?.length">
            <thead class="bg-slate-100">
              <tr>
                <th class="p-5 text-left">Property</th>

                <th v-for="property in properties.data" :key="property._id">{{ property.code }}</th>
              </tr>
            </thead>

            <tbody class="divide-y">
              <tr>
                <td></td>
                <td class="w-64 min-w-64 p-4" v-for="property in properties.data" :key="property._id">
                  <div class="flex gap-2 justify-center">
                    <a :href="property.photos_gate?.[0]" target="_blank" v-if="property.photos_gate?.[0]">
                      <img
                        :src="property.photos_gate?.[0]"
                        class="h-24 w-24 flex-none rounded-lg object-cover"
                      >
                    </a>
                    <a :href="property.photos_building?.[0]" target="_blank" v-if="property.photos_building?.[0]">
                      <img
                        :src="property.photos_building?.[0]"
                        class="h-24 w-24 flex-none rounded-lg object-cover"
                      >
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p-5">Lokasi</td>

                <td v-for="(property, index) in properties.data" :key="index" :class="`px-4 ${isLocationMatched(property) ? 'bg-green-100' : 'bg-red-100'}`">
                  {{ property.city }}
                </td>
              </tr>
              <tr>
                <td class="p-5">Harga</td>

                <td v-for="(property, index) in properties.data" :key="index" :class="`px-4 ${isPriceMatched(property) ? 'bg-green-100' : 'bg-red-100'}`">
                  <div v-for="pricelist in property.pricelists">
                    Tipe {{ pricelist.building_area }}/{{ pricelist.land_area }} (Rp. {{ numberFormat(pricelist.price) }})
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p-5">Sertifikat Tanah</td>
                <template v-for="property in properties.data">
                  <td class="min-w-48 p-4">
                    <ul class="space-y-1 text-sm">
                      <li v-for="landTitle in property.land_titles">✓ {{landTitle}}</li>
                    </ul>
                  </td>
                </template>
              </tr>

              <tr>
                <td class="p-5">Fasilitas</td>

                <template v-for="property in properties.data">
                  <td class="min-w-72 p-4">
                    <ul class="space-y-1 text-sm">
                      <li v-for="facility in property.facilities">✓ {{facility}}</li>
                    </ul>
                  </td>
                </template>
              </tr>
            </tbody>
          </base-table>
        </div>
      </section>

      <section v-else class="mx-auto py-12">
        <div class="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
            <base-icon icon="i-fa7-solid:triangle-exclamation" class="w-12 h-12 text-gray-500" />
          </div>

          <p class="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Property Search Results
          </p>

          <h2 class="mt-3 text-3xl font-bold text-slate-900">
            Belum ada properti yang sesuai
          </h2>

          <p class="mx-auto mt-4 max-w-xl leading-7 text-slate-500 mb-10">
            Kami belum menemukan properti yang sesuai dengan kriteria Anda saat ini. Jangan khawatir — Anda mungkin bisa menemukan lebih banyak pilihan dengan menyesuaikan lokasi atau anggaran Anda.
          </p>

          <div class="flex gap-2 items-center justify-center">
            <router-link
              to="/customer-preferences/location"
              class="rounded-xl bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
            >
              Mulai Konsultasi Gratis
            </router-link>

            <a
              href="https://wa.me/6281357747377"
              class="rounded-xl bg-orange-300 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
            >
              <div class="i-logos-whatsapp-icon h-5 w-5"></div>

              Hubungi via Whatsapp
            </a>
          </div>
        </div>
      </section>

      <!-- Remaining Results -->

      <!-- <section class="mt-20">

        <div class="flex items-center justify-between">

          <h2 class="text-3xl font-bold">
            More Recommended Properties
          </h2>

          <button class="text-blue-600">
            View All →
          </button>

        </div>

      </section> -->

    </div>

  </main>
</template>