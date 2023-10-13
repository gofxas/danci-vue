import { reactive, watch } from "vue";

export const persist = (state, namespace, version = 1) => {
  if (!namespace) {
    return new Error("namespace 未设置");
  }
  const temp = JSON.parse(localStorage.getItem(namespace));
  if (temp) {
    state = { ...state, ...temp.state };
  } else {
    localStorage.setItem(namespace, JSON.stringify({ state, version }));
  }
  state = reactive(state)
  watch(
    state,
    (newState) => {
      localStorage.setItem(
        namespace,
        JSON.stringify({ state: newState, version })
      );
    },
    { deep: true }
  );
  return state;
};
