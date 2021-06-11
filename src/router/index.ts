import {
    createRouter,
    createWebHashHistory,
    createWebHistory,
    RouteRecordRaw,
} from "vue-router"
import store from "@/store"
import { MiddlewareContext, RouterMiddleware } from "@/types/Router"
import mainRoutes from "./main-routes"
import checkAuth from "@/router/middlewares/checkAuth"
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Home,
        children: mainRoutes,
        redirect: "/chat",
        meta: {
            middlewares: [checkAuth],
        },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            middlewares: [checkAuth],
        },
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    },
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const middlewares = to.meta.middlewares as Array<RouterMiddleware>
    if (!middlewares?.length) {
        return next()
    }

    const callback: RouterMiddleware = (context: MiddlewareContext) =>
        context.middlewares.length
            ? context.middlewares[0]({
                  ...context,
                  middlewares: context.middlewares.slice(1),
                  callback,
              })
            : context.next()
    const context = {
        to,
        from,
        next,
        store,
        middlewares,
    }

    return callback(context)
})

export default router
