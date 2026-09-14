<script setup lang="ts">
import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/admin' },
  { name: 'Properties', path: '/admin/properties' },
  { name: 'Create' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
