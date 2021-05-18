import { RefTypes, ExtractTypes, ExtractGetterTypes } from "./util"
import {
    useActions,
    useGetters,
    useMutations,
    useState,
} from "@/composables/vuex-helpers/global"

export function createNamespacedHelpers<
    TState = any,
    TGetters = any,
    TActions = any,
    TMutations = any
>(
    namespace?: string
): {
    useState: () => RefTypes<TState>
    useGetters: () => ExtractGetterTypes<TGetters>
    useMutations: () => ExtractTypes<TMutations, Function>
    useActions: () => ExtractTypes<TActions, Function>
} {
    if (!namespace) {
        throw new Error("Namespace is missing to provide namespaced helpers")
    }

    return {
        useState: () => useState(namespace),
        useGetters: () => useGetters(namespace),
        useMutations: () => useMutations(namespace),
        useActions: () => useActions(namespace),
    }
}
