<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { getPublicProblemsApi } from '@/composables/api/problems/get-public.api';
import { useCustomerPreferenceStore } from '@/stores/customer-preference.store';

const preference = useCustomerPreferenceStore();

const isLoading = ref(false);
const problems = ref();
const isOtherSelected = ref(false);
const otherProblem = ref('');

watch(
  [isOtherSelected, otherProblem],
  () => {
    const currentProblems = preference.data.problems ?? [];

    const normalProblems = currentProblems.filter(
      (problem) => !problem.startsWith('Others:'),
    );

    if (
      isOtherSelected.value &&
      otherProblem.value.trim()
    ) {
      normalProblems.push(
        `Others: ${otherProblem.value.trim()}`,
      );
    }

    preference.data.problems = normalProblems;
  },
);

const getData = async (page = 1) => {
  try {
    isLoading.value = true;

    const response = await getPublicProblemsApi({
      page,
      page_size: 10,
    });

    problems.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

const restoreOtherProblem = (): void => {
  const otherValue = preference.data.problems?.find(
    (problem) => problem.startsWith('Others:'),
  );

  if (!otherValue) {
    return;
  }

  isOtherSelected.value = true;
  otherProblem.value = otherValue.replace(/^Others:\s*/, '');
};

onMounted(async () => {
  restoreOtherProblem();
  await getData();
});
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
        <span>60% Complete</span>
        <span>3 / 5</span>
      </div>

      <div class="h-2 overflow-hidden rounded-full bg-slate-200">
        <div class="h-full w-3/5 rounded-full bg-blue-600"></div>
      </div>
    </div>

    <!-- Heading -->
    <div class="mb-7 sm:mb-10">
      <h1
        class="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
      >
        Kendala anda saat ini
      </h1>

      <p
        class="mt-3 text-base leading-7 text-slate-500 sm:mt-5 sm:text-lg sm:leading-8"
      >
        Kendala terbesar untuk membeli rumah yang saat ini Anda rasakan?
      </p>
    </div>

    <!-- Form Card -->
    <div
      class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-3xl sm:p-6 lg:p-10"
    >
      <div class="flex flex-col gap-3 sm:gap-4">
        <!-- Problem Options -->
        <label
          v-for="problem in problems"
          :key="problem.name"
          class="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6"
        >
          <base-checkbox
            v-model="preference.data.problems"
            :true-value="problem.name"
            class="mt-1 h-5 w-5 shrink-0 rounded border-slate-300"
          />

          <div class="min-w-0 flex-1">
            <div
              class="break-words text-base font-semibold leading-6 text-slate-900 sm:text-xl"
            >
              {{ problem.name }}
            </div>

            <p
              class="mt-2 break-words text-sm leading-6 text-slate-500 sm:text-base"
            >
              {{ problem.description }}
            </p>
          </div>
        </label>

        <!-- Other Option -->
        <label
          class="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-500 hover:shadow-sm sm:gap-4 sm:rounded-2xl sm:p-6"
        >
          <input
            v-model="isOtherSelected"
            type="checkbox"
            class="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-blue-600 focus:ring-2 focus:ring-blue-500"
          />

          <div class="min-w-0 flex-1">
            <div class="text-base font-semibold text-slate-900 sm:text-xl">
              Lainnya
            </div>

            <textarea
              v-model="otherProblem"
              rows="4"
              placeholder="Beritahu kami kendala atau kebutuhan Anda"
              class="mt-3 w-full resize-y rounded-xl border border-slate-300 px-3 py-3 text-base leading-6 text-slate-900 outline-none transition placeholder:text-sm placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:mt-4 sm:rounded-2xl sm:px-4"
            />
          </div>
        </label>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:mt-12 sm:pt-8">
      <router-link
        to="/customer-preferences/budget"
        class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium transition hover:bg-slate-100 sm:px-6 sm:text-base"
      >
        Back
      </router-link>

      <router-link
        to="/customer-preferences/promotion-needs"
        class="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white sm:px-8 sm:text-base"
      >
        Continue
      </router-link>
    </div>
  </main>
</template>