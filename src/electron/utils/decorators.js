import { ipcMain } from "electron"

export function IpcMainHandle(event) {
    return (target, key, descriptor) => {
        ipcMain.handle(event, async (event, ...eventArgs) => {
            return descriptor.value.call(this, ...eventArgs)
        })

        return descriptor
    }
}
