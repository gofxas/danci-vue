<template >
  <!-- <div class="word-input">
    {{ userinput }}
  </div> -->
  <div class="card letters">
    <div 
    @click="nextEvt"
    v-if="nextLetter == 'ok'" class="letter opend success">Nice ！</div>
    <template
    v-else
    >
      <div
        v-for="i in letterArr"
        :key="i"
        @click="appendIn(i)"
        :class="['letter', nextLetter == i ? 'opend' : '']"
      >
        <span>{{ i }}</span>
      </div>
    </template>
  </div>
</template>
<script>

export default {
  name: "spell",
  props: {
    letter: {
      default: "",
      type: String,
    },
    word: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      userinput: "",
    };
  },
  watch:{
    word() {
        this.userinput = ""
    }
  },
  computed: {
    letterArr() {
      return Array.from(new Set(this.letter.split(""))).sort(() =>
        Math.random() > 0.5 ? 1 : -1
      );
    },
    nextLetter() {
      if (this.word) {
        let le = this.word[this.userinput.length];
        if (le) {
          return le;
        } else {
          return "ok";
        }
      } else {
        return "wait";
      }
    },
  },
  methods: {
    appendIn(letter) {
      if (letter == this.nextLetter) {
        this.userinput += letter;
      }
    },
    nextEvt() {
        this.$emit("next")
    }
  },
};
</script>
<style lang="less" scoped>
.letters {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-height: 45px;
  .letter {
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    user-select: none;
    background-color: #ccc;
    &.opend {
      box-shadow: 0 0 5px #dad4cb;
      background-color: #fff;
    }
    &.success {
      width: 5rem;
      color: #fff;
      background-color: #67C23A;
    }
    &:active {
      box-shadow: -1px -1px 1px #dad4cb;
    }
  }
}
.word-input {
  text-align: center;
  height: 2rem;
  line-height: 2rem;
}
</style>