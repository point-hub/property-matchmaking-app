
<script setup lang="ts">
import { numberFormat } from '@point-hub/js-utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findCustomerPreferenceApi } from '@/composables/api/customer-preferences/find-by-id.api';
import { getPropertyRecommendationsApi } from '@/composables/api/properties/get-recommendations.api';

interface IProperty {
  _id?: string;
  code?: string;
  name?: string;
  address?: string;
  village?: string;
  district?: string;
  city?: string;
  google_map_link?: string;
  instagram?: string;
  pricelists?: {
    building_area: number;
    land_area: number;
    price: number;
  }[];
  land_titles?: string[];
  facilities?: string[];
  promos?: string[];
  developer_name?: string;
  whatsapp?: string;
  mou?: string;
  photos_gate?: string[];
  photos_building?: string[];
}

interface ICustomerPreference {
  locations?: string[];
  budget_min?: number;
  budget_max?: number;
  problems?: string[];
  promos?: string[];
}

const route = useRoute();
const id = route.query.id?.toString();

const preference = ref<ICustomerPreference | null>(null);
const properties = ref<IProperty[]>([]);
const isLoading = ref(true);
const errorMessage = ref('');

onMounted(async () => {
  if (!id) {
    errorMessage.value = 'Customer preference ID is missing.';
    isLoading.value = false;
    return;
  }

  try {
    const preferenceResponse = await findCustomerPreferenceApi(id);
    preference.value = preferenceResponse;

    const propertyResponse = await getPropertyRecommendationsApi({
      sort: '-match_score',
      page_size: 10,
      preferences: {
        locations: preferenceResponse.locations,
        budget_min: preferenceResponse.budget_min,
        budget_max: preferenceResponse.budget_max,
      },
    });

    properties.value = propertyResponse.data ?? [];
  } catch {
    errorMessage.value =
      'Unable to load your property recommendations. Please try again.';
  } finally {
    isLoading.value = false;
  }
});

const isLocationMatched = (property: IProperty): boolean => {
  return preference.value?.locations?.includes(property.city ?? '') ?? false;
};

const isPriceMatched = (property: IProperty): boolean => {
  const budgetMin = preference.value?.budget_min;
  const budgetMax = preference.value?.budget_max;

  if (budgetMin == null || budgetMax == null) {
    return false;
  }

  return property.pricelists?.some(
    (pricelist) =>
      pricelist.price >= budgetMin &&
      pricelist.price <= budgetMax,
  ) ?? false;
};

const formatPrice = (price: number): string => {
  return `Rp ${numberFormat(price)}`;
};

const propertyImages = (property: IProperty): string[] => {
  return [
    ...(property.photos_gate ?? []),
    ...(property.photos_building ?? []),
  ].filter((url) => Boolean(url));
};
</script>

