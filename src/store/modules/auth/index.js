export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authUser: {},
    },
    getters: {
        //
    },
    mutations: {
        updateLoginStatus (state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        updateAuthUser (state, authUser) {
            state.authUser = authUser
        }
    },
}