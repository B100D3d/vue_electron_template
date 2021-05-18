<script>
import mainRoutes from "@/router/main-routes"

export default {
    name: "Home",
    components: {},

    setup() {
        return { mainRoutes }
    },
}
</script>

<template>
    <div class="home uk-width-1-1 uk-height-1-1 uk-flex">
        <nav class="uk-height-1-1 uk-padding-small">
            <ul class="uk-list">
                <li v-for="route of mainRoutes" :key="route.name">
                    <router-link :to="{ name: route.name }">{{
                        route.meta.title
                    }}</router-link>
                </li>
            </ul>
        </nav>
        <div class="uk-flex-1 uk-padding-large uk-position-relative">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home {
    nav {
        width: 200px;
    }
}
</style>
