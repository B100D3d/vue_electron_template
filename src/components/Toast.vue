<template>
    <transition-group id="toastWrapper" tag="div" name="slide-down">
        <div
            v-for="message of messages"
            :key="message.id"
            class="toast uk-padding-small uk-card-secondary"
            :class="[message.type, message.position]"
            @click="handleClick(message.id)"
        >
            <span>{{ message.text }}</span>
        </div>
    </transition-group>
</template>

<script>
export default {
    name: "Toast",
    data: () => ({
        messages: [],
        parent: null,
    }),
    mounted() {
        document.body.appendChild(this.$el)
    },
    methods: {
        addMessage(message) {
            message.timeout = setTimeout(
                () => this.close(message.id),
                message.duration
            )
            this.messages.push(message)
        },
        close(id) {
            const message = this.messages.find((message) => message.id === id)
            clearTimeout(message.timeout)
            this.messages = this.messages.filter((m) => m.id !== id)
        },
        handleClick(id) {
            const message = this.messages.find((message) => message.id === id)
            if (message.onClick) this.message.onClick()
            else this.close(id)
        },
    },
}
</script>

<style lang="scss">
#toastWrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1100;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    height: 100vh;
    pointer-events: none;

    .toast {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        font-size: 1.1rem;
        pointer-events: all;
        border-radius: 2px;
        white-space: pre-line;

        &.top-right {
            align-self: flex-end;
        }

        &.top-left {
            align-self: flex-start;
        }

        &.top-center {
            align-self: center;
        }
    }
}
</style>
