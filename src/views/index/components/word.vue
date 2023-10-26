<template >
  <div class="card wordcard">
    <p class="word">{{ currentWord?.word }}</p>
    <div class="trans">
      <p class="sec">解释：</p>
      <p v-for="(i, k) in currentWord?.trans" :key="k">
        {{ i.pos ? i.pos + ":" : "" }}{{ i.cn }}
      </p>
    </div>
    <div class="voices">
      <p class="sec">发音：</p>
      <div v-if="currentWord?.ukphone">
        <a class="play" @click="sayWord(uksound)">
          英式：<span>{{ currentWord?.ukphone }}</span>
        </a>
      </div>

      <div v-if="currentWord?.usphone">
        <a class="play" @click="sayWord(ussound)">
          美式：<span>{{ currentWord?.usphone }}</span>
        </a>
      </div>
      <div v-if="currentWord?.jphone">
        <a class="play" @click="sayWord(jsound)">
          <span>{{ currentWord?.jphone }}</span>
        </a>
      </div>
      <div>
        <a
          style="marginright: 5px"
          title="去搜索引擎查询相关信息"
          target="blank"
          :href="studyLink"
          class="lbtn"
        >
          学习
        </a>
      </div>
      <!-- <Spell :letter="letter"/> -->
    </div>
  </div>
</template>
<script>
import { Howl } from "howler";
import { formatKana } from "@/utils/format";
import { mapGetters } from "vuex";
import Spell from "./spell.vue";
export default {
  name: "Word",
  components: { Spell },
  computed: {
    ...mapGetters("book", ["currentWord", "book"]),
    studyLink() {
      if (this.book && this.book.tags.includes("日语")) {
        let kana = formatKana(this.currentWord?.word);
        return "https://dict.youdao.com/result?word=" + kana + "&lang=ja";
      } else {
        return (
          "https://dict.youdao.com/result?word=" +
          this.currentWord?.word +
          "&lang=en"
        );
      }
    },
    uksound() {
      if (this.currentWord?.ukphone) {
        return new Howl({
          src: [
            `https://dict.youdao.com/dictvoice?audio=${this.currentWord?.word}&type=2`,
          ],
          html5: true,
        });
      }
      return null;
    },
    ussound() {
      if (this.currentWord?.usphone) {
        return new Howl({
          src: [
            `https://dict.youdao.com/dictvoice?audio=${this.currentWord?.word}&type=1`,
          ],
          html5: true,
        });
      }
      return null;
    },
    jsound() {
      if (this.currentWord?.jphone) {
        let kana = formatKana(this.currentWord?.word);
        return new Howl({
          src: [`https://dict.youdao.com/dictvoice?audio=${kana}&le=jap`],
          html5: true,
        });
      }
      return null;
    },
    letter() {
      if (this.book && this.book.tags.includes("日语")) {
        let kana = formatKana(this.currentWord?.word);
        return kana || "";
      } else {
        return this.currentWord?.word || "";
      }
    },
  },
  methods: {
    sayWord(sound) {
      if (sound && !sound.playing()) {
        sound.play();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.wordcard {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 3px #dad4cb;
  .word {
    font-size: 48px;
    font-family: "Fira Code";
    text-align: center;
    font-weight: bold;
  }

  .voices {
    a.play {
      line-height: 1;
      display: flex;
      align-items: center;
      margin: 5px 0;
      display: inline-block;
      cursor: pointer;
      svg {
        width: 1rem;
        height: 1rem;
        margin-left: 0.5rem;
        vertical-align: middle;
      }
    }
  }
}
.trans {
  margin: 1rem 0;
}
.relWordTable {
  border: 1px solid #97846c;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #97846c;
    padding: 5px;
  }

  a {
    text-decoration: underline;
  }
}

.relWordTableWrapper {
  max-height: 70vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
.relWordBtn {
  text-align: center;
}

.cadgeClose {
  text-align: center;
  padding: 12px;
  margin-top: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.sec {
  font-size: 15px;
  font-weight: bold;
}
@media only screen and (max-width: 500px) {
  .word {
    font-size: 32px !important;
  }
}

.lbtn {
  padding: 10px;
  display: inline-block;
  text-decoration: underline !important;
  line-height: 1;
  width: 100%;
  text-align: center;
}
</style>