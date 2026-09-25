<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppBreadcrumb, { type IBreadcrumb } from '@/components/app-breadcrumb.vue';

const route = useRoute();

const breadcrumbs = computed<IBreadcrumb[]>(() => [
  { name: 'Home', path: '/admin/home' },
  { name: 'Master', path: '/admin/master' },
  { name: 'Roles', path: '/admin/master/roles' },
  { name: String(route.params.id), path: `/admin/master/roles/${route.params.id}` },
  { name: 'Audits', path: `/admin/master/roles/${route.params.id}/audits` },
  { name: String(route.params.field) },
]);
</script>

<template>
  <app-breadcrumb :breadcrumbs="breadcrumbs" />
</template>
