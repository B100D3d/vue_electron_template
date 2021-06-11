<script>
export default {
    name: "DDraggableItem",
    props: {
        item: {
            type: [Object, Array, String, Number],
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
}
</script>

<template>
    <slot>{{ item }}</slot>
</template>

<style scoped></style>
