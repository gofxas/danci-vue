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
      <div class="study-links">
        <a
          href="javascript:void(0)"
          class="lbtn"
          @click="this.visible = !this.visible"
        >
          学习(当前窗口打开)
        </a>
        <a
          v-if="currentWord?.rel_words"
          class="lbtn"
          href="javascript:void(0)"
          @click="rootword = true"
          >查看同根词（{{ currentWord?.rel_words.length }}）</a
        >
      </div>
      <!-- <Spell :letter="letter"/> -->
    </div>
    <Popup @close="visible = false" :visible="visible">
      <iframe class="frame" :src="studyLink" frameborder="0"></iframe>
    </Popup>
    <Popup @close="rootword = false" :visible="rootword">
      <div class="rel-words">
        <h2 style="margin-bottom: 1rem">同根词</h2>
        <table class="relWordTable">
          <thead>
            <tr>
              <th style="width: 5rem">词性</th>
              <th>相关单词</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, k) in currentWord?.rel_words" :key="k">
              <td :style="{ textAlign: 'center' }">{{ i.pos }}</td>
              <td>
                <p v-for="(w, j) in i.words" :key="j">
                  <a
                    :href="`https://dict.youdao.com/result?word=${w.hwd}&lang=en`"
                    target="_blank"
                  >
                    {{ w.hwd }}
                  </a>
                  : {{ w.tran }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="rootlist" to="/root">查看词根列表</router-link>
      </div>
    </Popup>
  </div>
</template>
<script>
import { Howl } from "howler";
import { formatKana } from "@/utils/format";
import { mapGetters } from "vuex";
import Spell from "./spell.vue";
import Popup from "@/components/popup";

export default {
  name: "Word",
  components: { Spell, Popup },
  data() {
    return {
      visible: false,
      rootword: false,
    };
  },
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
  gap: 5px;
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
  font-size: 0.7rem;
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
.study-links {
  display: flex;
}
.lbtn {
  padding: 10px;
  display: inline-block;
  text-decoration: underline !important;
  line-height: 1;
  width: 100%;
  text-align: center;
  color: #57c3c2;
}
.frame {
  width: 100%;
  height: 100%;
}
.rel-words {
  width: 100%;
  padding: 1rem;
  h2 {
    text-align: center;
  }
  table {
    width: 100%;
    max-width: var(--maxwidth);
    margin: 0 auto;
  }
  .rootlist {
    display: block;
    margin: 1rem;
    text-align: center;
    color: #57c3c2;
  }
}
</style>