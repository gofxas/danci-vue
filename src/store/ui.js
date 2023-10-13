export default {
    state: () => {
        return {
            app_loading: true,// app 正在加载
        }
    },
    mutations: {
        setAppLoading(state, payload) {
            state.app_loading = payload || false;
        },
    },
    actions: {
    },
    getters: {}
}