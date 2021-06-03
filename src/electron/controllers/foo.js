import { IpcMainHandle } from "@/electron/utils/decorators"

export default class Foo {
    @IpcMainHandle("bar")
    async bar(event, baz) {
        return `Hello, ${baz}`
    }
}
