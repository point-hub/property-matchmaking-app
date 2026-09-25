<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findFacilityApi } from '@/composables/api/facilities/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const facility = ref();

onMounted(async () => {
  const response = await findFacilityApi(route.params.id as string);

  facility.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :facility_identifier="`${facility?.name}`" />
    <card-table />
  </div>
</template>
