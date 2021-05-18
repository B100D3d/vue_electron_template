<template>
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import UIkit from "uikit"
import Icons from "uikit/dist/js/uikit-icons"
UIkit.use(Icons)

import { ipcRenderer } from "electron"

export default {
    name: "App",
    async mounted() {
        console.log("mounted")
        const val = await ipcRenderer.invoke("sayHello")
        console.log({ val })
    },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap");

@import "./styles/variables";
@import "styles/light-theme";
@import "./styles/functions";
@import "./styles/animations";

@import "../node_modules/uikit/src/scss/variables-theme.scss";
@import "../node_modules/uikit/src/scss/mixins-theme.scss";
@import "../node_modules/uikit/src/scss/uikit-theme.scss";
@import "../node_modules/uikit/src/scss/variables.scss";

@import "./styles/globals";

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5rem;

    @media screen and (max-width: $screen-s) {
        font-size: 14px;
    }
}

#app {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    * {
        font-family: -apple-system, BlinkMacSystemFont, Roboto, serif;
    }
}
</style>
