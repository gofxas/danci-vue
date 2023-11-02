<template >
  <transition name="slide">
    <div @click="closeModal" class="popup" v-if="visible">
      <div class="popup-wrapper">
        <slot/>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "popup",
  props: {
    visible: false,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.popup {
  background-color: #0004;
  z-index: 10;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
}
.popup-wrapper {
  position: absolute;
  height: 70%;
  background-color: #fff;
  bottom: 0;
  width: 100%;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  .popup-wrapper {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    height: 70%;
  }
}

.slide-enter-from,
.slide-leave-active {
  opacity: 0;
  .popup-wrapper {
    height: 0;
  }
}
</style>