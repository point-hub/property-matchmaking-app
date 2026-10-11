<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <!-- LEFT -->
      <div class="min-w-0">
        <span
          class="inline-block rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 sm:px-4 sm:text-sm"
        >
          Trusted Home Buying Consultant
        </span>

        <h1
          class="mt-6 text-4xl font-bold leading-tight tracking-tight sm:mt-8 sm:text-5xl lg:text-6xl"
        >
          Membeli Rumah Impian Anda
          <span class="text-blue-600">
            Tidak Harus Rumit.
          </span>
        </h1>

        <p
          class="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9"
        >
          Dari memilih rumah, mengurus cicilan, legalitas, hingga serah
          terima, kami siap mendampingi Anda di setiap langkah.
        </p>

        <div class="mt-7 sm:mt-10">
          <router-link
            to="/customer-preferences/location"
            class="flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-blue-700 sm:inline-flex sm:w-auto sm:px-8 sm:text-lg"
          >
            Mulai Konsultasi Gratis
          </router-link>
        </div>

        <!-- Statistics -->
        <div
          class="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-8 sm:mt-12 sm:gap-6 sm:pt-10"
        >
          <div class="min-w-0">
            <div class="text-2xl font-bold sm:text-3xl lg:text-4xl">
              2,500+
            </div>
            <div class="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              Keluarga Terbantu
            </div>
          </div>

          <div class="min-w-0">
            <div class="text-2xl font-bold sm:text-3xl lg:text-4xl">
              96%
            </div>
            <div class="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              Tingkat Kepuasan
            </div>
          </div>

          <div class="min-w-0">
            <div class="text-2xl font-bold sm:text-3xl lg:text-4xl">
              12+
            </div>
            <div class="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
              Tahun Pengalaman
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="min-w-0">
        <div
          class="rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-xl sm:rounded-[32px] sm:p-6 lg:p-8"
        >
          <div class="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <h3 class="text-lg font-bold sm:text-xl">
              Rencana Pembelian Rumah Anda
            </h3>

            <div class="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
              <div
                class="flex items-center gap-3 rounded-xl bg-green-50 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-green-500"></div>
                <span class="text-sm sm:text-base">
                  Konsultasi Gratis
                </span>
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-blue-50 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-blue-500"></div>
                <span class="text-sm sm:text-base">
                  Dapatkan Rekomendasi Rumah
                </span>
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-slate-100 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-slate-400"></div>
                <span class="text-sm sm:text-base">
                  Survei Rumah
                </span>
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-slate-100 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-slate-400"></div>
                <span class="text-sm sm:text-base">
                  Pembiayaan &amp; Negosiasi
                </span>
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-slate-100 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-slate-400"></div>
                <span class="text-sm sm:text-base">
                  Dokumen Legal
                </span>
              </div>

              <div
                class="flex items-center gap-3 rounded-xl bg-slate-100 p-3 sm:gap-4 sm:p-4"
              >
                <div class="h-3 w-3 shrink-0 rounded-full bg-slate-400"></div>
                <span class="text-sm sm:text-base">
                  Serah Terima Rumah
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>