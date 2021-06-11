<script>
import { cloneDeep } from "lodash"

const parseJSON = (str, defaultValue) => {
    try {
        return JSON.parse(str)
    } catch (e) {
        console.error(e)
        return defaultValue
    }
}

const prevent = (e) => {
    e.stopPropagation()
    e.preventDefault()
    return false
}

const EFFECTS = {
    MOVE: "move",
    COPY: "copy",
}

export default {
    name: "DDraggable",
    components: {},
    // model: {
    //     prop: "list",
    //     event: "change"
    // },
    emits: ["update:list"],
    props: {
        list: {
            type: Array,
            required: true,
        },
        tag: {
            type: String,
            required: true,
        },
        childTag: {
            type: String,
            required: true,
        },
        componentData: {
            type: Object,
            required: false,
            default: () => ({}),
        },
        group: {
            type: String,
            required: false,
            default: null,
        },
        effect: {
            type: String,
            required: false,
            default: EFFECTS.MOVE,
        },
    },

    data() {
        return {
            overIdx: null,
            dropped: false,
            started: false,
        }
    },
    computed: {},
    methods: {
        getDragData(e) {
            const dragData = e.dataTransfer.getData("text")
            return parseJSON(dragData, null)
        },
        start(e, index) {
            this.started = true

            e.dataTransfer.effectAllowed = this.effect
            e.dataTransfer.setData("text", JSON.stringify(this.list[index]))
        },
        end(e, droppedItemIdx) {
            this.started = false

            // was dropped inside this list
            if (this.dropped) {
                // replace two items
                const newList = this.list.map((item, idx) =>
                    idx === droppedItemIdx
                        ? this.list[this.overIdx]
                        : idx === this.overIdx
                        ? this.list[droppedItemIdx]
                        : item
                )
                this.$emit("update:list", newList)
            } else {
                const effect = e.dataTransfer.dropEffect
                if (effect === EFFECTS.MOVE) {
                    this.$emit(
                        "update:list",
                        this.list.filter((_, idx) => idx !== droppedItemIdx)
                    )
                }
            }

            this.overIdx = null
            this.dropped = false
        },
        enter(e, index) {
            this.overIdx = index
        },
        leave(e) {
            this.overIdx = null
        },
        dragover(e) {
            return prevent(e)
        },
        drop(e, index) {
            // from this list
            if (this.started) {
                this.dropped = true
                return prevent(e)
            }

            const item = this.getDragData(e)
            const newList = cloneDeep(this.list)
            newList.splice(index + 1, 0, item)
            this.$emit("update:list", newList)

            this.dropped = false

            return prevent(e)
        },
    },
}
</script>

<template>
    <transition-group :tag="tag" name="fade-move">
        <component
            :is="childTag"
            v-for="(item, index) of list"
            :key="item.id"
            draggable="true"
            @dragstart="start($event, index)"
            @dragend="end($event, index)"
            @dragenter.stop.prevent="enter($event, index)"
            @dragleave.stop.prevent="leave"
            @dragover.stop.prevent="dragover"
            @drop.stop.prevent="drop($event, index)"
        >
            <slot name="item" :item="item" :index="index" />
        </component>
    </transition-group>
</template>

<style lang="scss" scoped></style>
