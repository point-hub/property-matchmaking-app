<script setup lang="ts">
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs: IBreadcrumb[] = [
  { name: 'Home', path: '/admin/home' },
  { name: 'Master', path: '/admin/master' },
  { name: 'Roles', path: '/admin/master/roles' },
  { name: route.params.id as string, path: `/admin/master/roles/${route.params.id}` },
  { name: 'Audits' },
];
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