<template>
  <main class="min-h-screen bg-slate-50 text-slate-900">
    <header
      class="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"
    >
      <div
        class="mx-auto flex min-h-16 max-w-7xl items-center px-4 py-3 sm:px-6 lg:px-8"
      >
        <div>
          <h1 class="text-lg font-bold sm:text-2xl">
            Your Property Matches
          </h1>
          <p class="mt-1 text-xs text-slate-500 sm:text-sm">
            Personalized recommendations based on your preferences
          </p>
        </div>
      </div>
    </header>

    <div
      v-if="isLoading"
      class="mx-auto flex min-h-96 max-w-7xl items-center justify-center px-4"
    >
      <div class="text-center">
        <div
          class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"
        />
        <p class="mt-4 text-sm text-slate-500">
          Finding your recommended properties...
        </p>
      </div>
    </div>

    <section
      v-else-if="errorMessage"
      class="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6"
    >
      <div class="rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <h2 class="text-xl font-bold">Unable to load results</h2>
        <p class="mt-3 text-sm leading-6 text-slate-600">
          {{ errorMessage }}
        </p>
        <button
          class="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          @click="$router.go(0)"
        >
          Try Again
        </button>
      </div>
    </section>

    <div v-else-if="preference" class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <section
        class="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 p-6 text-white shadow-sm sm:rounded-3xl sm:p-10 lg:p-12"
      >
        <p class="text-sm font-semibold opacity-90 sm:text-base">
          Property Match Complete
        </p>

        <h2 class="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          We found {{ properties.length }}
          {{ properties.length === 1 ? 'property' : 'properties' }}
        </h2>

        <p class="mt-4 max-w-2xl text-sm leading-6 text-blue-50 sm:mt-5 sm:text-lg sm:leading-8">
          We've selected properties based on your preferred location and budget.
          Compare your options below to find the right home for you.
        </p>
      </section>

      <section class="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <article class="min-w-0 rounded-2xl bg-white p-5 shadow-sm">
          <p class="text-sm text-slate-500">Preferred Locations</p>
          <p class="mt-2 break-words font-semibold">
            {{ preference.locations?.join(', ') || 'Not specified' }}
          </p>
        </article>

        <article class="min-w-0 rounded-2xl bg-white p-5 shadow-sm">
          <p class="text-sm text-slate-500">Budget</p>
          <p class="mt-2 break-words font-semibold">
            {{ preference.budget_min != null ? formatPrice(preference.budget_min) : '—' }}
            <span class="text-slate-400">–</span>
            {{ preference.budget_max != null ? formatPrice(preference.budget_max) : '—' }}
          </p>
        </article>

        <article class="min-w-0 rounded-2xl bg-white p-5 shadow-sm">
          <p class="text-sm text-slate-500">Buying Problems</p>
          <p class="mt-2 break-words font-semibold">
            {{ preference.problems?.join(', ') || 'None specified' }}
          </p>
        </article>

        <article class="min-w-0 rounded-2xl bg-white p-5 shadow-sm">
          <p class="text-sm text-slate-500">Promotion Needs</p>
          <p class="mt-2 break-words font-semibold">
            {{ preference.promos?.join(', ') || 'None specified' }}
          </p>
        </article>
      </section>

      <section v-if="properties.length" class="mt-10 sm:mt-16">
        <div class="mb-6">
          <h2 class="text-2xl font-bold sm:text-3xl">
            Compare Our Top Picks
          </h2>
          <p class="mt-2 text-sm leading-6 text-slate-500">
            Check which properties match your budget and preferred location.
          </p>

          <div class="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
            <div class="flex items-center gap-2">
              <span class="h-4 w-4 rounded border border-green-400 bg-green-100" />
              <span class="text-slate-600">Matches your criteria</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="h-4 w-4 rounded border border-red-400 bg-red-100" />
              <span class="text-slate-600">Outside your criteria</span>
            </div>
          </div>
        </div>

        <div class="space-y-5 md:hidden">
          <article
            v-for="(property, index) in properties"
            :key="property._id ?? property.code ?? index"
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="p-4 sm:p-5">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Property {{ index + 1 }}
                  </p>
                  <h3 class="mt-1 break-words text-lg font-bold">
                    {{ property.name || property.code || 'Property' }}
                  </h3>
                  <p class="mt-1 text-sm text-slate-500">
                    {{ property.code || 'Property details' }}
                  </p>
                </div>
                <a
                  v-if="property.google_map_link"
                  :href="property.google_map_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Map
                </a>
              </div>

              <div
                v-if="propertyImages(property).length"
                class="mt-4 flex gap-3 overflow-x-auto pb-2"
              >
                <a
                  v-for="(photo, photoIndex) in propertyImages(property)"
                  :key="photo"
                  :href="photo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block shrink-0"
                >
                  <img
                    :src="photo"
                    :alt="`${property.name || property.code || 'Property'} photo ${photoIndex + 1}`"
                    class="h-28 w-36 rounded-xl object-cover sm:h-36 sm:w-48"
                    loading="lazy"
                  />
                </a>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3">
                <div
                  class="min-w-0 rounded-xl p-3"
                  :class="isLocationMatched(property) ? 'border border-green-200 bg-green-50' : 'border border-red-200 bg-red-50'"
                >
                  <p class="text-xs text-slate-500">Location</p>
                  <p class="mt-1 break-words text-sm font-semibold">
                    {{ [property.village, property.district, property.city].filter(Boolean).join(', ') || 'Not specified' }}
                  </p>
                  <p
                    class="mt-2 text-xs font-semibold"
                    :class="isLocationMatched(property) ? 'text-green-700' : 'text-red-700'"
                  >
                    {{ isLocationMatched(property) ? 'Matches location' : 'Outside location' }}
                  </p>
                </div>

                <div
                  class="min-w-0 rounded-xl p-3"
                  :class="isPriceMatched(property) ? 'border border-green-200 bg-green-50' : 'border border-red-200 bg-red-50'"
                >
                  <p class="text-xs text-slate-500">Budget</p>
                  <p class="mt-1 text-sm font-semibold">
                    {{ isPriceMatched(property) ? 'Within budget' : 'No price match' }}
                  </p>
                  <p
                    class="mt-2 text-xs font-semibold"
                    :class="isPriceMatched(property) ? 'text-green-700' : 'text-red-700'"
                  >
                    {{ isPriceMatched(property) ? 'Matches budget' : 'Outside budget' }}
                  </p>
                </div>
              </div>

              <div class="mt-5">
                <h4 class="font-semibold">Available Prices</h4>
                <div
                  v-if="property.pricelists?.length"
                  class="mt-3 space-y-3"
                >
                  <div
                    v-for="(pricelist, priceIndex) in property.pricelists"
                    :key="priceIndex"
                    class="rounded-xl border border-slate-200 p-3"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <span class="text-sm text-slate-600">
                        Type {{ pricelist.building_area }}/{{ pricelist.land_area }}
                      </span>
                      <span class="text-right text-sm font-bold">
                        {{ formatPrice(pricelist.price) }}
                      </span>
                    </div>
                    <span
                      v-if="preference.budget_min != null && preference.budget_max != null && pricelist.price >= preference.budget_min && pricelist.price <= preference.budget_max"
                      class="mt-2 inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800"
                    >
                      Within your budget
                    </span>
                  </div>
                </div>
                <p v-else class="mt-2 text-sm text-slate-500">
                  Price information is not available.
                </p>
              </div>

              <div v-if="property.land_titles?.length" class="mt-5">
                <h4 class="font-semibold">Sertifikat Tanah</h4>
                <ul class="mt-2 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <li
                    v-for="landTitle in property.land_titles"
                    :key="landTitle"
                    class="flex items-start gap-2"
                  >
                    <span class="text-green-600">✓</span>
                    <span class="break-words">{{ landTitle }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="property.facilities?.length" class="mt-5">
                <h4 class="font-semibold">Facilities</h4>
                <ul class="mt-2 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <li
                    v-for="facility in property.facilities"
                    :key="facility"
                    class="flex items-start gap-2"
                  >
                    <span class="text-green-600">✓</span>
                    <span class="break-words">{{ facility }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="property.promos?.length" class="mt-5">
                <h4 class="font-semibold">Promotions</h4>
                <ul class="mt-2 space-y-1 text-sm text-slate-600">
                  <li v-for="promo in property.promos" :key="promo">
                    <span class="mr-1 text-green-600">✓</span> {{ promo.name }}
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        <div class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div class="overflow-x-auto">
            <table class="w-full min-w-max border-collapse text-sm">
              <thead class="bg-slate-100">
                <tr>
                  <th class="sticky left-0 z-20 min-w-48 border-b border-r border-slate-200 bg-slate-100 p-4 text-left font-semibold">
                    Property Details
                  </th>
                  <th
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="min-w-64 border-b border-slate-200 p-4 text-left font-semibold"
                  >
                    {{ property.code || property.name || `Property ${index + 1}` }}
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-slate-200">
                <tr>
                  <th class="sticky left-0 z-10 border-r border-slate-200 bg-white p-4 text-left font-medium">
                  </th>
                  <td
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="p-4"
                  >
                    <div class="flex gap-2">
                      <a
                        v-for="(photo, photoIndex) in propertyImages(property).slice(0, 2)"
                        :key="photo"
                        :href="photo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          :src="photo"
                          :alt="`Property photo ${photoIndex + 1}`"
                          class="h-24 w-24 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </a>
                      <span
                        v-if="!propertyImages(property).length"
                        class="text-slate-400"
                      >
                        No photos
                      </span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th class="sticky left-0 z-10 border-r border-slate-200 bg-white p-4 text-left font-medium">
                    Lokasi
                  </th>
                  <td
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="p-4 align-top"
                    :class="isLocationMatched(property) ? 'bg-green-50' : 'bg-red-50'"
                  >
                    <p class="font-medium">
                      {{ property.city }}
                    </p>
                  </td>
                </tr>

                <tr>
                  <th class="sticky left-0 z-10 border-r border-slate-200 bg-white p-4 text-left font-medium">
                    Harga
                  </th>
                  <td
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="p-4 align-top"
                    :class="isPriceMatched(property) ? 'bg-green-50' : 'bg-red-50'"
                  >
                    <div
                      v-for="(pricelist, priceIndex) in property.pricelists ?? []"
                      :key="priceIndex"
                      class="mb-3 last:mb-0"
                    >
                      <p class="mt-1 text-xs text-slate-500">
                        Type {{ pricelist.building_area }}/{{ pricelist.land_area }}
                      </p>
                      <p class="font-semibold">
                        {{ formatPrice(pricelist.price) }}
                      </p>
                    </div>
                  </td>
                </tr>

                <tr>
                  <th class="sticky left-0 z-10 border-r border-slate-200 bg-white p-4 text-left font-medium">
                    Sertifikat Tanah
                  </th>
                  <td
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="p-4 align-top"
                  >
                    <ul v-if="property.land_titles?.length" class="space-y-2">
                      <li v-for="title in property.land_titles" :key="title">
                        <span class="mr-1 text-green-600">✓</span> {{ title }}
                      </li>
                    </ul>
                    <span v-else class="text-slate-400">—</span>
                  </td>
                </tr>

                <tr>
                  <th class="sticky left-0 z-10 border-r border-slate-200 bg-white p-4 text-left font-medium">
                    Fasilitas
                  </th>
                  <td
                    v-for="(property, index) in properties"
                    :key="property._id ?? property.code ?? index"
                    class="p-4 align-top"
                  >
                    <ul v-if="property.facilities?.length" class="space-y-2">
                      <li v-for="facility in property.facilities" :key="facility">
                        <span class="mr-1 text-green-600">✓</span>{{ facility }}
                      </li>
                    </ul>
                    <span v-else class="text-slate-400">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500">
            Scroll horizontally to compare all properties.
          </p>
        </div>
      </section>

      <section
        v-else
        class="mt-8 rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm sm:mt-12 sm:px-10 sm:py-14"
      >
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <base-icon icon="i-fa7-solid:triangle-exclamation" class="h-8 w-8" />
        </div>

        <p class="mt-5 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Property Search Results
        </p>

        <h2 class="mt-3 text-2xl font-bold sm:text-3xl">
          Belum ada properti yang sesuai
        </h2>

        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
          Kami belum menemukan properti yang sesuai dengan kriteria Anda saat ini.
          Coba sesuaikan lokasi atau anggaran Anda, atau hubungi tim kami untuk
          mendapatkan rekomendasi lainnya.
        </p>

        <div class="mx-auto mt-7 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <router-link
            to="/customer-preferences/location"
            class="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Mulai Konsultasi Gratis
          </router-link>

          <a
            href="https://wa.me/6281357747377"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-12 items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      <footer class="mt-10 border-t border-slate-200 py-6 text-center sm:mt-14">
        <p class="text-xs leading-6 text-slate-500 sm:text-sm">
          Need help choosing your next home? Contact Kawan Hunian for personalized assistance.
        </p>
        <a
          href="https://wa.me/6281357747377"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Talk to Our Team
        </a>
      </footer>
    </div>
  </main>
</template>
