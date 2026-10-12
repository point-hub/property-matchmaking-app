<script setup lang="ts">
import { ref } from 'vue';

import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';

const preference = useCustomerPreferenceStore();
const showErrors = ref<boolean>(false);

const chooseMaritalStatus = (status: string) => {
  preference.data.marital_status = status;
};

const isCompleted = () => {
  const data = preference.data;

  if (
    data.budget_min == null
    || data.budget_min <= 0
    || data.budget_max == null
    || data.budget_max <= 0
    || data.budget_min > data.budget_max
  ) {
    return false;
  }

  if (data.is_cash) {
    return true;
  }

  return !(
    data.down_payment_min == null
    || data.down_payment_min <= 0
    || data.down_payment_max == null
    || data.down_payment_max <= 0
    || data.down_payment_min > data.down_payment_max
    || data.monthly_payment_min == null
    || data.monthly_payment_min <= 0
    || data.monthly_payment_max == null
    || data.monthly_payment_max <= 0
    || data.monthly_payment_min > data.monthly_payment_max
    || data.age == null
    || data.age <= 0
    || !data.marital_status
    || data.dependents == null
    || data.dependents < 0
  );
};

const continueWithValidation = () => {
  showErrors.value = true;
};
</script>

<template>
  <main
    class="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
  >
    <!-- Progress -->
    <div class="mb-8 sm:mb-12">
      <div class="mb-3 flex justify-between text-xs text-slate-500 sm:text-sm">
        <span>40% Complete</span>
        <span>2 / 5</span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full w-2/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-8 sm:mb-10">
      <h1
        class="text-3xl font-bold tracking-tight text-slate-900 sm:mt-3 sm:text-4xl lg:text-5xl"
      >
        Informasi Budget
      </h1>

      <p class="mt-4 text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8">
        Informasi ini membantu kami merekomendasikan properti dan pilihan
        pembiayaan yang sesuai dengan anggaran Anda.
      </p>
    </div>

    <!-- Form Card -->
    <div class="-mx-4 border border-slate-200 bg-white p-4 shadow-sm sm:mx-0 sm:rounded-3xl sm:p-6 lg:p-10">
      <!-- Home Budget -->
      <section>
        <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">
          Anggaran Rumah
        </h2>

        <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Tentukan kisaran harga rumah yang sesuai dengan kemampuan Anda.
        </p>

        <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6">
          <!-- Minimum Budget -->
          <div class="min-w-0">
            <label class="mb-2 block text-sm font-medium text-slate-700">
              Anggaran Minimum <span class="text-red-500">*</span>
            </label>

            <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
              <span class="shrink-0 text-sm text-slate-500">Rp</span>
              <div class="min-w-0 flex-1 py-1">
                <base-input-number
                  v-model="preference.data.budget_min"
                  border="none"
                  align="left"
                />
              </div>
            </div>

            <p
              v-if="showErrors && (preference.data.budget_min == null || preference.data.budget_min <= 0)"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Anggaran minimum harus lebih dari Rp0
            </p>
          </div>

          <!-- Maximum Budget -->
          <div class="min-w-0">
            <label class="mb-2 block text-sm font-medium text-slate-700">
              Anggaran Maksimum <span class="text-red-500">*</span>
            </label>

            <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
              <span class="shrink-0 text-sm text-slate-500">Rp</span>
              <div class="min-w-0 flex-1 py-1">
                <base-input-number
                  v-model="preference.data.budget_max"
                  border="none"
                  align="left"
                />
              </div>
            </div>

            <p
              v-if="showErrors && (preference.data.budget_max == null || preference.data.budget_max <= 0)"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Anggaran maksimum harus lebih dari Rp0
            </p>

            <p
              v-else-if="showErrors && preference.data.budget_min != null && preference.data.budget_max != null && preference.data.budget_min > preference.data.budget_max"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Anggaran maksimum harus sama dengan atau lebih besar dari anggaran minimum
            </p>
          </div>
        </div>

        <!-- Cash Purchase -->
        <label for="cashPurchase" class="mt-5 flex cursor-pointer items-start gap-3 sm:justify-end">
          <input
            id="cashPurchase"
            v-model="preference.data.is_cash"
            type="checkbox"
            name="cashPurchase"
            class="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          >
          <span class="text-sm leading-6 text-slate-600">
            Saya ingin membeli rumah secara tunai.
          </span>
        </label>
      </section>

      <!-- Financing Sections -->
      <template v-if="!preference.data.is_cash">
        <hr class="my-8 border-slate-200 sm:my-10">

        <!-- Down Payment -->
        <section>
          <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Uang Muka (DP)
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Tentukan kisaran uang muka yang dapat Anda siapkan.
          </p>

          <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6">
            <!-- Minimum Down Payment -->
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">
                DP Minimum <span class="text-red-500">*</span>
              </label>

              <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
                <span class="shrink-0 text-sm text-slate-500">Rp</span>
                <div class="min-w-0 flex-1 py-1">
                  <base-input-number
                    v-model="preference.data.down_payment_min"
                    border="none"
                    align="left"
                  />
                </div>
              </div>

              <p
                v-if="showErrors && (preference.data.down_payment_min == null || preference.data.down_payment_min <= 0)"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Uang muka minimum harus lebih dari Rp0
              </p>
            </div>

            <!-- Maximum Down Payment -->
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">
                DP Maksimum <span class="text-red-500">*</span>
              </label>

              <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
                <span class="shrink-0 text-sm text-slate-500">Rp</span>
                <div class="min-w-0 flex-1 py-1">
                  <base-input-number
                    v-model="preference.data.down_payment_max"
                    border="none"
                    align="left"
                  />
                </div>
              </div>

              <p
                v-if="showErrors && (preference.data.down_payment_max == null || preference.data.down_payment_max <= 0)"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Uang muka maksimum harus lebih dari Rp0
              </p>

              <p
                v-else-if="showErrors && preference.data.down_payment_min != null && preference.data.down_payment_max != null && preference.data.down_payment_min > preference.data.down_payment_max"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Uang muka maksimum harus sama dengan atau lebih besar dari uang muka minimum
              </p>
            </div>
          </div>
        </section>

        <!-- Monthly Payment -->
        <section class="mt-8 sm:mt-10">
          <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Cicilan Bulanan
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Tentukan kisaran cicilan bulanan yang nyaman bagi Anda.
          </p>

          <div class="mt-5 grid grid-cols-1 gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-6">
            <!-- Minimum Monthly Payment -->
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Cicilan Minimum <span class="text-red-500">*</span>
              </label>

              <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
                <span class="shrink-0 text-sm text-slate-500">Rp</span>
                <div class="min-w-0 flex-1 py-1">
                  <base-input-number
                    v-model="preference.data.monthly_payment_min"
                    border="none"
                    align="left"
                  />
                </div>
              </div>

              <p
                v-if="showErrors && (preference.data.monthly_payment_min == null || preference.data.monthly_payment_min <= 0)"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Cicilan minimum harus lebih dari Rp0
              </p>
            </div>

            <!-- Maximum Monthly Payment -->
            <div class="min-w-0">
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Cicilan Maksimum <span class="text-red-500">*</span>
              </label>

              <div class="flex min-w-0 items-center rounded-xl border border-slate-300 px-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4">
                <span class="shrink-0 text-sm text-slate-500">Rp</span>
                <div class="min-w-0 flex-1 py-1">
                  <base-input-number
                    v-model="preference.data.monthly_payment_max"
                    border="none"
                    align="left"
                  />
                </div>
              </div>

              <p
                v-if="showErrors && (preference.data.monthly_payment_max == null || preference.data.monthly_payment_max <= 0)"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Cicilan maksimum harus lebih dari Rp0
              </p>

              <p
                v-else-if="showErrors && preference.data.monthly_payment_min != null && preference.data.monthly_payment_max != null && preference.data.monthly_payment_min > preference.data.monthly_payment_max"
                class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
              >
                <base-icon icon="i-fa7-solid:warning" class="bg-red" />
                Cicilan maksimum harus sama dengan atau lebih besar dari cicilan minimum
              </p>
            </div>
          </div>
        </section>

        <hr class="my-8 border-slate-200 sm:my-10">

        <!-- Personal Information -->
        <section>
          <h2 class="text-xl font-bold text-slate-900 sm:text-2xl">
            Tentang Anda
          </h2>

          <p class="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Informasi ini membantu kami menyesuaikan rekomendasi rumah dan
            pilihan pembiayaan dengan kondisi Anda.
          </p>
        </section>

        <div class="mt-7 space-y-7 sm:mt-8 sm:space-y-8">
          <!-- Age -->
          <div>
            <label for="age" class="mb-3 block text-base font-semibold text-slate-900 sm:text-lg">
              Berapa usia Anda? <span class="text-red-500">*</span>
            </label>

            <div class="rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                id="age"
                v-model="preference.data.age"
                type="number"
                min="1"
                inputmode="numeric"
                placeholder="Masukkan usia Anda"
                class="w-full rounded-xl bg-transparent px-4 py-3 text-base outline-none"
              >
            </div>

            <p
              v-if="showErrors && (preference.data.age == null || preference.data.age <= 0)"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Usia harus diisi dengan angka lebih dari 0
            </p>
          </div>

          <!-- Marital Status -->
          <div>
            <label class="mb-4 block text-base font-semibold text-slate-900 sm:text-lg">
              Apa status pernikahan Anda?
              <span class="text-red-500">*</span>
            </label>

            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <button
                type="button"
                class="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-left text-sm transition hover:border-blue-600 hover:bg-blue-50 sm:rounded-2xl sm:px-5 sm:text-base"
                :class="{ 'bg-blue-600! text-white! border-blue-600!': preference.data.marital_status === 'Belum Menikah' }"
                @click="chooseMaritalStatus('Belum Menikah')"
              >
                Belum Menikah
              </button>

              <button
                type="button"
                class="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-left text-sm transition hover:border-blue-600 hover:bg-blue-50 sm:rounded-2xl sm:px-5 sm:text-base"
                :class="{ 'bg-blue-600! text-white! border-blue-600!': preference.data.marital_status === 'Menikah' }"
                @click="chooseMaritalStatus('Menikah')"
              >
                Menikah
              </button>

              <button
                type="button"
                class="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-left text-sm transition hover:border-blue-600 hover:bg-blue-50 sm:rounded-2xl sm:px-5 sm:text-base"
                :class="{ 'bg-blue-600! text-white! border-blue-600!': preference.data.marital_status === 'Cerai' }"
                @click="chooseMaritalStatus('Cerai')"
              >
                Cerai
              </button>

              <button
                type="button"
                class="min-h-12 rounded-xl border border-slate-300 px-4 py-3 text-left text-sm transition hover:border-blue-600 hover:bg-blue-50 sm:rounded-2xl sm:px-5 sm:text-base"
                :class="{ 'bg-blue-600! text-white! border-blue-600!': preference.data.marital_status === 'Duda / Janda' }"
                @click="chooseMaritalStatus('Duda / Janda')"
              >
                Duda / Janda
              </button>
            </div>

            <p
              v-if="showErrors && !preference.data.marital_status"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Silakan pilih status pernikahan Anda
            </p>
          </div>

          <!-- Dependents -->
          <div>
            <label for="dependents" class="mb-3 block text-base font-semibold text-slate-900 sm:text-lg">
              Berapa jumlah tanggungan Anda?
              <span class="text-red-500">*</span>
            </label>

            <p class="mb-4 text-sm leading-6 text-slate-500">
              Termasuk anak, orang tua, atau anggota keluarga yang menjadi tanggungan Anda.
            </p>

            <div class="rounded-xl border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
              <input
                id="dependents"
                v-model="preference.data.dependents"
                type="number"
                min="0"
                inputmode="numeric"
                placeholder="Masukkan jumlah tanggungan"
                class="w-full rounded-xl bg-transparent px-4 py-3 text-base outline-none"
              >
            </div>

            <p
              v-if="showErrors && (preference.data.dependents == null || preference.data.dependents < 0)"
              class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
            >
              <base-icon icon="i-fa7-solid:warning" class="bg-red" />
              Jumlah tanggungan harus 0 atau lebih. Jika tidak ada, isi 0
            </p>
          </div>
        </div>
      </template>
    </div>

    <!-- Footer -->
    <div class="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:mt-12 sm:pt-8">
      <router-link
        to="/customer-preferences/location"
        class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-100 sm:px-6 sm:text-base"
      >
        Back
      </router-link>

      <router-link
        v-if="isCompleted()"
        to="/customer-preferences/buying-problem"
        class="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:text-base"
      >
        Continue
      </router-link>

      <button
        v-else
        type="button"
        class="inline-flex min-h-11 items-center justify-center rounded-xl bg-gray-300 px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:text-base"
        @click="continueWithValidation"
      >
        Continue
      </button>
    </div>
  </main>
</template>