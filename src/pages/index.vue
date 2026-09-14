<template>
  <main class="mx-auto max-w-7xl px-8 py-12">
    <div class="grid items-center gap-16 lg:grid-cols-2">
      <!-- LEFT -->
      <div>
        <span class="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Trusted Home Buying Consultant
        </span>
        <h1 class="mt-8 text-6xl font-bold leading-tight tracking-tight">
          Membeli Rumah Impian Anda
          <span class="text-blue-600">
            Tidak Harus Rumit.
          </span>
        </h1>
        <p class="mt-8 max-w-xl text-xl leading-9 text-slate-600">
          Dari memilih rumah, mengurus cicilan, legalitas, hingga serah terima, kami siap mendampingi Anda di setiap langkah.
        </p>

        <div class="mt-10 flex gap-4">
          <router-link 
            to="/customer-preferences/location"
            class="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white hover:bg-blue-700"
          >
            Mulai Konsultasi Gratis
          </router-link>
        </div>

        <div class="mt-12 flex flex-wrap gap-10">
          <div>
            <div class="text-4xl font-bold">
              2,500+
            </div>
            <div class="mt-1 text-slate-500">
              Keluarga Terbantu
            </div>
          </div>

          <div>
            <div class="text-4xl font-bold">
              96%
            </div>
            <div class="mt-1 text-slate-500">
              Tingkat Kepuasan
            </div>
          </div>

          <div>
            <div class="text-4xl font-bold">
              12+
            </div>
            <div class="mt-1 text-slate-500">
              Tahun Pengalaman
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div>
        <div class="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-xl">
          <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h3 class="text-xl font-bold">
              Rencana Pembelian Rumah Anda
            </h3>

            <div class="mt-6 space-y-4">

              <div class="flex items-center gap-4 rounded-xl bg-green-50 p-4">
                <div class="h-3 w-3 rounded-full bg-green-500"></div>
                Konsultasi Gratis
              </div>

              <div class="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
                <div class="h-3 w-3 rounded-full bg-blue-500"></div>
                Dapatkan Rekomendasi Rumah
              </div>

              <div class="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                <div class="h-3 w-3 rounded-full bg-slate-400"></div>
                Survei Rumah
              </div>

              <div class="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                <div class="h-3 w-3 rounded-full bg-slate-400"></div>
                Pembiayaan & Negosiasi
              </div>

              <div class="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                <div class="h-3 w-3 rounded-full bg-slate-400"></div>
                Dokumen Legal
              </div>

              <div class="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                <div class="h-3 w-3 rounded-full bg-slate-400"></div>
                Serah Terima Rumah
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>