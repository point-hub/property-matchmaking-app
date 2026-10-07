<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findPropertyApi } from '@/composables/api/properties/find-by-id.api';
import { updatePropertyApi } from '@/composables/api/properties/update.api';
import router from '@/router';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardFacilities from './card-facilities.vue';
import CardForm from './card-form.vue';
import CardInfoDeveloper from './card-info-developer.vue';
import CardInternalNotes from './card-internal-notes.vue';
import CardLandTitles from './card-land-titles.vue';
import CardPhotosBuilding from './card-photos-building.vue';
import CardPhotosGate from './card-photos-gate.vue';
import CardPricelists from './card-pricelists.vue';
import CardPromos from './card-promos.vue';
import { useForm } from './form.ts';

const form = useForm();
const route = useRoute();

const isLoading = ref(false);
const isSaving = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findPropertyApi(route.params.id as string);
    if (response) {
      Object.assign(form.data, response);
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isLoading.value = false;
  }
});

const update = async () => {
  try {
    isSaving.value = true;
    const response = await updatePropertyApi(route.params.id as string, form.data);
    if (response?.matched_count) {
      toast('Update success', { color: 'success' });
      await router.push(`/admin/properties/${route.params.id}`);
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.name = errorResponse.errors.name || [];
      form.errors.notes = errorResponse.errors.notes || [];
      form.errors.update_reason = errorResponse.errors.update_reason || [];
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
      });
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-pricelists v-model:data="form.data" />
    <card-land-titles v-model:data="form.data" />
    <card-facilities v-model:data="form.data" />
    <card-promos v-model:data="form.data" />
    <card-info-developer v-model:data="form.data" />
    <card-photos-gate v-model:data="form.data" />
    <card-photos-building v-model:data="form.data" />
    <card-internal-notes v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="update">Update</base-button>
    </div>
  </app-container>
</template>
