<template>
    <div id="app" class="app">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
    import { inject, onMounted, watchEffect } from "vue";
    import { RouterView } from "vue-router"
    import { useUserStore } from "@/store";
    import { onAuthStateChanged } from "firebase/auth";

    const { SET_TOKEN } = useUserStore();

    const auth: any = inject("$auth");
    onAuthStateChanged(auth, (user: any) => {
        console.log(user);
        if (!user) return;
        SET_TOKEN(user.accessToken);
    })

</script>

<style lang="scss">

</style>
