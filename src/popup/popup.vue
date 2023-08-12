<template>
  <div
    class="w-[300px] h-[200px] bg-slate-900 text-slate-100 text-base font-custom selection:bg-violet-500/50"
  >
    <header
      aria-label="Site Header"
      class="bg-slate-800 h-10 flex items-center justify-center text-xl w-full font-bold"
    >
      {{ t(routeName) }}
    </header>

    <div class="p-4 h-[calc(100%-40px)]">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { t, setLocale } from "@/locales";

const store = useStore();
const route = useRoute();

const routeName = computed(() => {
  return `header.${String(route.name)}`;
});

watch(
  () => store.locale,
  (newValue) => {
    setLocale(newValue);
  },
  { immediate: true }
);
</script>
