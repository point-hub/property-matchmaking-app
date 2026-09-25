<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findLandTitleApi } from '@/composables/api/land-titles/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const landTitle = ref();

onMounted(async () => {
  const response = await findLandTitleApi(route.params.id as string);

  landTitle.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :landTitle_identifier="`${landTitle?.name}`" />
    <card-table />
  </div>
</template>
