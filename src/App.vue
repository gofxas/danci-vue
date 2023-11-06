<template>
  <transition name="fade-in">
    <div class="app-loading" v-if="app_loading">
      <img style="width: 40px" src="@/assets/image/loading.svg" alt="loading" />
      <p>数据获取中...</p>
    </div>
  </transition>
  <RouterView v-slot="{ Component }">
    <transition name="fade-in" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </RouterView>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState("ui", ["app_loading"]),
  },
  methods: {
    ...mapMutations("ui", ["setAppLoading"]),
  },
  mounted() {
    this.setAppLoading();
  },
};
</script>

<style lang="less">
.app-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-position: center;
  background-attachment: fixed;
  background-color: #6663;
  z-index: 9;
  p {
    font-size: 13px;
    color: #666;
    text-shadow: 2px 2px 3px #ccc;
  }
}
body {
  margin: 0;
  background-color: #f5f7fa;
  --maxwidth: 22.75rem;
}
.wrapper {
  width: 100%;
  max-width: 22.75rem;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-in-enter-from,
.fade-in-leave-active {
  opacity: 0;
}
.card {
  width: 85%;
  padding: 12px;
  background-color: #fff;
  border-radius: 5px;
  margin: 12px auto;
  font-size: 14px;

  &.main {
    text-align: center;

    h1 {
      font-size: 48px;
      font-family: "Fira Code";
    }

    .word {
      font-family: "Fira Code";
    }

    a {
      font-size: 13px;
      text-decoration: underline;
    }
  }

  &.btn {
    user-select: none;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 0 5px #dad4cb;
    &:hover {
      box-shadow: 3px 3px 5px #dad4cb;
    }
    &:active {
      // color: #fff;
      // background-color: #333;
      box-shadow: 0 0 1px #dad4cb;
    }
  }
}
</style>