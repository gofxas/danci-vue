<template>
  <div :class="['wrapper', generating ? 'generating' : '']" ref="wrapperRef">
    <h1 class="date">{{ new Date().toLocaleDateString() }}</h1>
    <p class="total">
      今天记了<b>{{ totalToday }}</b
      >个单词!
    </p>
    <img v-if="mms.length" class="onwork" src="/onstudy.jpg" />
    <div v-for="t in mms" class="bookInfo" :key="t.id">
      记住了<b>《{{ t.book }}》</b>的<b>{{ t.count }}</b
      >个单词,当前词书进度为 <b>{{ t.process }}</b
      >。
    </div>
    <img class="hardwork" src="/study.svg" />

    <p v-if="un" class="enjoy">
      生词本里面还有<b>{{ un }}</b
      >个词语等着你复习。
    </p>
    <p v-if=" !un && totalToday" class="enjoy">
      加油!!!生词本里面的单词已经学习完毕。
    </p>
    <img class="onwork" src="/qrcode.png" />

    <div 
    v-if="!generating"
    class="centerd gap">
      <button class="report" @click="backHome">继续学习</button>
      <button class="report" @click="generatePic">😽生成报告</button>
    </div>
    <!-- <div v-if="!generating" class="centerd">
      <router-link to="/">继续学习</router-link>
    </div> -->
  </div>
</template>
<script>
import db from "@/utils/db";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
export default {
  name: "report",
  data() {
    return {
      mms: [],
      un: 0,
      un1: 0,
      generating: false,
    };
  },
  computed: {
    totalToday() {
      return this.mms.reduce((p, c) => {
        return (p += c.count);
      }, 0);
    },
  },
  methods: {
    async getRecords() {
      const records = await db.record
        .where({
          date: new Date().toLocaleDateString(),
        })
        .toArray();
      const uncount = await db.saved.count();
      this.un = uncount;
      this.mms = records;
    },
    async generatePic() {
      this.generating = true;
      setTimeout(() => {
        html2canvas(this.$refs.wrapperRef, { useCORS: true }).then((canvas) => {
          canvas.toBlob((blob) => {
            saveAs(blob, new Date().toLocaleDateString() + "-报告.png");
            this.generating = false;
          });
        });
      });
    },
    backHome() {
      this.$router.push("/")
    }
  },
  mounted() {
    this.getRecords();
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  padding: .5rem;
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  background-color: #fcfaf2;
  background-image: url(/bg.png);
  height: fit-content;
}
.date {
  text-align: center;
  font-family: "Fira Code";
  margin: 2rem 0;
}
.total {
  margin: .5rem 0;
  text-align: center;
  b {
    color: #f596aa;
  }
}
.onwork {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.hardwork {
  display: block;
  width: 50%;
  max-width: 350px;
  margin: 0 auto;
  border-radius: .5rem;
}
.bookInfo {
  margin: .5rem 0;
  text-align: center;
  font-size: .7rem;
  b {
    color: #f596aa;
  }
}
.enjoy {
  margin: .5rem 0;
  font-size: .7rem;
  text-align: center;
}
.report {
  background-color: #d0dfe6;
  color: #5c3719;
  font-weight: 700;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  margin-bottom: 12px;
}
.centerd {
  width: 100%;
  text-align: center;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: center;
  &.gap {
    gap: .7rem .5rem
  }
  a {
    color: #adadad;
    font-size: 14px;
    text-decoration: underline;
  }
}
</style>