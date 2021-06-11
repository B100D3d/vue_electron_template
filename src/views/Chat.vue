<script>
import ChatService from "@/services/ChatService"
import MessageItem from "@/components/MessageItem"

export default {
    name: "Chat",
    components: { MessageItem },
    data() {
        return {
            messages: ["Hello", "Oh, Hello Man", "Third"],
            message: "",
        }
    },
    methods: {
        handleMessage(message) {
            this.messages.push(message)
        },
        sendMessage() {
            if (this.message) {
                this.messages.splice(0, 0, this.message)
                this.message = ""
            }
        },
        open() {
            window.open("/", "_blank")
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
            <button
                uk-icon="move"
                class="
                    uk-icon-button
                    uk-position-top-right
                    uk-margin-top
                    uk-margin-right
                "
                @click="open"
            />
            <transition-group tag="ul" name="fade-move" class="uk-list">
                <message-item
                    v-for="(message, idx) of messages"
                    :key="idx"
                    :message="message"
                />
            </transition-group>
            <input
                type="text"
                class="chat-input uk-input"
                v-model="message"
                placeholder="Write a message"
                @keydown.enter="sendMessage"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.chat {
    .chat-input {
        width: 300px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
