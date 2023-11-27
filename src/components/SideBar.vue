<template>
    <nav class="side-bar">
        <RouterLink to="/">
            <img class="side-bar-logo" src="../assets/logo.svg" alt="">
        </RouterLink>
        <hr>
        <RouterLink to="/proxy">
            <span class="side-bar-profile">{{ name }}</span>
        </RouterLink>
        <hr>
        <button class="side-bar-logout" @click="onLogout">
            <icon icon="fa-solid fa-arrow-right-from-bracket"></icon>
        </button>
    </nav>
</template>

<script setup lang="ts">

import { computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { storeToRefs } from "pinia";

import { useUserStore } from "@/store";

const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { logout } = userStore;

const name = computed(() => {
    const arr = user.value.displayName.split(" ");
    const cutArr = arr.map(item => {
        return `${item[0]}${item[1]}`;
    });
    return cutArr.join(" ");
});

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