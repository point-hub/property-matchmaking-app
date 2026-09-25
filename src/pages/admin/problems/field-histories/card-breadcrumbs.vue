<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const props = defineProps<{
  problem_identifier: string
}>();

const route = useRoute();

const breadcrumbs = computed<IBreadcrumb[]>(() => [
  { name: 'Home', path: '/admin/home' },
  { name: 'Problems', path: '/admin/problems' },
  {
    name: props.problem_identifier ?? String(route.params.id),
    path: `/admin/problems/${route.params.id}`,
  },
  {
    name: 'Audits',
    path: `/admin/problems/${route.params.id}/audits`,
  },
  {
    name: String(route.params.field),
  },
]);
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
