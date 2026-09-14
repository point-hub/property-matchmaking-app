<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppContainer from '@/components/app-container.vue';
import { findExampleApi } from '@/composables/api/promos/find-by-id.api';
import { toast } from '@/toast';
import { handleError } from '@/utils/api';

import DeleteModal from '../components/delete-modal/index.vue';
import StatusBanner from '../../../../components/status-banner.vue';
import CardActions from '../components/card-actions.vue';
import CardBreadcrumbs from './card-breadcrumbs.vue';
import CardForm from './card-form.vue';
import CardInternalNotes from './card-internal-notes.vue';
import { useForm } from './form.ts';

const route = useRoute();
const form = useForm();

const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await findExampleApi(route.params.id as string);
    if (response) {
      form.data._id = response._id;
      form.data.name = response.name;
      form.data.notes = response.notes;
      form.data.is_archived = response.is_archived;
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

    form.data._id = route.params.id as string;
    form.data.name = 'Promo 1A';
    form.data.description = 'Description for Promo 1A';
  }
});

const onArchived = async () => {
  form.data.is_archived = true;
};

const onRestored = async () => {
  form.data.is_archived = false;
};

const deleteModalRef = ref();
const onDeleteModal = () => {
  deleteModalRef.value.toggleModal({
    _id: '1',
    label: 'Promo 1',
  });
};
</script>

<template>
  <delete-modal ref="deleteModalRef" />
  <app-container :is-loading="isLoading">
    <card-breadcrumbs />

    <!-- <card-actions v-model:data="form.data" @restored="onRestored" @archived="onArchived" /> -->

    <!-- <status-banner v-if="form.data.is_archived" status-type="danger" message="This data has been archived." /> -->

    <base-card class="py-3! gap-0!">
    <div class="flex gap-2 overflow-auto scrollbar-hidden">
      <router-link :to="`/admin/promos/create`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:file-plus" /> CREATE
        </base-button>
      </router-link>
      <router-link :to="`/admin/promos/${route.params.id}/edit`">
        <base-button variant="filled" color="primary" size="sm" class="font-bold">
          <base-icon icon="i-fa7-solid:file-pen" /> EDIT
        </base-button>
      </router-link>
      <base-button variant="filled" color="primary" size="sm" class="font-bold" @click="onDeleteModal">
        <base-icon icon="i-fa7-solid:trash-xmark" /> DELETE
      </base-button>
    </div>
  </base-card>

    <base-card v-if="!form.data._id">
      Data Not Found
    </base-card>
    <template v-else>
      <card-form v-model:data="form.data" />
      <card-internal-notes v-model:data="form.data" />
    </template>
  </app-container>
</template>
