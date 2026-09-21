<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';
import { useAuthStore } from '@/stores/auth.store';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/admin/home',
  },
];

const authStore = useAuthStore();
const menus = ref<IMenu[]>([]);

onMounted(() => {
  if (authStore.hasPermissions(['land-titles:module'])) { menus.value.push({ name: 'Land Titles', path: '/admin/land-titles', icon: 'i-fa7-solid:file-certificate' }); }
  if (authStore.hasPermissions(['facilities:module'])) { menus.value.push({ name: 'Facilities', path: '/admin/facilities', icon: 'i-fa7-solid:trees' }); }
  if (authStore.hasPermissions(['problems:module'])) { menus.value.push({ name: 'Problems', path: '/admin/problems', icon: 'i-fa7-solid:circle-exclamation' }); }
  if (authStore.hasPermissions(['promos:module'])) { menus.value.push({ name: 'Promos', path: '/admin/promos', icon: 'i-fa7-solid:billboard' }); }
  if (authStore.hasPermissions(['properties:module'])) { menus.value.push({ name: 'Properties', path: '/admin/properties', icon: 'i-fa7-solid:house-building' }); }
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
