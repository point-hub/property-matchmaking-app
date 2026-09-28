<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findPropertyApi } from '@/composables/api/properties/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const property = ref();

onMounted(async () => {
  const response = await findPropertyApi(route.params.id as string);

  property.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :property_identifier="`${property?.name}`" />
    <card-table />
  </div>
</template>
