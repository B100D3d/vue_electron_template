import { useActions, useGetters } from "@/composables/vuex-helpers"

export default async function checkAuth(context) {
    const { isAuthenticated } = useGetters("auth")
    const { auth } = useActions("auth")

    if (!isAuthenticated.value) {
        await auth()
    }
    if (!isAuthenticated.value) {
        if (context.to.name === "login") return context.callback(context)
        return context.next({
            name: "login",
        })
    } else {
        if (context.to.name === "login") return context.next("/")
        return context.callback(context)
    }
}
