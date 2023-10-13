import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        title: "单词记忆",
      },
      component: () => import("../views/index/index.vue"),
    },
    {
      path: "/saved",
      name: "Saved",
      meta: {
        title: "单词记忆",
      },
      component: () => import("../views/saved/index.vue"),
    },
    {
      path: "/books",
      name: "Books",
      meta: {
        title: "单词记忆",
      },
      component: () => import("../views/books/index.vue"),
    },
    {
      path: "/report",
      name: "Report",
      meta: {
        title: "单词记忆",
      },
      component: () => import("../views/report/index.vue"),
    },
  ],
});

export default router;
