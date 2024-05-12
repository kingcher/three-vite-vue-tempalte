import type { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import Box from "@/Views/Box/index.vue";

// Generate routes dynamically
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Box",
    component: Box
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true
});

export function setupRouter(app: App) {
  app.use(router);
}
export default router;
