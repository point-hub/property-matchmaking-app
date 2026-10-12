<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { createCustomerPreferenceApi } from '@/composables/api/customer-preferences/create.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';
import { toast } from '@/toast';

const router = useRouter();
const preference = useCustomerPreferenceStore();

const isSaving = ref(false);
const showErrors = ref(false);

onMounted(() => {
  if (!preference.data.locations?.length) {
    router.replace('/customer-preferences/location');
  }
});

const onSubmit = async () => {
  showErrors.value = true;

  const name = preference.data.name?.trim();
  const whatsapp = preference.data.whatsapp;

  if (!name || !whatsapp) {
    return;
  }

  if (isSaving.value) {
    return;
  }

  try {
    isSaving.value = true;

    const response = await createCustomerPreferenceApi({
      ...preference.data,
      name,
      whatsapp,
    });

    if (response?.inserted_id) {
      const message = `Halo Kahu, saya ${name} tolong diinfokan rekomendasi rumah yang cocok dengan preferensi saya.`;
      window.location.href = `https://wa.me/6281357747377?text=${encodeURIComponent(message)}`;
      preference.reset();
      showErrors.value = false;
    } else {
      toast('Gagal menyimpan data. Silakan coba lagi.', {
        color: 'danger',
      });
    }
  } catch {
    toast('Gagal menyimpan data. Silakan coba lagi.', {
      color: 'danger',
    });
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
        Beritahu kami info kontak Anda untuk kami kirimkan rekomendasi terbaik.
      </p>
    </div>

    <!-- Form Card -->
    <form
      class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-10"
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="flex flex-col gap-5 sm:gap-6">
        <!-- Name -->
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
              :aria-invalid="showErrors && !preference.data.name?.trim()"
              class="w-full min-w-0 bg-transparent px-2 py-3 text-base text-slate-900 outline-none placeholder:text-sm placeholder:text-slate-400 sm:px-3"
            >
          </div>

          <p
            v-if="showErrors && !preference.data.name?.trim()"
            class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
          >
            <base-icon icon="i-fa7-solid:warning" class="bg-red" />
            Nama wajib diisi
          </p>
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
              :aria-invalid="showErrors && !preference.data.whatsapp"
              class="w-full min-w-0 bg-transparent px-2 py-3 text-base text-slate-900 outline-none placeholder:text-sm placeholder:text-slate-400 sm:px-3"
            >
          </div>

          <p
            v-if="showErrors && !preference.data.whatsapp"
            class="mt-2 -mx-4 bg-red-100 px-4 py-2 text-xs leading-5 sm:mx-0 sm:text-sm"
          >
            <base-icon icon="i-fa7-solid:warning" class="bg-red" />
            Nomor WhatsApp wajib diisi
          </p>

          <p class="mt-3 text-sm leading-6 text-slate-500">
            Kami akan mengirimkan rekomendasi melalui WhatsApp dan menghubungi
            Anda saat menemukan properti yang sesuai.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-8"
      >
        <router-link
          to="/customer-preferences/promotion-needs"
          class="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-base font-medium transition hover:bg-slate-100 sm:w-auto"
        >
          Back
        </router-link>

        <button
          type="submit"
          :disabled="isSaving"
          class="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-orange-400 px-5 py-3 text-center text-sm font-semibold leading-5 text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto sm:px-8 sm:text-base"
        >
          <span class="i-logos-whatsapp-icon h-5 w-5 shrink-0"></span>

          <span>
            {{ isSaving ? 'Memproses...' : 'Dapatkan hasil rekomendasi' }}
          </span>
        </button>
      </div>
    </form>
  </main>
</template>