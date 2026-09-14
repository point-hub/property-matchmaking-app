<script setup lang="ts">
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/admin' },
  { name: 'Land Titles', path: '/admin/land-titles' },
  { name: `${route.params.id}`, path: `/land-titles/${route.params.id}` },
  { name: 'Edit' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
