<template>
  <main class="mx-auto max-w-3xl px-8 py-12">
    <!-- Progress -->
    <div class="mb-16">
      <div class="mb-3 flex justify-between text-sm text-slate-500">
        <span>20% Complete</span>
        <span>1 / 5</span>
      </div>

      <div class="h-2 rounded-full bg-slate-200">
        <div class="h-full w-1/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Title -->
    <div class="mb-12">
      <h1 class="mt-3 text-5xl font-bold tracking-tight text-slate-900">
        Pilih Lokasi
      </h1>

      <p class="mt-5 text-lg leading-8 text-slate-500">
        Pilih lokasi yang Anda inginkan, dan kami akan membantu menemukan properti yang tepat.
      </p>
    </div>

    <!-- Search -->
    <div class="mb-10">
      <div class="relative">
        <svg
          class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0a7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Cari kota, keluarahan, atau kecamatan..."
          class="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-14 pr-5 text-lg outline-none transition focus:border-blue-600"
        />
      </div>
      <div class="mt-5">
        <!-- Selected Locations -->
        <!-- <div class="mb-6 flex flex-wrap gap-3">
          <div
            class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            Surabaya Timur

            <base-button class="bg-red-100 rounded-full">
              <span class="h-2 w-2 i-fa7-solid:x"></span>
            </base-button>
          </div>

          <div
            class="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            Malang

            <base-button class="bg-red-100 rounded-full">
              <span class="h-2 w-2 i-fa7-solid:x"></span>
            </base-button>
          </div>
        </div> -->
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-20 flex items-center justify-between border-t border-slate-200 pt-8">
      <router-link
        to="/"
        class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100"
      >
        Back
      </router-link>

      <!-- to="/customer-preferences/budget" -->
      <!-- class="rounded-xl bg-gray-300 px-8 py-3 font-semibold text-white hover:bg-blue-700" -->
      <router-link
        to="#"
        class="rounded-xl bg-gray-300 px-8 py-3 font-semibold text-white"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>