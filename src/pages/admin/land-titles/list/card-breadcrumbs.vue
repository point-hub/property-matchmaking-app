<script setup lang="ts">
import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/admin' },
  { name: 'Land Titles' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
