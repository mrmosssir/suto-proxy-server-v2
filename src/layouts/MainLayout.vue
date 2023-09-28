<template>
    <div class="wrap">
        <div class="menu">
            <SideBar />
            <HomeMenu />
        </div>
        <RouterView />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HomeMenu from "@/components/HomeMenu.vue";
import SideBar from "@/components/SideBar.vue";
</script>

<style lang="scss">
.wrap {
    display: flex;
}
.menu {
    display: flex;
    max-width: 340px;
    background: #ECEFF1;
}
.icon {
    color: rgba(0, 0, 0, 0.5);
}
</style>
