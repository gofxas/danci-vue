<template>
  <div class="wrapper">
    <div class="item header">
      生词本
      <a class="filter" @click="filterHandler">
        点击切换：
        {{ filter === "en" ? "英语" : filter === "ja" ? "日语" : "全部" }}
      </a>
      <router-link to="/">继续学习</router-link>
    </div>
    <div v-for="item in list" :key="item.id" class="item">
      <h1 class="word">{{ item.word }}</h1>
      <p class="means">
        <span v-for="(i, k) in item.means" :key="k">
          {{ i.pos }}:{{ i.cn }}
        </span>
      </p>
      <p class="time">{{ time(item.ts) }}</p>
      <div class="btns" style="textalign: right">
        <a
          title="去搜索引擎查询相关信息"
          target="_blank"
          :href="studyLink(item.word, item.lang)"
        >
          学习
        </a>
        <a @click="voice(item.word, item.lang)">发音</a>
        <a class="del" @click="del(item.id)"> 删除 </a>
      </div>
    </div>
    <div v-if="list.length == 0">
      <img class="hardwork" src="/study.svg" />
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
import { formatKana } from "@/utils/format";
import { Howl } from "howler";
import db from "@/utils/db";
export default {
  name: "saved",
  data() {
    return {
      saved: [],
      filter: "",
    };
  },
  computed: {
    list() {
      if (this.filter) {
        return this.saved.filter((t) => t.lang == this.filter);
      } else {
        return this.saved;
      }
    },
  },
  methods: {
    filterHandler() {
      const filterLoop = {
        en: "ja",
        ja: "",
      };
      if (this.filter) {
        this.filter = filterLoop[this.filter];
      } else {
        this.filter = "en";
      }
    },

    time(ts) {
      return dayjs(ts).format("YYYY/MM/DD hh:mm:ss");
    },
    studyLink(word, lang) {
      return (
        "https://dict.youdao.com/result?word=" +
        formatKana(word) +
        "&lang=" +
        lang
      );
    },
    voice(word, lang) {
      let vlink = `https://dict.youdao.com/dictvoice?audio=${formatKana(word)}`;
      if (lang == "en") {
        vlink += "&type=2";
      }
      if (lang == "ja") {
        vlink += "&le=jap";
      }
      const sound = new Howl({
        src: [vlink],
        html5: true,
      });
      sound.play();
    },
    del(id) {
      db.saved.delete(id);
      this.saved = this.saved.filter((t) => t.id != id);
    },
  },
  mounted() {
    db.saved.toArray((arr) => {
      this.saved = arr;
    });
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  max-width: 750px;
  min-width: 320px;
  margin: 0 auto;
  position: relative;
  height: 100%;
  overflow-y: auto;
  .header {
    position: sticky;
    width: 100%;
    top: 0;
    border-radius: 0 0 5px 5px;
    font-size: 28px;
    font-weight: bold;
    box-shadow: 2px 2px 8px 3px #e4dfd7;
    z-index: 1;
    a {
      font-weight: normal;
      font-size: 14px;
      text-decoration: underline;
    }
  }
}

.item {
  width: 85%;
  padding: 12px;
  background-color: #fff;
  border-radius: 5px;
  margin: 12px auto;
  font-size: 14px;
  box-shadow: 0px 0px 3px #e4dfd7;
}

.word {
  font-family: "Fira Code";
  color: #57c3c2;
  a {
    font-weight: normal;
    font-size: 14px;
    text-decoration: underline;
    margin-left: 8px;
    color: #867e76;
  }
}
.means {
  color: #867e76;
}
.time {
  color: #97846c;
  font-size: 12px;
}
.del {
  padding: 4px 0;
  color: #8fb2c9;
  text-decoration: underline;
}
.btns {
  position: relative;
  text-align: right;
  a {
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
  }
}
.filter {
  margin-right: 20px;
  margin-left: 20px;
}
.hardwork {
  display: block;
  width: 50%;
  max-width: 350px;
  margin: 0 auto;
  border-radius: 0.5rem;
}
</style>