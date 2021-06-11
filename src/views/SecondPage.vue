<script>
import DDraggable from "@/components/DDraggable"

export default {
    name: "SecondPage",
    components: { DDraggable },
    data() {
        return {
            messages: [
                { text: "1", id: Math.random() },
                { text: "2", id: Math.random() },
                { text: "3", id: Math.random() },
            ],
            message: "",
            effect: "move",
        }
    },
    methods: {
        sendMessage() {
            if (this.message) {
                this.messages.splice(0, 0, {
                    text: this.message,
                    id: Math.random(),
                })
                this.message = ""
            }
        },
        start(e) {
            console.log("start", { e })
        },
        end(e) {
            console.log("end", { e })
        },
        open() {
            window.open("#/second", "_blank")
        },
        toggleEffect() {
            this.effect = this.effect === "move" ? "copy" : "move"
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
            <button
                :uk-icon="effect === 'move' ? 'unlock' : 'lock'"
                class="
                    uk-icon-button
                    uk-position-top-right
                    uk-margin-xlarge-top
                    uk-margin-right
                "
                @click="toggleEffect"
            />
            <d-draggable
                v-model:list="messages"
                tag="div"
                child-tag="div"
                class="uk-list"
                :effect="effect"
            >
                <template #item="{ item: message }">
                    <p :key="message.id">
                        {{ message }}
                    </p>
                </template>
            </d-draggable>
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
