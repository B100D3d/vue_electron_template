import { BrowserWindow } from "electron"
import { IpcMainHandle } from "@/electron/utils/decorators"

let appState = null

const GET_STATE = "getState"
const MUTATION_EVENT = "vuex-mutation"

export class ElectronVuexPlugin {
    @IpcMainHandle(GET_STATE)
    async getState() {
        return appState
    }

    @IpcMainHandle(MUTATION_EVENT)
    async handleMutation(event, state) {
        appState = state
        const windows = BrowserWindow.getAllWindows()
        windows
            .filter((window) => window.webContents !== event.sender)
            .forEach((window) => window.webContents.send(MUTATION_EVENT, state))
    }
}
