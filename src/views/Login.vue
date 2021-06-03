<script>
import { useActions, useGetters } from "@/composables/vuex-helpers"
import useToast from "@/composables/useToast"

const toast = useToast()
export default {
    name: "Login",

    setup() {
        const { isAuthenticated } = useGetters()
        const { signIn } = useActions()

        return { signIn, isAuthenticated }
    },

    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async submit() {
            const { email, password } = this
            if (email && password) {
                try {
                    await this.signIn({ email, password })
                    if (this.isAuthenticated) {
                        await this.$router.push("/")
                        window.open("/", "_blank")
                    }
                } catch (e) {
                    console.error(e)
                    toast.error("Error")
                }
            }
        },
    },
}
</script>

<template>
    <div
        uk-img
        :data-src="require('@/assets/images/cover.jpg')"
        class="
            uk-flex
            uk-flex-center
            uk-flex-middle
            uk-background-cover
            uk-width-1-1
            uk-height-1-1
        "
    >
        <div
            class="
                container
                uk-card
                uk-card-default
                uk-flex
                uk-flex-column
                uk-width-large
                uk-flex-middle
                uk-animation-fade
                uk-card-body
                uk-position-relative
            "
        >
            <transition-group
                name="fade-move"
                tag="div"
                class="
                    group
                    uk-flex
                    uk-flex-column
                    uk-flex-center
                    uk-flex-middle
                    uk-width-1-1
                    uk-child-width-1-1
                "
            >
                <h3 :key="'title'" class="uk-card-title uk-text-center">
                    Login
                </h3>
                <div :key="'email'">
                    <input
                        class="uk-input"
                        placeholder="Email"
                        name="email"
                        type="email"
                        v-model.trim="email"
                        @keydown.enter="submit"
                    />
                </div>
                <div :key="'password'">
                    <input
                        class="uk-input"
                        placeholder="Password"
                        name="password"
                        type="password"
                        v-model.trim="password"
                        @keydown.enter="submit"
                    />
                </div>
                <button
                    :key="'button'"
                    class="uk-button uk-button-secondary"
                    @click="submit"
                >
                    Login
                </button>
            </transition-group>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/variables";
.container {
    background-color: white;

    input {
        margin-bottom: 20px;
    }
}
</style>
