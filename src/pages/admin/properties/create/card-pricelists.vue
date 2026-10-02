<script setup lang="ts">
import { ref } from 'vue';

import { formatNumber } from '@/utils/number';

import { type IForm, type IFormError } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    pricelists: [],
  }),
});

const errors = defineModel<Partial<IFormError>>('errors', {
  default: () => ({
    pricelists: [],
  }),
});

const isSaving = defineModel('is-saving', {
  default: false,
});

const landArea = ref(0);
const buildingArea = ref(0);
const price = ref(0);

const errorLandArea = ref<string[]>([]);
const errorBuildingArea = ref<string[]>([]);
const errorPrice = ref<string[]>([]);

const onSubmitPricelist = (): void => {
  errorLandArea.value = [];
  errorBuildingArea.value = [];
  errorPrice.value = [];

  if (landArea.value <= 0) {
    errorLandArea.value = [
      'The land area field is required.',
    ];
  }

  if (buildingArea.value <= 0) {
    errorBuildingArea.value = [
      'The building area field is required.',
    ];
  }

  if (price.value <= 0) {
    errorPrice.value = [
      'The price field is required.',
    ];
  }

  if (
    errorLandArea.value.length > 0 ||
    errorBuildingArea.value.length > 0 ||
    errorPrice.value.length > 0
  ) {
    return;
  }

  if (!data.value.pricelists) {
    data.value.pricelists = [];
  }

  const isDuplicate = data.value.pricelists.some(
    (pricelist) =>
      pricelist.land_area === landArea.value &&
      pricelist.building_area === buildingArea.value,
  );

  if (isDuplicate) {
    errorLandArea.value = [
      'The combination of land area and building area already exists.',
    ];
    errorBuildingArea.value = [
      'The combination of land area and building area already exists.',
    ];
    return;
  }

  data.value.pricelists.push({
    land_area: landArea.value,
    building_area: buildingArea.value,
    price: price.value,
  });

  landArea.value = 0;
  buildingArea.value = 0;
  price.value = 0;
};

const onDeletePricelist = (index: number): void => {
  data.value.pricelists?.splice(index, 1);
};
</script>

<template>
  <base-card title="Pricelists">
    <div class="my-5 flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th>Land Area</th>
            <th>Building Area</th>
            <th>Type</th>
            <th class="text-right">Price</th>
            <th class="w-1"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="data.pricelists?.length === 0">
            <td colspan="5">
              Add a pricelist below to get started
            </td>
          </tr>

          <tr
            v-for="(pricelist, index) in data.pricelists"
            :key="index"
          >
            <td>
              {{ pricelist.land_area }} m²
            </td>

            <td>
              {{ pricelist.building_area }} m²
            </td>

            <td>
              {{ pricelist.building_area }} /
              {{ pricelist.land_area }}
            </td>

            <td class="text-right">
              {{ formatNumber(pricelist.price) }}
            </td>

            <td>
              <base-button
                :disabled="isSaving"
                @click="onDeletePricelist(index)"
              >
                <base-icon icon="i-fa7-solid:xmark" />
              </base-button>
            </td>
          </tr>
        </tbody>
      </base-table>

      <div class="mt-10">
        <b class="uppercase">Add pricelist</b>
        <base-divider orientation="vertical" />
      </div>

      <base-input-number
        v-model="landArea"
        :errors="errorLandArea"
        align="left"
        layout="horizontal"
        label="Land Area"
        required
        :disabled="isSaving"
      />

      <base-input-number
        v-model="buildingArea"
        :errors="errorBuildingArea"
        align="left"
        layout="horizontal"
        label="Building Area"
        required
        :disabled="isSaving"
      />

      <base-input-number
        v-model="price"
        :errors="errorPrice"
        align="left"
        layout="horizontal"
        label="Price"
        required
        :disabled="isSaving"
      />

      <base-form
        layout="horizontal"
        label="&nbsp;"
      >
        <base-button
          variant="filled"
          color="info"
          :disabled="isSaving"
          @click="onSubmitPricelist"
        >
          ADD
        </base-button>
      </base-form>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>