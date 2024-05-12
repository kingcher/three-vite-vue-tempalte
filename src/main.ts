import { createApp } from "vue";

import router, { setupRouter } from "@/Router";
import App from "./App.vue";
import "./style.css";

async function appInit() {
  try {
    const app = createApp(App);
    // 挂载路由
    setupRouter(app);

    // 路由准备就绪后挂载APP实例
    await router.isReady();

    // 挂载到页面
    app.mount("#app", true);
  } catch (e) {
    console.log("error,", e);
  }
}

appInit();
