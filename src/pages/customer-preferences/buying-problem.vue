<script setup lang="ts">
import { ref } from 'vue'

const cashPurchase = ref(false)
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-12">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>60% Complete</span>
        <span>3 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-3/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-10">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Kendala anda saat ini
      </h1>

      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Kendala terbesar untuk membeli rumah yang saat ini Anda rasakan?
      </p>
    </div>

    <!-- Form Card -->
    <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      <div class="flex flex-col gap-4">
        <label class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md">

          <input
            type="checkbox"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          >

          <div>
            <div class="text-xl font-semibold text-slate-900">
              Penghasilan terbatas
            </div>

            <p class="mt-2 text-slate-500">
              Cari rumah dengan cicilan lebih terjangkau.
            </p>
          </div>
        </label>

        <label class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md">

          <input
            type="checkbox"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          >

          <div>
            <div class="text-xl font-semibold">
              Tabungan uang muka terbatas
            </div>

            <p class="mt-2 text-slate-500">
              Tampilkan promo atau DP ringan.
            </p>
          </div>
        </label>

        <label class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md">
          <input
            type="checkbox"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          >
          <div>
            <div class="text-xl font-semibold">
              Riwayat kredit kurang baik
            </div>

            <p class="mt-2 text-slate-500">
              Cari opsi pembiayaan yang tersedia.
            </p>
          </div>
        </label>

        <label class="flex cursor-pointer items-start gap-4 rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-500 hover:shadow-md">
          <input
            type="checkbox"
            class="mt-1 h-5 w-5 rounded border-slate-300"
          >

          <div class="w-full">

            <div class="text-xl font-semibold">
              Lainnya
            </div>

            <textarea
              rows="4"
              placeholder="Beritahu kami kendala atau kebutuhan Anda"
              class="mt-4 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>
        </label>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-12 flex items-center justify-between">
      <router-link
        to="/customer-preferences/budget"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <router-link
        to="/customer-preferences/promotion-needs"
        class="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>