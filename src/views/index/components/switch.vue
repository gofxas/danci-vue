<template >
  <div class="switch-handler" @click="goBooks">
    <p>
      已选词汇:<span :style="{ color: '#57c3c2', fontWeight: 'bold' }">{{
        book?.title
      }}</span>
    </p>
    <p>进度：{{ progress }}</p>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Switch",
  computed: {
    ...mapGetters("book", ["book", "progress", "currentWord"]),
  },
  methods: {
    ...mapActions("book", [
      "getWords",
      "getBooks"
    ]),
    goBooks() {
      this.$router.push("/books")
    }
  },
  mounted() {
    this.getWords();
    this.getBooks();
  },
};
</script>
<style lang="less" scoped>
.switch-handler {
  width: 85%;
  margin: 10px auto !important;
  font-size: 14px !important;
  padding: 4px 12px;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 12px;
  margin-top: 12px;
  box-shadow: 0 0 3px #dad4cb;
  transition: all 0.5s;
  display: inline-block;
}
</style>