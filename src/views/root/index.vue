<template >
  <div class="wrapper">
    <div class="card searchbox">
      <h3>
        词根列表
        <router-link to="/">返回</router-link>
      </h3>
      <input type="text" v-model="keyword" placeholder="输入词根查询" />
    </div>
    <div
      class="card rootbox"
      v-for="i in filterdList"
      :key="i.root"
      @click="visitPop(i)"
    >
      <p class="ras">
        <span class="tag">{{ i.tag }}</span>
        <span class="content">{{ i.ras_content }}</span>
        <span class="indicate">{{ i.ras_indicate }}</span>
      </p>
    </div>
    <Popup @close="visible = false" :visible="visible">
      <div class="root-wrapper">
        <p class="ras">
          <span class="tag">{{ root.tag }}</span>
          <span class="content">{{ root.ras_content }}</span>
          <span class="indicate">{{ root.ras_indicate }}</span>
        </p>
        <div
          class="ras-word"
          v-for="word in root.parts"
          :key="word.word"
          @click="learn(word.word)"
        >
          <p class="ras-word-info">
            {{ word.p }}
            {{ word.word }}
            {{ word.d }}
          </p>
          <p class="ras-word-dec">
            {{ word.dec }}
          </p>
        </div>
      </div>
    </Popup>
    <Popup @close="study = false" :visible="study">
      <iframe class="frame" :src="studyLink" frameborder="0"></iframe>
    </Popup>
  </div>
</template>
<script>
import Popup from "@/components/popup";
import _ from "lodash";
export default {
  name: "root",
  components: { Popup },
  data() {
    return {
      keyword: "",
      roots: [],
      visible: false,
      study: false,
      root: {
        parts: "",
        ras_content: "",
        ras_indicate: "",
        root: "",
        tag: "",
      },
      frameword: "",
    };
  },
  computed: {
    filterdList() {
      return this.roots.filter(
        (item) => item.ras_content.indexOf(this.keyword) > -1
      );
    },
    studyLink() {
      if (this.frameword) {
        return (
          "https://dict.youdao.com/result?word=" + this.frameword + "&lang=en"
        );
      } else {
        return "";
      }
    },
  },
  methods: {
    learn(word) {
      this.frameword = word;
      this.study = true;
    },
    visitPop(i) {
      this.root = _.cloneDeep(i);
      this.root.parts = JSON.parse(i.parts);
      this.visible = true;
    },
  },
  mounted() {
    fetch("https://archive.v2k.fun/roots.json")
      .then((res) => res.json())
      .then((res) => {
        this.keyword = this.$route.query?.k||"";
        this.roots = res;
      });
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  overflow: auto;
}
.ras {
  line-height: 1rem;
  font-size: 0.7rem;
  position: sticky;
  top: 0;
  background-color: #fff;
}
.tag {
  padding: 2px 5px;
  font-size: 12px;
  border-radius: 3px;
  color: #fff;
  background-color: #57c3c2;
  margin-right: 5px;
}
.rootbox {
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    box-shadow: 3px 3px 5px #dad4cb;
  }
}
.root-wrapper {
  width: 100%;
  max-width: var(--maxwidth);
  padding: 1rem;
  margin: 0 auto;
}
.ras-word {
  font-size: 0.7rem;
  margin: 0.5rem auto;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 3px 3px 5px #dad4cb9f;
}
.ras-word-info {
  color: #57c3c2;
  font-weight: bold;
}
.ras-word-dec {
  color: #666;
}
.searchbox {
  position: sticky;
  top: 0;
  z-index: 1;
  input {
    border: none;
    width: 100%;
    line-height: 1.3rem;
    outline: none;
  }
  h3 {
    display: flex;
    justify-content: space-between;
  }
  a {
    color: #57c3c2;
  }
}
.frame {
  width: 100%;
  height: 100%;
}
</style>