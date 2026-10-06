<script setup lang="ts">
import { formatNumber } from '@/utils/number';

import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    pricelists: [],
  }),
});
</script>

<template>
  <base-card title="Pricelists">
    <div class="my-5 flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th>Land Area</th>
            <th>Building Area</th>
            <th class="text-right">Type</th>
            <th class="text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(pricelist, index) in data.pricelists"
            :key="index"
          >
            <td>{{ pricelist.land_area }} m²</td>
            <td>{{ pricelist.building_area }} m²</td>
            <td class="text-right">
              {{ pricelist.building_area }} /
              {{ pricelist.land_area }}
            </td>
            <td class="text-right">
              {{ formatNumber(pricelist.price) }}
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>