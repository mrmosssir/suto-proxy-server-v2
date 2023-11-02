<template>
    <div id="app" class="app">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
    import { inject } from "vue";
    import { useRouter, RouterView } from "vue-router"
    import { useUserStore } from "@/store";
    import { onAuthStateChanged } from "firebase/auth";

    const router = useRouter();

    const { SET_TOKEN, logout } = useUserStore();

    const auth: any = inject("$auth");

    onAuthStateChanged(auth, (user: any) => {
        if (!user) return;
        if (!user.emailVerified) {
            alert("Please verify your email address to continue.");
            router.push("/login");
            logout();
        }
    });

    const init = () => {
        const token = localStorage.getItem("token");
        if (!!token) SET_TOKEN(token);
    }

    init();

</script>

<style lang="scss">

</style>
