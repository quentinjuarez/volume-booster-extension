import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (_to, _from, next) => {
  const store = useStore();

  if (!store.storeLoaded) {
    try {
      await store.init();
    } catch (error) {
      console.error("Failed to load store data:", error);
      return next("/error");
    }
  }

  next();
});

export default router;
