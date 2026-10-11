<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { createCustomerPreferenceApi } from '@/composables/api/customer-preferences/create.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';
import { toast } from '@/toast';

const router = useRouter();

const preference = useCustomerPreferenceStore();

const isSaving = ref(false);

if (preference.data.locations?.length === 0) {
  router.replace('/customer-preferences/location');
}

const onSubmit = async () => {

  if (!preference.data.name || !preference.data.whatsapp) {
    toast('Please fill all required fields', {
      color: 'danger',
    });
  }

  try {
    isSaving.value = true;
    const response = await createCustomerPreferenceApi(preference.data);
    if (response?.inserted_id) {
      const name = preference.data.name;
      preference.reset();
      window.location.href = `https://wa.me/${6281357747377}?text=Halo Kahu, saya ${name} tolong diinfokan rekomendasi rumah yang cocok dengan preferensi saya.`;
    }
  } finally {
    isSaving.value = false;
  }
};
</script>

<template>
  <main
    class="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
  >
    <!-- Progress -->
    <div class="mb-8 sm:mb-12">
      <div
        class="mb-3 flex items-center justify-between text-xs text-slate-500 sm:text-sm"
      >
        <span>100% Complete</span>
        <span>5 / 5</span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full w-full rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-7 sm:mb-10">
      <h1
        class="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:mt-3 sm:text-4xl lg:text-5xl"
      >
        Informasi Kontak Anda
      </h1>

      <p
        class="mt-3 text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8"
      >
        Beritahu kami info kontak anda untuk kami kirimkan rekomendasi terbaik.
      </p>
    </div>

    <!-- Form Card -->
    <div
      class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-10"
    >
      <div class="flex flex-col gap-5 sm:gap-6">
        <!-- Nama -->
        <div>
          <label
            for="customer-name"
            class="mb-2 block text-base font-semibold text-slate-900 sm:mb-3 sm:text-lg"
          >
            Nama <span class="text-red-500">*</span>
          </label>

          <div
            class="flex min-h-12 items-center rounded-xl border border-slate-300 px-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4"
          >
            <input
              id="customer-name"
              v-model="preference.data.name"
              type="text"
              autocomplete="name"
              placeholder="Masukkan nama lengkap Anda"
              class="w-full min-w-0 bg-transparent px-2 py-3 text-base text-slate-900 outline-none placeholder:text-sm placeholder:text-slate-400 sm:px-3"
            >
          </div>
        </div>

        <hr class="border-slate-200">

        <!-- WhatsApp -->
        <div>
          <label
            for="customer-whatsapp"
            class="mb-2 block text-base font-semibold text-slate-900 sm:mb-3 sm:text-lg"
          >
            Nomor WhatsApp <span class="text-red-500">*</span>
          </label>

          <div
            class="flex min-h-12 items-center rounded-xl border border-slate-300 px-3 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 sm:px-4"
          >
            <input
              id="customer-whatsapp"
              v-model="preference.data.whatsapp"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              placeholder="Contoh: 081234567890"
              class="w-full min-w-0 bg-transparent px-2 py-3 text-base text-slate-900 outline-none placeholder:text-sm placeholder:text-slate-400 sm:px-3"
            >
          </div>

          <p class="mt-3 text-sm leading-6 text-slate-500">
            Kami akan mengirimkan rekomendasi melalui WhatsApp dan menghubungi
            Anda saat menemukan properti yang sesuai.
          </p>
        </div>

        <p class="text-sm text-slate-500">
          <span class="text-red-500">*</span>
          Wajib diisi
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="mt-8 flex flex-col-reverse gap-3 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      <router-link
        to="/customer-preferences/promotion-needs"
        class="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-base font-medium transition hover:bg-slate-100 sm:w-auto"
      >
        Back
      </router-link>

      <button
        @click="onSubmit"
        :disabled="isSaving"
        class="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-orange-400 px-5 py-3 text-center text-sm font-semibold leading-5 text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:px-8 sm:text-base"
      >
        <div class="i-logos-whatsapp-icon h-5 w-5 shrink-0"></div>

        <span>
          {{ isSaving ? 'Memproses...' : 'Dapatkan hasil rekomendasi' }}
        </span>
      </button>
    </div>
  </main>
</template>