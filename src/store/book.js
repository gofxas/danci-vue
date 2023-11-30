import { persist } from "@/utils/withStorage";
const namespace = "book";
const module = {
  state: () =>
    persist(
      {
        active: "CET4luan_1",
        active_index: {
          CET4luan_1: 0,
        },
        words: [],
        books: [],
      },
      namespace
    ),
  actions: {
    async getWords({ state }) {
      const active = state.active;
      if (active) {
        const response = await fetch(
          "https://archive.v2k.fun/" + active + ".json"
        );
        const res = await response.json();
        state.words = res;
      }
      return true;
    },
    async getBooks({ state }) {
      fetch("/books.json")
        .then((res) => res.json())
        .then((res) => {
          state.books = res;
        });
    },
    async setActive({ state, dispatch }, active) {
      if (!state.active_index[active]) {
        dispatch("setActiveIndex", { [active]: 0 });
      }
      state.active = active;
      await dispatch("getWords");
      return true;
    },
    setActiveIndex({ state }, newObj) {
      const prev = state.active_index;
      state.active_index = { ...prev, ...newObj };
    },
  },
  getters: {
    book(state) {
      return state.books.find((t) => t.id == state.active);
    },
    progress(state) {
      if (state.active_index && state.active_index[state.active] > -1) {
        return state.active_index[state.active] + 1 + "/" + state.words.length;
      }
      return null;
    },
    currentWord(state) {
      let i = state.active_index[state.active] || 0;
      return state.words[i];
    },
  },
  mutations: {
    shuffling(state) {
      const _that = state.words;
      for (
        var j, x, i = _that.length;
        i;
        j = parseInt(Math.random() * i),
          x = _that[--i],
          _that[i] = _that[j],
          _that[j] = x
      );
      // state.words =
    },
  },
};
export default module;
