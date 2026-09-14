<script setup lang="ts">
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/admin' },
  { name: 'Properties', path: '/admin/properties' },
  { name: route.params.id as string, path: `/properties/${route.params.id}` },
  { name: 'Histories' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
