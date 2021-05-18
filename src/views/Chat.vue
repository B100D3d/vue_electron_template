<script>
import ChatService from "@/services/ChatService"

const chat = new ChatService("ws://localhost:3000")
export default {
    name: "Chat",
    data() {
        return {
            messages: ["Hello", "Oh, Hello Man"],
            message: "",
        }
    },
    created() {
        chat.open()
        chat.subscribeToMessages(this.handleMessage)
    },
    beforeUnmount() {
        chat.unsubscribeFromMessages(this.handleMessage)
        chat.close()
    },
    methods: {
        handleMessage(message) {
            this.messages.push(message)
        },
        sendMessage() {
            if (this.message) {
                chat.sendMessage(this.message)
                this.messages.push(this.message)
                this.message = ""
            }
        },
    },
}
</script>

<template>
    <div class="chat uk-height-1-1 uk-position-relative">
        <div
            class="
                uk-container uk-container-small uk-height-1-1 uk-overflow-auto
            "
        >
            <ul class="uk-list">
                <template v-for="(message, idx) of messages" :key="idx">
                    <hr v-if="idx" />
                    <li class="uk-margin-bottom">
                        {{ message }}
                    </li>
                </template>
            </ul>
            <input
                type="text"
                class="uk-input"
                v-model="message"
                placeholder="Write a message"
                @keydown.enter="sendMessage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat {
    input {
        width: 300px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
