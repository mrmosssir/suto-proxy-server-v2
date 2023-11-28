<template>
    <div class="main-layout">
        <SideBar />
        <RouterView />
    </div>
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
    import SideBar from "@/components/SideBar.vue";
</script>

<style lang="scss">
.main-layout {
    display: flex;
}
</style>
