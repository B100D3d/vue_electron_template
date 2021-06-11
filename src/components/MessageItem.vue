<script>
export default {
    name: "MessageItem",
    props: {
        message: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            liked: false,
            ghost: false,
            over: false,
        }
    },
    methods: {
        start(e) {
            console.log("start", { e })
            this.ghost = true
            e.dataTransfer.effectAllowed = "copy"
            e.dataTransfer.setData("text", this.message)
        },
        end(e) {
            console.log("end", { e })
            this.ghost = false
            this.over = false
        },
        enter() {
            this.over = true
        },
        leave() {
            this.over = false
        },
        dragover(e) {
            return false
        },
        drop(e) {
            console.log("drop", { e }, e.dataTransfer.getData("text"))
            this.over = false
            return false
        },
    },
}
</script>

<template>
    <li
        :class="{ ghost, over: over }"
        draggable="true"
        @dragstart="start"
        @dragend="end"
        @dragenter="enter"
        @dragleave="leave"
        @dragover.stop.prevent="dragover"
        @drop.stop.prevent="drop"
    >
        <span>{{ message }}</span>
        <input
            type="checkbox"
            class="uk-margin-left uk-checkbox"
            v-model="liked"
        />
    </li>
</template>

<style lang="scss" scoped>
li {
    border: 1px dashed transparent;

    &.ghost {
        background-color: transparent;
        border-color: gray;
        color: transparent;
        opacity: 0.5;
    }

    &.over {
        border: 3px dotted #666;
    }
}
</style>
