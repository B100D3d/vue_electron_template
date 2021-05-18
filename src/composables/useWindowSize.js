import { ref, onMounted, onUnmounted } from "vue"

const useWindowSize = () => {
    const width = ref(0)
    const height = ref(0)

    const update = () => {
        width.value = document.documentElement.clientWidth
        height.value = window.innerHeight
    }

    onMounted(() => window.addEventListener("resize", update))
    onUnmounted(() => window.removeEventListener("resize", update))

    update()

    return { width, height }
}

export default useWindowSize
