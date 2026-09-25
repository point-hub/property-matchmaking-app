<script setup lang="ts">
import { useRouter } from 'vue-router';
import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';
import { useAuthStore } from '@/stores/auth.store.ts';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (!authStore.hasPermissions(['users:read'])) {
    router.push('/403');
  }
})
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs />
    <card-table />
  </div>
</template>
