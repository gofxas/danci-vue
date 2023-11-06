import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "Home",
      meta: {
        title: "记单词-单词记忆",
      },
      component: () => import("../views/index/index.vue"),
    },
    {
      path: "/saved",
      name: "Saved",
      meta: {
        title: "生词-单词记忆",
      },
      component: () => import("../views/saved/index.vue"),
    },
    {
      path: "/books",
      name: "Books",
      meta: {
        title: "词书选择-单词记忆",
      },
      component: () => import("../views/books/index.vue"),
    },
    {
      path: "/report",
      name: "Report",
      meta: {
        title: "报告-单词记忆",
      },
      component: () => import("../views/report/index.vue"),
    },
    {
      path: "/root",
      name: "Root",
      meta: {
        title: "词根列表-单词记忆",
      },
      component: () => import("../views/root/index.vue"),
    },
  ],
});
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = "单词记忆";
  }
});
export default router;
