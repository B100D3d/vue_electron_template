import { ipcRenderer } from "electron"
import { cloneDeep } from "lodash"

const MUTATION_EVENT = "vuex-mutation"

export default (store) => {
    store.subscribe(() => {
        ipcRenderer.invoke(MUTATION_EVENT, cloneDeep(store.state))
    })

    ipcRenderer.on(MUTATION_EVENT, (_, state) => {
        store.replaceState(cloneDeep(state))
    })
}
