<script setup lang="ts">
import { type IForm, type IFormError } from './form';

const data = defineModel<IForm>('data', {
  default: () => ({
    code: undefined,
    name: undefined,
    address: undefined,
    composite_unique_1: undefined,
    composite_unique_2: undefined,
    age: undefined,
    gender: undefined,
    optional_unique: undefined,
  }),
});
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    code: [],
    name: [],
    address: [],
    composite_unique_1: [],
    composite_unique_2: [],
    age: [],
    gender: [],
    optional_unique: [],
  }),
});
const isSaving = defineModel('is-saving', { default: false });
</script>

<template>
  <base-card title="Property Info">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Code" required v-model="data.code" :errors="['The code field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="data.name" :errors="['The name field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="Address" required v-model="data.address" :errors="['The address field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="Subdistrict" required v-model="data.subdistrict" :errors="['The subdistrict field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="District" required v-model="data.district" :errors="['The district field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="City" required v-model="data.city" :errors="['The city field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="Google Map Link" v-model="data.google_map" :errors="[]" :disabled="isSaving" />  
      <base-input layout="horizontal" label="Instagram" v-model="data.instagram" :errors="[]" :disabled="isSaving" />  
    </div>
  </base-card>
  <base-card title="Pricelist">
    <div class="flex flex-col gap-4 my-5">
      <base-table>
        <thead>
          <tr>
            <th>Land Area</th>
            <th>Building Area</th>
            <th>Type</th>
            <th class="text-right">Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>32 m2</td>
            <td>64 m2</td>
            <td>64/32</td>
            <td class="text-right">200.000</td>
            <td>x</td>
          </tr> -->
        </tbody>
      </base-table>

      <base-input layout="horizontal" label="Land Area" required v-model="data.land_area" :errors="['The land area field is required.']" :disabled="isSaving" />  
      <base-input layout="horizontal" label="Building Area" required v-model="data.building_area" :errors="['The building area field is required.']" :disabled="isSaving" />  
      <base-input layout="horizontal" label="Price" required v-model="data.price" :errors="['The price field is required.']" :disabled="isSaving" />  
      <base-form label=" ">
        <base-button color="primary">Add</base-button>
      </base-form>
    </div>
  </base-card>
  <base-card title="Land Titles">
    <div class="flex flex-col gap-4 my-5">
      <base-form label=" ">
        <div class="flex gap-4">
          <base-checkbox text="Land Title 1" />
          <base-checkbox text="Certiticate 2" />
          <base-checkbox text="Land Title 3" />
        </div>
      </base-form>
      <base-input layout="horizontal" label="Others" v-model="data.composite_unique_1" :errors="errors.composite_unique_1" :disabled="isSaving" />  
    </div>
  </base-card>
  <base-card title="Facilities">
    <div class="flex flex-col gap-4 my-5">
      <base-form label=" ">
        <div class="flex gap-4">
          <base-checkbox text="Facilities 1" />
          <base-checkbox text="Facilities 2" />
          <base-checkbox text="Facilities 3" />
          <base-checkbox text="Facilities 4" />
        </div>
      </base-form>
      
      <base-input layout="horizontal" label="Others" v-model="data.composite_unique_1" :errors="errors.composite_unique_1" :disabled="isSaving" />  
    </div>
  </base-card>
  <base-card title="Promos">
    <div class="flex flex-col gap-4 my-5">
      <base-form label=" ">
        <div class="flex gap-4">
          <base-checkbox text="Promo 1" />
          <base-checkbox text="Promo 2" />
          <base-checkbox text="Promo 3" />
          <base-checkbox text="Promo 4" />
        </div>
      </base-form>

      <base-input layout="horizontal" label="Others" v-model="data.composite_unique_1" :errors="errors.composite_unique_1" :disabled="isSaving" />  
    </div>
  </base-card>
  <base-card title="Info Developer">
    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Developer Name" required v-model="data.developer_name" :errors="['The developer name field is required.']" :disabled="isSaving" />
      <base-input layout="horizontal" label="WhatsApp" required v-model="data.whatsapp" :errors="['The whatsapp field is required.']" :disabled="isSaving" />
      <base-file-upload layout="horizontal" label="MOU" v-model="data.mou" :errors="[]" :disabled="isSaving" />
    </div>
  </base-card>
  <base-card title="Photos - Property Gate">
    <div class="flex flex-col gap-4 my-5">
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-8">

        <!-- Images -->
        <div
          v-for="i in 0"
          :key="i"
          class="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          <img
            src="https://placehold.co/700x700"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          >

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
          />

          <!-- Cover Badge -->
          <div
            v-if="i === 1"
            class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow"
          >
            ★ Cover
          </div>

          <!-- Remove -->
          <button
            class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100"
          >
            ✕
          </button>

          <!-- Bottom Actions -->
          <div
            class="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0"
          >
            <button class="rounded-xl bg-slate-100 px-3 py-2 text-xs hover:bg-slate-200">
              Make Cover
            </button>
          </div>
        </div>

        <!-- Upload Slot -->
        <label
          class="flex aspect-square cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400 hover:bg-blue-50"
        >
          <input
            class="hidden"
            type="file"
            multiple
          >

          <div class="text-center">

            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow"
            >
              <span class="text-4xl font-light">
                +
              </span>
            </div>

            <div class="font-medium">
              Add Photo
            </div>

          </div>
        </label>

      </div>
    </div>
  </base-card>
  
  <base-card title="Photos - Building">
    <div class="flex flex-col gap-4 my-5">
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-8">

        <!-- Images -->
        <div
          v-for="i in 0"
          :key="i"
          class="group relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          <img
            src="https://placehold.co/700x700"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          >

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"
          />

          <!-- Cover Badge -->
          <div
            v-if="i === 1"
            class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow"
          >
            ★ Cover
          </div>

          <!-- Remove -->
          <button
            class="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100"
          >
            ✕
          </button>

          <!-- Bottom Actions -->
          <div
            class="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition duration-300 group-hover:translate-y-0"
          >
            <button class="rounded-xl bg-slate-100 px-3 py-2 text-xs hover:bg-slate-200">
              Make Cover
            </button>
          </div>
        </div>
        
        <!-- Upload Slot -->
        <label
          class="flex aspect-square cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-400 hover:bg-blue-50"
        >
          <input
            class="hidden"
            type="file"
            multiple
          >

          <div class="text-center">

            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow"
            >
              <span class="text-4xl font-light">
                +
              </span>
            </div>

            <div class="font-medium">
              Add Photo
            </div>

          </div>
        </label>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
