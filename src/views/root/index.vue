<template >
  <div class="wrapper"></div>
</template>
<script>
export default {
  name: "root",
  data() {
    return {
        roots:[]
    }
  },
  mounted() {
    fetch("https://archive.v2k.fun/roots.json").then(res => res.json()).then(res => {
        this.roots = res;
    });
  },
};
</script>
<style lang="less" scoped>
</style>