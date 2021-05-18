import { RouteRecordRaw } from "vue-router"
import Chat from "@/views/Chat.vue"
import Second from "@/views/SecondPage.vue"

export default [
    {
        name: "chat",
        path: "/chat",
        component: Chat,
        meta: {
            title: "Chat",
        },
    },
    {
        name: "second",
        path: "/second",
        component: Second,
        meta: {
            title: "Second Page",
        },
    },
] as Array<RouteRecordRaw>
