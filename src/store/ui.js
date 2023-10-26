export default {
    state: () => {
        return {
            app_loading: true,// app 正在加载
            spell:false,
        }
    },
    mutations: {
        setAppLoading(state, payload) {
            state.app_loading = payload || false;
        },
        switchSpell(state) {
            state.spell = !state.spell
        }
    },
    actions: {
    },
    getters: {}
}