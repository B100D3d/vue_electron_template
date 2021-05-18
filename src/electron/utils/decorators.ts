import { ipcMain } from "electron"

export function IpcMainHandle(event: string) {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {
        ipcMain.handle(event, async (event, ...eventArgs) => {
            // @ts-ignore
            return descriptor.value.call(this, ...eventArgs)
        })

        return descriptor
    }
}
