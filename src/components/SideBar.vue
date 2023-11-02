<template>
    <nav class="side-bar">
        <RouterLink to="/">
            <img class="side-bar-logo" src="../assets/logo.svg" alt="">
        </RouterLink>
        <hr>
        <RouterLink to="/about">
            <span class="side-bar-profile">SUT</span>
        </RouterLink>
        <hr>
        <button class="side-bar-logout" @click="onLogout">
            <icon icon="fa-solid fa-arrow-right-from-bracket"></icon>
        </button>
    </nav>
</template>

<script setup lang="ts">

    import { useRouter, RouterLink } from "vue-router";
    import { useUserStore } from "@/store";

    const router = useRouter();

    const userStore = useUserStore();
    const { logout } = userStore;

    const onLogout = async () => {
        await logout();
        router.push("/login");
    }

</script>

<style scoped lang="scss">
    .side-bar {
        width: 72px;
        height: 100vh;
        background: $gray;
        text-align: center;
        padding: 12px;
        &-logo {
            display: block;
            width: 46px;
        }
        hr {
            width: 32px;
            border: 1px solid #C1BDC9;
            margin: 24px auto;
        }
        &-profile, &-logout {
            display: block;
            width: 48px;
            height: 48px;
            border: none;
            border-radius: 50%;
            background: $primary;
            color: #FFFFFF;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
    }
</style>