<template>
  <div class="wrapper">
    <Switch />
    <Word />
    <Spell
      v-if="spell"
      @next="nextWord"
      :letter="letter"
      :word="spellWord"
    />
    <template v-else>
      <div class="card btn" @click="prevWord">上一个</div>
      <div class="card btn" @click="nextWord">下一个</div>
    </template>
    <div class="card btn" @click="ignore">不会</div>
    <router-link class="card btn link" to="/saved">
      生词本
      <span :style="{ color: '#f33b1f' }">
        {{ count ? "(" + count + ")" : "" }}
      </span>
    </router-link>
    <div class="footer">
      <router-link to="/report">今日学习报告</router-link>
      <a @click="switchSpell">切换拼写模式</a>
    </div>
  </div>
</template>

<script>
import Switch from "./components/switch.vue";
import Word from "./components/word.vue";
import Spell from "./components/spell.vue";
import db from "@/utils/db";
import updateRecord from "@/utils/record";
import { formatKana } from "@/utils/format";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  name: "index",
  components: { Switch, Word, Spell },
  data() {
    return {
      count: 0,
    };
  },
  watch: {
    active_index: {
      handler() {
        db.saved.count((count) => {
          console.log(count, "count");
          this.count = count;
        });
      },
      immediate: true,
    },
    active: {
      handler() {
        this.getWords();
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState("book", ["active", "active_index", "words", "books"]),
    ...mapState("ui", ["spell"]),
    ...mapGetters("book", ["book", "progress", "currentWord"]),
    letter() {
      if (this.book && this.book.tags.includes("日语")) {
        let kana = formatKana(this.currentWord?.word);
        return kana || "";
      } else {
        return this.currentWord?.word || "";
      }
    },
    spellWord() {
      if (this.book && this.book.tags.includes("日语")) {
        let kana = formatKana(this.currentWord?.word);
        return kana || "";
      } else {
        return this.currentWord?.word || "";
      }
    }
  },
  methods: {
    ...mapActions("book", [
      "getWords",
      "getBooks",
      "setActive",
      "setActiveIndex",
    ]),
    ...mapMutations("ui",['switchSpell']),
    nextWord() {
      if (this.active_index[this.active] + 1 != undefined) {
        this.setActiveIndex({
          [this.active]: this.active_index[this.active] + 1,
        });
        updateRecord({
          book: this.book.title,
          process: this.progress,
          index: this.active_index[this.active] + 1,
          ts: new Date().getTime(),
          date: new Date().toLocaleDateString(),
        });
      } else {
        alert("学习完成！");
      }
    },
    prevWord() {
      if (this.active_index[this.active] > 0) {
        this.setActiveIndex({
          [this.active]: this.active_index[this.active] - 1,
        });
      } else {
        console.log("first");
        alert("已经是第一个了！");
      }
    },
    // Proxy 封装后的数组 对象不能indexdb写进去
    ignore() {
      const obj = {
        word: this.currentWord?.word,
        means: _.cloneDeep(this.currentWord?.trans),
        ts: new Date().getTime(),
        lang: this.book.tags.includes("日语") ? "ja" : "en",
        bookid: this.active,
      };
      db.saved.add(obj);
      this.nextWord();
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.link {
  display: inline-block;
  align-self: center;
  font-size: 14px;
}
.footer {
  display: flex;
  align-items: center;
  gap: 15px;
}
.footer a {
  color: #adadad;
  font-size: 14px;
  text-decoration: underline;
}
</style>