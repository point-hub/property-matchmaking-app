<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findPropertyApi } from '@/composables/api/properties/find-by-id.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import StatusBanner from '../../../../components/status-banner.vue';
import CardActions from '../components/card-actions.vue';
import DeleteModal from '../components/delete-modal/index.vue';
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

const route = useRoute();
const form = useForm();

const isLoading = ref(false);

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

const onArchived = async () => {
  form.data.is_archived = true;
};

const onRestored = async () => {
  form.data.is_archived = false;
};
</script>

<template>
  <delete-modal ref="deleteModalRef" />
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <card-actions v-model:data="form.data" @restored="onRestored" @archived="onArchived" />

    <status-banner v-if="form.data.is_archived" status-type="danger" message="This data has been archived." />

    <base-card v-if="!form.data._id">
      Data Not Found
    </base-card>
    <template v-else>
      <card-form v-model:data="form.data" />
      <card-pricelists v-model:data="form.data" />
      <card-land-titles v-model:data="form.data" />
      <card-facilities v-model:data="form.data" />
      <card-promos v-model:data="form.data" />
      <card-info-developer v-model:data="form.data" />
      <card-photos-gate v-model:data="form.data" />
      <card-photos-building v-model:data="form.data" />
      <card-internal-notes v-model:data="form.data" />
    </template>
  </app-container>
</template>
