export default {
    auth({ commit }) {
        commit("SET_TOKEN", null)
    },
    signIn({ commit }, { email, password }) {
        const { token } = { token: "token" }
        commit("SET_TOKEN", token)
    },
}
