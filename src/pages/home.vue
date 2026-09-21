<script setup lang="ts">
import { onMounted, ref } from 'vue';

import AppMenu, { type IMenu } from '@/components/app-menu.vue';
import { useAuthStore } from '@/stores/auth.store';

const breadcrumbs = [
  {
    name: 'Home',
    path: '/admin',
  },
];

const authStore = useAuthStore();
const menus = ref<IMenu[]>([]);

onMounted(() => {
  // if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Land Titles', path: '/master', icon: 'i-fa7-solid:address-card' }); }
  // if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Facilities', path: '/master', icon: 'i-fa7-solid:address-card' }); }
  // if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Problems', path: '/master', icon: 'i-fa7-solid:address-card' }); }
  // if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Promos', path: '/master', icon: 'i-fa7-solid:address-card' }); }
  // if (authStore.hasPermissions(['master:module'])) { menus.value.push({ name: 'Properties', path: '/master', icon: 'i-fa7-solid:address-card' }); }
});
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
