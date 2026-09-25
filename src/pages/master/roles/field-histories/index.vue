<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { findRoleApi } from '@/composables/api/master/roles/find-by-id.api';
import { useAuthStore } from '@/stores/auth.store.ts';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardTable from './card-table.vue';

const role = ref();
const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (!authStore.hasPermissions(['roles:read'])) {
    router.push('/403');
  }

  const response = await findRoleApi(route.params.id as string);

  role.value = response;
});
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs :role_identifier="role?.name" />
    <card-table />
  </div>
</template>
