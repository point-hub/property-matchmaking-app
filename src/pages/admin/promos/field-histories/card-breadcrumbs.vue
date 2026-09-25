<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const props = defineProps<{
  promo_identifier: string
}>();

const route = useRoute();

const breadcrumbs = computed<IBreadcrumb[]>(() => [
  { name: 'Home', path: '/admin/home' },
  { name: 'Promos', path: '/admin/promos' },
  {
    name: props.promo_identifier ?? String(route.params.id),
    path: `/admin/promos/${route.params.id}`,
  },
  {
    name: 'Audits',
    path: `/admin/promos/${route.params.id}/audits`,
  },
  {
    name: String(route.params.field),
  },
]);
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
