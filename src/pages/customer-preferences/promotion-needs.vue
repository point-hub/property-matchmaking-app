<script setup lang="ts">
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-12">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>80% Complete</span>
        <span>4 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-4/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-10">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Kebutuhan Promo
      </h1>

      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Pilih promo yang sesuai dengan kebutuhan Anda agar kami dapat memberikan rekomendasi terbaik.
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
            <div class="text-xl font-semibold">
              DP dicicil
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
              Sewa dulu, beli kemudian
            </div>

            <p class="mt-2 text-slate-500">
              Nikmati fleksibilitas untuk menyewa terlebih dahulu sebelum memutuskan membeli rumah.
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
              Cicilan in-house
            </div>

            <p class="mt-2 text-slate-500">
              Cicilan in-house dengan suku bunga rendah.
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
              Bonus Furniture
            </div>

            <p class="mt-2 text-slate-500">
              Dapatkan furnitur gratis saat membeli properti.
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
        to="/customer-preferences/buying-problem"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <router-link
        to="/customer-preferences/user-info"
        class="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>