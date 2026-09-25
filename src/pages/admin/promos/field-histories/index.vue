<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findPromoApi } from '@/composables/api/promos/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const promo = ref();

onMounted(async () => {
  const response = await findPromoApi(route.params.id as string);

  promo.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :promo_identifier="`${promo?.name}`" />
    <card-table />
  </div>
</template>
