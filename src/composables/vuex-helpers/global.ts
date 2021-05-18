import {
    ExtractGetterTypes,
    ExtractTypes,
    RefTypes,
    getState,
    getGetters,
    getActions,
    getMutations,
} from "./util"
import store from "@/store"

export function useState<TState = any>(namespace?: string): RefTypes<TState> {
    return getState(store, namespace)
}

export function useGetters<TGetters = any>(
    namespace?: string
): ExtractGetterTypes<TGetters> {
    return getGetters(store, namespace)
}

export function useMutations<TMutations = any>(
    namespace?: string
): ExtractTypes<TMutations, Function> {
    return getMutations(store, namespace)
}

export function useActions<TActions = any>(
    namespace?: string
): ExtractTypes<TActions, Function> {
    return getActions(store, namespace)
}
