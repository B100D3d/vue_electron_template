import { createApp } from "vue"
import Toast from "@/components/Toast"
import { timeout } from "@/utils"

const el = document.createElement("div")
const vm = createApp(Toast).mount(el)
let opening = false
const changeOpening = () => (opening = !opening)
const defaultOptions = { duration: 2000, position: "top-right" }

const useToast = () => {
    return {
        async open(options) {
            while (opening) {
                await timeout(500)
            }
            const message =
                typeof options === "string" ? { text: options } : { ...options }

            changeOpening()
            timeout(500).then(changeOpening)
            vm.addMessage(message)
        },
        error(text, options) {
            this.open({
                ...defaultOptions,
                ...options,
                text,
                type: "error",
                id: Math.random(),
            })
        },
        info(text, options) {
            this.open({
                ...defaultOptions,
                ...options,
                text,
                type: "info",
                id: Math.random(),
            })
        },
    }
}

export default useToast
