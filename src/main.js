import { createApp } from "vue";
import mitt from "mitt";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import dayjs from "dayjs";
import "./assets/styles/base.less";

setTimeout(() => document.querySelector("#app-loading").remove(), 1500);
const app = createApp(App);

app.config.globalProperties.formatTime = (time, rule) =>
  time ? dayjs(time).format(rule || "YYYY-MM-DD") : "-";

app.config.globalProperties.$event = new mitt();
app.use(router).use(store).mount("#app");
