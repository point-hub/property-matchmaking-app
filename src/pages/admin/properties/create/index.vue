<script setup lang="ts">
import { ref } from 'vue';

import { createPropertyApi } from '@/composables/api/properties/create.api';
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

const isSaving = ref(false);

const save = async () => {
  try {
    isSaving.value = true;
    const response = await createPropertyApi(form.data);
    if (response?.inserted_id) {
      toast('Create success', { color: 'success' });
      await router.push('/admin/properties');
    }
  } catch (error) {
    const errorResponse = handleError(error);
    if (errorResponse.errors) {
      form.errors.code = errorResponse.errors.code || [];
      form.errors.name = errorResponse.errors.name || [];
      form.errors.address = errorResponse.errors.address || [];
      form.errors.subdistrict = errorResponse.errors.subdistrict || [];
      form.errors.district = errorResponse.errors.district || [];
      form.errors.city = errorResponse.errors.city || [];
      form.errors.notes = errorResponse.errors.notes || [];
      form.errors.pricelists = errorResponse.errors.pricelists || [];
      form.errors.land_titles = errorResponse.errors.land_titles || [];
      form.errors.facilities = errorResponse.errors.facilities || [];
      form.errors.promos = errorResponse.errors.promos || [];
      form.errors.developer_name = errorResponse.errors.developer_name || [];
      form.errors.whatsapp = errorResponse.errors.whatsapp || [];
      form.errors.mou = errorResponse.errors.mou || [];
      form.errors.photos_gate = errorResponse.errors.photos_gate || [];
      form.errors.photos_building = errorResponse.errors.photos_building || [];
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
  <div class="content-container">
    <card-breadcrumbs />
    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-pricelists v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-land-titles v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-facilities v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-promos v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-info-developer v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-photos-gate v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-photos-building v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-internal-notes v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button class="flex-1" :is-loading="isSaving" color="primary" @click="save">Save</base-button>
    </div>
  </div>
</template>
