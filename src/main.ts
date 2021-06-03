import { ipcRenderer } from "electron"
import { createApp } from "vue"
import store from "@/store"
import router from "./router"
import App from "./App.vue"
import { cloneDeep } from "lodash"

const init = async () => {
    const GET_STATE = "getState"
    const state = await ipcRenderer.invoke(GET_STATE)
    if (state) {
        store.replaceState(cloneDeep(state))
    }

    createApp(App).use(store).use(router).mount("#app")
}

init()
