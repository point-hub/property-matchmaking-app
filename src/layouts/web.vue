<script setup lang="ts">
</script>

<template>
  <main class="min-h-screen bg-white text-slate-900">
    <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-8">
        <a href="/" class="text-2xl font-bold tracking-tight">
          Kawanhunian
        </a>
      </div>
    </header>

    <section>
      <router-view></router-view>
    </section>

  </main>
</template>

<style scoped lang="postcss">
</style>
