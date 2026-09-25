<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { findUserApi } from '@/composables/api/master/users/find-by-id.api';
import { useAuthStore } from '@/stores/auth.store.ts';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const user = ref();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if (!authStore.hasPermissions(['users:read'])) {
    router.push('/403');
  }

  const response = await findUserApi(route.params.id as string);

  user.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :user_identifier="`${user?.username}`" />
    <card-table />
  </div>
</template>
