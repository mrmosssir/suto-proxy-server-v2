<template>
    <nav class="sidebar">
        <div class="sidebar-item top">
            <RouterLink to="/">
                <img class="sidebar-logo" src="../assets/logo.svg" alt="">
            </RouterLink>
        </div>
        <div class="sidebar-item">
            <RouterLink to="/proxy">
                <span class="sidebar-name">{{ name }}</span>
            </RouterLink>
        </div>
        <div class="sidebar-item bottom">
            <button class="sidebar-icon" @click="onLogout">
                <icon icon="fa-solid fa-arrow-right-from-bracket"></icon>
            </button>
        </div>
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
