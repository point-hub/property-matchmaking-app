<script setup lang="ts">
import { ref } from 'vue';

import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';

const preference = useCustomerPreferenceStore();

const cashPurchase = ref(false);

const chooseMaritalStatus = (status: string) => {
  preference.data.marital_status = status;
};
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-12">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>40% Complete</span>
        <span>2 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-2/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-10">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Informasi Budget
      </h1>

      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Informasi ini membantu kami merekomendasikan properti dan pilihan pembiayaan yang sesuai dengan anggaran Anda.
      </p>
    </div>

    <!-- Form Card -->
    <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      <!-- Home Budget -->

      <section>
        <h2 class="text-2xl font-bold text-slate-900">
          Anggaran
        </h2>
        <p class="mt-2 text-slate-500">
          Berapa anggaran yang Anda siapkan untuk membeli rumah?
        </p>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Minimal
            </label>
            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>

              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.budget_min" border="none" align="left" />
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Maksimal
            </label>

            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>
              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.budget_max" border="none" align="left" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-3 text-xs">
          <input
            type="checkbox"
            v-model="cashPurchase"
            id="cashPurchase"
            name="cashPurchase"
            class="h-3 w-3 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <label for="cashPurchase" class="text-slate-500">
            Saya ingin membeli secara tunai
          </label>
        </div>
      </section>

      <hr v-if="!cashPurchase" class="my-10 border-slate-200">

      <!-- Down Payment -->
      <section v-if="!cashPurchase">
        <h2 class="text-2xl font-bold text-slate-900">
          Uang Muka (DP)
        </h2>
        <p class="mt-2 text-slate-500">
          Berapa uang muka yang Anda rencanakan?
        </p>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Minimal
            </label>

            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>
              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.down_payment_min" border="none" align="left" />
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Maksimal
            </label>
            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>
              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.down_payment_max" border="none" align="left" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Monthly Payment -->
      <section v-if="!cashPurchase">
        <h2 class="text-2xl font-bold text-slate-900 mt-10">
          Cicilan Bulanan
        </h2>
        <p class="mt-2 text-slate-500">
          Berapa cicilan bulanan yang nyaman bagi Anda?
        </p>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Minimal
            </label>
            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>
              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.monthly_payment_min" border="none" align="left" />
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-slate-500">
              Maksimal
            </label>
            <div class="flex items-center rounded-xl border border-slate-300 px-4">
              <span class="text-slate-500">Rp</span>
              <div class="w-full bg-transparent py-1 outline-none">
                <base-input-number v-model="preference.data.monthly_payment_max" border="none" align="left" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr v-if="!cashPurchase" class="my-10 border-slate-200">

      <!-- Informasi Pribadi -->
      <div v-if="!cashPurchase">

        <h2 class="text-2xl font-bold text-slate-900">
          Tentang Anda
        </h2>

        <p class="mt-2 text-slate-500">
          Informasi ini membantu kami memberikan rekomendasi rumah dan pilihan pembiayaan yang sesuai dengan kondisi Anda saat ini.
        </p>

      </div>

      <div class="mt-8 grid gap-8" v-if="!cashPurchase">

        <!-- Usia -->
        <div>
          <label class="mb-3 block text-lg font-semibold text-slate-900">
            Berapa usia Anda?
          </label>

          <div class="flex items-center rounded-xl border border-slate-300 px-4">
            <input
              type="number"
              v-model="preference.data.age"
              class="w-full bg-transparent px-3 py-3 outline-none"
            >
          </div>

          <p class="mt-2 text-sm text-slate-500">
            Usia digunakan untuk membantu memperkirakan pilihan pembiayaan yang sesuai.
          </p>

        </div>

        <!-- Status Pernikahan -->

        <div>

          <label class="mb-4 block text-lg font-semibold text-slate-900">
            Apa status pernikahan Anda?
          </label>

          <div class="grid gap-4 md:grid-cols-2">

            <button
              @click="chooseMaritalStatus('Belum Menikah')"
              class="rounded-2xl border border-slate-300 px-5 py-4 text-left transition hover:border-blue-600 hover:bg-blue-50"
              :class="{'bg-blue-400! text-white!': preference.data.marital_status === 'Belum Menikah'}"
            >
              Belum Menikah
            </button>

            <button
              @click="chooseMaritalStatus('Menikah')"
              class="rounded-2xl border border-slate-300 px-5 py-4 text-left transition hover:border-blue-600 hover:bg-blue-50"
              :class="{'bg-blue-400! text-white!': preference.data.marital_status === 'Menikah'}"
            >
              Menikah
            </button>

            <button
              @click="chooseMaritalStatus('Cerai')"
              class="rounded-2xl border border-slate-300 px-5 py-4 text-left transition hover:border-blue-600 hover:bg-blue-50"
              :class="{'bg-blue-400! text-white!': preference.data.marital_status === 'Cerai'}"
            >
              Cerai
            </button>

            <button
              @click="chooseMaritalStatus('Duda / Janda')"
              class="rounded-2xl border border-slate-300 px-5 py-4 text-left transition hover:border-blue-600 hover:bg-blue-50"
              :class="{'bg-blue-400! text-white!': preference.data.marital_status === 'Duda / Janda'}"
            >
              Duda / Janda
            </button>
          </div>
        </div>

        <!-- Jumlah Tanggungan -->

        <div>

          <label class="mb-3 block text-lg font-semibold text-slate-900">
            Berapa jumlah tanggungan Anda?
          </label>

          <p class="mb-5 text-sm text-slate-500">
            Termasuk anak, orang tua, atau anggota keluarga yang menjadi tanggungan Anda.
          </p>

          <div class="flex items-center rounded-xl border border-slate-300 px-4">
            <input
              type="number"
              v-model="preference.data.dependents"
              class="w-full bg-transparent px-3 py-3 outline-none"
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-12 flex items-center justify-between">
      <router-link
        to="/customer-preferences/location"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <router-link
        to="/customer-preferences/buying-problem"
        class="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>