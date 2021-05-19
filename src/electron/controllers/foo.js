import { IpcMainHandle } from "@/electron/utils/decorators"

export default class Foo {
    @IpcMainHandle("bar")
    async bar(baz) {
        return `Hello, ${baz}`
    }
}
