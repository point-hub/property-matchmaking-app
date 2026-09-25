<script setup lang="ts">
import { onMounted } from 'vue';
import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store.ts';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  if (!authStore.hasPermissions(['read'])) {
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
