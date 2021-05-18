import WebsocketService from "@/services/WebsocketService"

type SubscriberFunction = (message: string) => void

export default class ChatService extends WebsocketService {
    private subscribers = new Set<SubscriberFunction>()

    constructor(url: string) {
        super()
        this.url = url
    }

    subscribeToMessages(subscriber: SubscriberFunction) {
        this.subscribers.add(subscriber)
    }

    unsubscribeFromMessages(subscriber: SubscriberFunction) {
        this.subscribers.delete(subscriber)
    }

    open() {
        super.open(this.url)
    }

    close() {
        super.close()
    }

    sendMessage(message: string) {
        this.send(message)
    }

    protected onOpen() {
        super.onOpen()
        if (this.ws) {
            this.ws.onmessage = (e) => {
                try {
                    const message = e.data
                    this.subscribers.forEach((subscriber) =>
                        subscriber(message)
                    )
                } catch (error) {
                    console.log(e, error)
                }
            }
        }
    }
}
