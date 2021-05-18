import { computed, Ref } from "vue"

declare type OmitFirstArg<F, TReturn> = F extends (
    x: any,
    ...args: infer P
) => any
    ? (...args: P) => TReturn
    : never

declare type InferType<T, TUnknown = any> = T extends (...args: any) => any
    ? OmitFirstArg<T, ReturnType<T>>
    : T extends unknown
    ? TUnknown
    : T

declare type InferGetterType<T> = T extends (...args: any) => any
    ? ReturnType<T>
    : any

export declare type ExtractTypes<O, TUnknown = any> = {
    readonly [K in keyof O]: InferType<O[K], TUnknown>
}

export declare type ExtractGetterTypes<O> = {
    readonly [K in keyof O]: Ref<InferGetterType<O[K]>>
}

export declare type KnownKeys<T> = {
    [K in keyof T]: string extends K
        ? T extends any
            ? any
            : never
        : number extends K
        ? never
        : K
} extends {
    [_ in keyof T]: infer U
}
    ? U
    : never

export declare type RefTypes<T> = {
    readonly [Key in keyof T]: Ref<T[Key]>
}

function runCB<T>(
    cb: Function,
    store: any,
    namespace: string | null,
    prop: KnownKeys<T> | string
) {
    if (cb.length === 3) {
        // choose which signature to pass to cb function
        return cb(store, namespace, prop)
    } else {
        return cb(store, namespace ? `${namespace}/${prop}` : prop)
    }
}

function useFromArray(
    store: any,
    namespace: string | null,
    props: Array<string>,
    cb: Function
) {
    return props.reduce((result, prop) => {
        result[prop] = runCB(cb, store, namespace, prop)
        return result
    }, {} as any)
}

export function computedState(store: any, prop: string) {
    return computed(() => store.state[prop])
}

export function computedNamespacedState(
    store: any,
    namespace: string,
    prop: string
) {
    const module = namespace
        .split("/")
        .reduce((module, key) => module[key], store.state)
    return computed(() => module[prop])
}

export function computedGetter<T = any>(store: any, prop: string) {
    return computed<T>(() => store.getters[prop])
}

export function getMutation(
    store: any,
    mutation: string,
    ...args: any
): Function {
    return function () {
        return store.commit.apply(store, [mutation, ...args])
    }
}

export function getAction(store: any, action: string, ...args: any): Function {
    return function () {
        return store.dispatch.apply(store, [action, ...args])
    }
}

export function useMapping<T>(
    store: any,
    cb: Function,
    mapOrNamespace: KnownKeys<T>[] | Array<string> | string,
    _map?: KnownKeys<T>[] | Array<string>
) {
    if (_map && typeof mapOrNamespace !== "string") {
        throw new Error("Namespace is not a string")
    }

    const namespace = typeof mapOrNamespace === "string" ? mapOrNamespace : null
    const map = (namespace ? _map : mapOrNamespace) || []

    return useFromArray(store, namespace, map as Array<string>, cb)
}

const namespaceFilter = (key: string, namespace?: string) =>
    namespace ? key.includes(`${namespace}/`) : !key.includes("/")

const nameWithoutNamespace = (name: string) => name.replace(/.+\/(.+)/g, "$1")

export function getState<T>(store: any, namespace?: string): RefTypes<T> {
    const module = namespace ? store.state[namespace] : store.state
    return Object.keys(module).reduce(
        (state, key) => ({ ...state, [key]: computed(() => module[key]) }),
        {} as any
    )
}

export function getGetters<T>(store: any, namespace?: string) {
    return Object.keys(store.getters)
        .filter((key) => namespaceFilter(key, namespace))
        .reduce(
            (getters, key) => ({
                ...getters,
                [nameWithoutNamespace(key)]: computed(() => store.getters[key]),
            }),
            {} as any
        )
}

export function getMutations<T>(store: any, namespace?: string) {
    return Object.keys(store._mutations)
        .filter((mutation) => namespaceFilter(mutation, namespace))
        .reduce(
            (mutations, mutation) => ({
                ...mutations,
                [nameWithoutNamespace(mutation)]: (...args: any) =>
                    store.commit.apply(store, [mutation, ...args]),
            }),
            {} as any
        )
}

export function getActions<T>(store: any, namespace?: string) {
    return Object.keys(store._actions)
        .filter((action) => namespaceFilter(action, namespace))
        .reduce(
            (actions, action) => ({
                ...actions,
                [nameWithoutNamespace(action)]: (...args: any) =>
                    store.dispatch.apply(store, [action, ...args]),
            }),
            {} as any
        )
}
