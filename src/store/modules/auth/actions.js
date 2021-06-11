export default {
    auth({ commit, state }) {
        commit("SET_TOKEN", "token")
    },
    signIn({ commit }, { email, password }) {
        const { token } = { token: "token" }
        commit("SET_TOKEN", token)
    },
}
