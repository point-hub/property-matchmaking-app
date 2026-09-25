<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { findProblemApi } from '@/composables/api/problems/find-by-id.api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const route = useRoute();
const problem = ref();

onMounted(async () => {
  const response = await findProblemApi(route.params.id as string);

  problem.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :problem_identifier="`${problem?.name}`" />
    <card-table />
  </div>
</template>
