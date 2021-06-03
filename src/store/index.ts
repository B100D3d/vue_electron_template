import { createStore } from "vuex"

import actions from "@/store/actions"
import mutations from "@/store/mutations"

import auth from "@/store/modules/auth"
import VuexElectronPlugin from "@/plugins/electron-vuex"

const state = {
    user: null,
}

export default createStore({
    state,
    mutations,
    actions,
    plugins: [VuexElectronPlugin],
    modules: {
        auth,
    },
})
