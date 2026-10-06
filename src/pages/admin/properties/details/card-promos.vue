<script setup lang="ts">
import { type IForm } from './form';

const data = defineModel<Partial<IForm>>('data', {
  default: () => ({
    promos: [],
  }),
});
</script>

<template>
  <base-card title="Promos">
    <div class="flex flex-col gap-4 my-5">
      <div class="flex flex-wrap gap-4">
        <table class="w-full border-separate border-spacing-y-3"">
          <template v-for="promo in data.promos" >
            <tr>
              <td class="w-1 align-top pt-1"><base-checkbox v-model="data.promos" :true-value="promo" disabled /></td>
              <td>
                <b>{{ promo.name }}</b>
                <br>
                {{ promo.description }}
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
