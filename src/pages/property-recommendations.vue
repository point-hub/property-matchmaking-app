<script setup lang="ts">
const codes = ['AB0001','AC0002','AD0003'];
const prices = ['Rp150.000.000','Rp400.000.000','Rp300.000.000'];
const locations = ['Surabaya Timur','Malang','Surabaya Selatan'];
</script>

<template>
  <main class="min-h-screen bg-slate-50">

    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">

        <div>
          <h1 class="text-2xl font-bold text-slate-900">
            Your Property Matches
          </h1>

          <p class="text-sm text-slate-500">
            Personalized recommendations based on your preferences
          </p>
        </div>

        <!-- <button
          class="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
        >
          Update Preferences
        </button> -->

      </div>
    </header>

    <div class="mx-auto max-w-7xl px-8 py-12">

      <!-- Hero -->

      <section
        class="rounded-[32px] bg-gradient-to-r from-blue-700 to-blue-500 p-12 text-white"
      >

        <div class="flex items-center justify-between">

          <div>

            <p class="font-medium opacity-90">
              Property Match Complete
            </p>

            <h2 class="mt-3 text-5xl font-bold">
              We found 3 properties
            </h2>

            <p class="mt-5 max-w-2xl text-lg opacity-90">
              After analyzing your preferences, we've selected the properties
              that best fit your lifestyle and budget.
            </p>

          </div>

          <!-- <div class="text-center">

            <div class="text-7xl font-bold">
              96%
            </div>

            <div class="mt-2 text-white/80">
              Average Match
            </div>

          </div> -->

        </div>

      </section>

      <!-- Summary -->

      <section class="mt-10 grid gap-6 lg:grid-cols-4">

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Location</div>
          <div class="mt-2 font-semibold">Surabaya Timur, Malang</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Budget</div>
          <div class="mt-2 font-semibold">100M - 300M</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Buying Problems</div>
          <div class="mt-2 font-semibold">Penghasilan Terbatas</div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
          <div class="text-sm text-slate-500">Promotion Needs</div>
          <div class="mt-2 font-semibold">Sewa dulu, beli kemudian</div>
        </div>
      </section>

      <!-- Top 3 -->

      <section class="mt-20">

        <!-- <div class="mb-8 flex items-end justify-between">

          <div>

            <p class="font-medium text-blue-600">
              Top Recommendations
            </p>

            <h2 class="mt-2 text-4xl font-bold">
              Our Best Matches
            </h2>

          </div>

          <div class="text-slate-500">
            Ranked by your preferences
          </div>

        </div> -->

        <!-- <div class="grid gap-8 xl:grid-cols-3">

          <article
            v-for="(score, index) in codes"
            class="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
          >

            <div class="relative">
              <div class="aspect-[4/3] bg-slate-200"></div>
            </div>

            <div class="p-7">

              <h3 class="text-2xl font-bold">
                {{score}}
              </h3>

              <div class="flex justify-between">
                <p class="mt-0 text-slate-500">
                  Surabaya
                </p>
                <p class="mt-0 text-slate-500">
                  Tipe 36/72
                </p>
              </div>

              <div class="mt-5 text-3xl font-bold text-blue-700">
                {{ prices[index] }}
              </div>

              <div class="mt-8 flex gap-3">

                <button
                  class="flex h-12 flex-1 items-center justify-center rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                >
                  View Details
                </button>

                <a
                  href="https://wa.me/6281234567890?text=Hi%20Sarah,%20I'm%20interested%20in%20the%20Modern%20Family%20House%20(98%%20Match)."
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 font-semibold text-white transition hover:bg-[#20BA5A]"
                >
                  <div class="i-logos-whatsapp-icon h-5 w-5"></div>

                  Contact
                </a>
              </div>
            </div>
          </article>
        </div> -->
      </section>

      <!-- Comparison -->

      <section class="mt-20">

        <h2 class="text-3xl font-bold">
          Compare Our Top Picks
        </h2>

        <div class="flex flex-wrap items-center gap-6 my-4">

          <div class="flex items-center gap-3">
            <div class="h-5 w-5 rounded-md border border-green-400 bg-green-100"></div>

            <span class="text-sm text-slate-600">
              Matches your criteria
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="h-5 w-5 rounded-md border border-red-400 bg-red-100"></div>

            <span class="text-sm text-slate-600">
              Doesn't match your criteria
            </span>
          </div>

        </div>

        <div class="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">

          <table class="w-full">
            <thead class="bg-slate-100">
              <tr>
                <th class="p-5 text-left">Property</th>

                <th>AB0001</th>
                <th>AC0002</th>
                <th>AD0003</th>
              </tr>
            </thead>

            <tbody class="divide-y">
              <tr>
                <td></td>
                <td class="w-64 min-w-64 p-4" v-for="i in 3">
                  <div class="flex gap-2 justify-center">
                    <img
                      src="https://cdn.britannica.com/05/157305-004-53D5D212.jpg"
                      class="h-24 w-24 flex-none rounded-lg object-cover"
                    />
                    <img
                      src="https://cdn.britannica.com/05/157305-004-53D5D212.jpg"
                      class="h-24 w-24 flex-none rounded-lg object-cover"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td class="p-5">Location</td>

                <td v-for="(location, index) in locations" :key="index" :class="`px-4 ${index === 2 ? 'bg-red-100' : 'bg-green-100'}`">
                  {{ location }}
                </td>
              </tr>
              <tr>
                <td class="p-5">Price</td>

                <td v-for="(price, index) in prices" :key="index" :class="`px-4 ${index === 1 ? 'bg-red-100' : 'bg-green-100'}`">
                  {{ price }}
                </td>
              </tr>
              <tr>
                <td class="p-5">Type</td>

                <td class="p-4" v-for="(location, index) in locations" :key="index">
                  32/64
                </td>
              </tr>
              <tr>
                <td class="p-5">Land Titles</td>

                <td class="min-w-48 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ HGB</li>
                    <li>✓ SPLID</li>
                  </ul>
                </td>
                <td class="min-w-48 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ HGB</li>
                  </ul>
                </td>
                <td class="min-w-48 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ HGB</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td class="p-5">Facilities</td>

                 <td class="min-w-72 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ Mini Market</li>
                    <li>✓ Playground</li>
                    <li>✓ One Gate System</li>
                    <li>✓ PDAM Water</li>
                    <li>✓ Food Court</li>
                  </ul>
                </td>
                 <td class="min-w-72 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ One Gate System</li>
                    <li>✓ PDAM Water</li>
                    <li>✓ Food Court</li>
                  </ul>
                </td>
                 <td class="min-w-72 p-4">
                  <ul class="space-y-1 text-sm">
                    <li>✓ Mini Market</li>
                    <li>✓ Playground</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Remaining Results -->

      <!-- <section class="mt-20">

        <div class="flex items-center justify-between">

          <h2 class="text-3xl font-bold">
            More Recommended Properties
          </h2>

          <button class="text-blue-600">
            View All →
          </button>

        </div>

      </section> -->

    </div>

  </main>
</template>