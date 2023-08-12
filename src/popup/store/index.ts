import { defineStore } from "pinia";

export interface IState {
  storeLoaded: boolean;
  locale: string;
}

const initState: IState = {
  storeLoaded: false,
  locale: "fr",
};

export const useStore = defineStore("storage", {
  state: (): IState => initState,
  getters: {},
  actions: {
    mutate(key: keyof IState, value: any) {
      this.$patch({ [key]: value });
      chrome.storage.local.set({ [key]: value });
    },
    async init() {
      const result = await chrome.storage.local.get(null);

      this.$patch(result);
      this.storeLoaded = true;
    },
  },
});
