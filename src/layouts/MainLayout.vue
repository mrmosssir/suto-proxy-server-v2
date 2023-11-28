<template>
    <div class="main-layout">
        <SideBar />
        <RouterView />
        <History />
    </div>
</template>

<script setup lang="ts">
    import { RouterView } from "vue-router";
    import SideBar from "@/components/SideBar.vue";
    import History from "@/components/History.vue";
</script>

<style lang="scss">
.main-layout {
    display: flex;
}
</style>
