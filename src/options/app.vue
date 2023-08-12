<template>
  <div
    class="h-screen w-screen overflow-hidden bg-slate-900 text-slate-100 text-base font-custom selection:bg-violet-500/50"
  >
    <header
      aria-label="Site Header"
      class="bg-slate-800 h-12 flex items-center justify-center text-xl w-full font-bold"
    >
      Options
    </header>

    <div class="p-4 h-[calc(100%-48px)]">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
