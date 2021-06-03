import actions from "@/store/modules/auth/actions"
import mutations from "@/store/modules/auth/mutations"
import getters from "@/store/modules/auth/getters"

const state = {
    token: null,
}

export default {
    state,
    getters,
    mutations,
    actions,
}
