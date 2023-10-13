<template >
  <div>
    <div class="taglist">
      <span
        @click="checked = '全部'"
        :class="[checked == '全部' ? 'active' : '']"
        >全部</span
      >

      <span
        v-for="tag in tags"
        :key="tag"
        @click="checked = tag"
        :class="[checked == tag ? 'active' : '']"
      >
        {{ tag }}
      </span>

      <router-link class="active" to="/">继续学习</router-link>
    </div>
    <div class="booklist">
      <div
        v-for="item in booklist"
        class="book"
        :key="item.id"
        @click="switchBook(item.id)"
      >
        <div class="bookcover">
          <img v-if="item.cover" :src="item.cover" />
          <div v-else class="booknocover">{{ item.title }}</div>
        </div>
        <div class="bookinfo">
          <p class="booktitle">{{ item.title }}</p>
          <p class="bookorigin">{{ item.origin }}</p>
          <p class="bookintroduce">{{ item.introduce }}</p>
          <div class="bookfoot}">
            <div>{{ item.tags.join(",") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions,mapMutations } from "vuex";
export default {
  name: "books",
  data() {
    return {
      checked: "全部",
      tags: [],
    };
  },
  computed: {
    ...mapState("book", ["books"]),
    ...mapGetters("book", ["process"]),
    booklist() {
      if (this.checked === "全部") {
        return this.books;
      }
      return this.books.filter((t) => t.tags.includes(this.checked));
    },
  },
  methods: {
    ...mapActions("book", ["setActive"]),
    ...mapMutations("ui", ["setAppLoading"]),
    switchBook(id) {
      this.setAppLoading(true)
      this.setActive(id).then(() => {
        this.setAppLoading(false)
        this.$router.push("/")
      });
    },
  },
  mounted() {
    fetch("/tags.json")
      .then((res) => res.json())
      .then((res) => {
        this.tags = res;
      });
    this.$store.dispatch("book/getBooks");
  },
};
</script>
<style lang="less" scoped>
.booklist {
  position: relative;
}

.book {
  width: 90%;
  padding: 12px;
  background-color: #fff;
  border-radius: 5px;
  margin: 12px auto;
  font-size: 14px;
  display: flex;
}

.bookcover {
  width: 80px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }
  .booknocover {
    width: 80px;
    height: 107.78px;
    background-image: url(/bg.png);
    background-color: #fcfaf2;
    border-radius: 3px;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
}

.bookinfo {
  flex: 1;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .booktitle {
    font-size: 16px;
    font-weight: bold;
  }

  .bookorigin {
    color: #999;
  }

  .bookintroduce {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* 行数限制 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
    font-size: 13px;
  }

  .bookfoot {
    display: flex;
    justify-content: space-between;

    & > div {
      color: #57c3c2;
    }
  }
}

.taglist {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #fcfaf2;
  background-image: url(/bg.png);
  padding: 12px;
  span,
  a {
    padding: 5px;
    white-space: nowrap;
    margin: 0 5px 5px 0;
    font-size: 14px;
    &.active {
      color: #57c3c2;
    }
  }
}
</style>