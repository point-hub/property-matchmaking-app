<script setup lang="ts">
</script>

<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-12">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>100% Complete</span>
        <span>5 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-5/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-10">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Informasi Kontak Anda
      </h1>

      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-500">
        Beritahu kami info kontak anda untuk kami kirimkan rekomendasi terbaik.
      </p>
    </div>

    <!-- Form Card -->
    <div class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">

      <div class="flex flex-col gap-4">
        <!-- Nama -->
        <div>
          <label class="mb-3 block text-lg font-semibold text-slate-900">
            Nama
          </label>

          <div class="flex items-center rounded-xl border border-slate-300 px-4">
            <input class="w-full bg-transparent px-3 py-3 outline-none">
          </div>
        </div>

        <hr class="my-2 border-slate-200">
      
        <!-- WA -->
        <div>
          <label class="mb-3 block text-lg font-semibold text-slate-900">
            Nomer WhatsApp
          </label>

          <div class="flex items-center rounded-xl border border-slate-300 px-4">
            <input class="w-full bg-transparent px-3 py-3 outline-none">
          </div>

          <p class="mt-2 text-sm text-slate-500">
            Kami akan mengirimkan rekomendasi melalui WhatsApp dan menghubungi Anda saat menemukan properti yang sesuai.
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-12 flex items-center justify-between">
      <router-link
        to="/customer-preferences/promotion-needs"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <a
        href="https://wa.me/6281234567890?text=Halo Kahu, saya Sarah tolong diinfokan rekomendasi rumah yang cocok dengan preferensi saya."
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-xl bg-orange-300 px-8 py-3 font-semibold text-white hover:bg-blue-700"
      >
        <div class="i-logos-whatsapp-icon h-5 w-5"></div>

        Dapatkan hasil rekomendasi
      </a>
    </div>
  </main>
</template>