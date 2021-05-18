import { stringify } from "@/utils"

const RECONNECTION_TIMEOUT = 2000
export default class WebsocketService {
    protected ws: WebSocket | null = null
    protected url = ""

    protected payloadsToSend = new Set<string>()

    protected isOpen = () => this.ws?.readyState === this.ws?.OPEN

    protected sendInterceptor = async () => {}

    protected async send(payload: any) {
        await this.sendInterceptor()

        const strPayload = stringify(payload)
        if (this.isOpen()) {
            this.ws?.send(strPayload)
        } else {
            this.payloadsToSend.add(strPayload)
        }
    }

    protected onOpen() {
        console.log("Websocket opened: ", this.url)
        this.payloadsToSend.forEach((payload) => this.send(JSON.parse(payload)))
        this.payloadsToSend.clear()
    }

    protected open(url: string) {
        this.url = url || this.url
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
            this.onOpen()
        }

        this.ws.onclose = (e) => {
            if (!e.wasClean) {
                console.log(e)
                setTimeout(this.open.bind(this), RECONNECTION_TIMEOUT)
            }
        }

        this.ws.onerror = (e) => {
            console.log(e)
        }
    }

    protected close() {
        if (this.isOpen()) {
            this.ws?.close()
        }
    }
}
