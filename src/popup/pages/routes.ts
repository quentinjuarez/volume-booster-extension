import index from "./index.vue";
import error from "./error.vue";

const routes = [
  {
    name: "index",
    path: "/",
    component: index,
  },
  {
    path: "/:catchAll(.*)",
    component: error,
  },
];

export default routes;
