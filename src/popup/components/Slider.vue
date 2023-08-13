<template>
  <div
    v-if="hasNode"
    class="flex flex-col gap-2 justify-center items-center h-full"
  >
    <input
      type="range"
      min="0"
      max="300"
      step="10"
      v-model="volume"
      class="accent-violet-500"
    />
    <div>{{ volume }}%</div>
  </div>
  <div v-else class="flex flex-col gap-2 justify-center items-center h-full">
    No video found
  </div>
</template>

<script setup lang="ts">
const focusTab = ref<chrome.tabs.Tab | undefined>(undefined);
const volume = ref<number>(100);
const hasNode = ref<boolean>(false);

watch(volume, (newValue) => {
  updateBadge(newValue);
  sendMessage({ type: "changeVolume", payload: newValue });
});

onMounted(async () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      focusTab.value = tabs[0];
      sendMessage({ type: "getVolume" }, getVolume);
      sendMessage({ type: "getNode" }, getNode);
    }
  });
});

const getVolume = (res: number) => {
  volume.value = res;
};

const getNode = (res: any) => {
  hasNode.value = !!res;
};

const sendMessage = async (
  { type, payload }: { type: string; payload?: string | number },
  handler?: any
) => {
  if (!focusTab.value || !focusTab.value.id) return;

  chrome.tabs.sendMessage(
    focusTab.value.id,
    {
      type,
      payload,
    },
    async (res) => {
      if (handler && res) {
        await handler(res);
      }
    }
  );
};

const updateBadge = (volume: number) => {
  chrome.action.setBadgeText({
    text: String(volume),
    tabId: focusTab.value?.id,
  });
};
</script>
