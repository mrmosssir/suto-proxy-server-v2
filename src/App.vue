<template>
    <div id="app" class="app">
        <RouterView />
    </div>
</template>

<script setup lang="ts">
    
    import { useRouter, RouterView } from "vue-router"
    import { useUserStore } from "@/store";
    // import { onAuthStateChanged } from "firebase/auth";

    type User = {
        displayName: string,
        email: string,
        uid: string
    }

    const router = useRouter();

    const { SET_TOKEN, SET_USER } = useUserStore();

    // const auth: any = inject("$auth");

    // onAuthStateChanged(auth, (user: any) => {
    //     if (!user) return;
    //     if (!user.emailVerified) {
    //         alert("Please verify your email address to continue.");
    //         router.push("/login");
    //         logout();
    //     }
    // });

    const init = () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if (!!userStr) {
            const user: User = JSON.parse(userStr);
            SET_USER({ email: user.email, displayName: user.displayName, uid: user.uid });
        }
        if (!!token) SET_TOKEN(token);
    }

    init();

</script>

<style lang="scss">

</style>
