import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export interface MiddlewareContext {
    to: RouteLocationNormalized
    from: RouteLocationNormalized
    next: NavigationGuardNext
    store: any
    middlewares: Array<RouterMiddleware>
    callback?: RouterMiddleware
}

export type RouterMiddleware = (context: MiddlewareContext) => any
