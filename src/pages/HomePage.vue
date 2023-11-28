<template>
    <div class="wrap">
        <h1 class="title">
            <p>Welcome</p>
            <strong>Dashboard</strong>
        </h1>
        <!-- <p class="description">
            Sutoroxy simplifies API integration with its robust proxy solution. Enhance security, performance, and reliability effortlessly. Explore Sutoroxy API proxies for your project's success.
        </p>
        <p class="start">How does Sutoroxy.com works? Get started.</p> -->
        <QuotaOverview />
    </div>
</template>

<script setup lang="ts">

    import { useRouter } from "vue-router";
    import { storeToRefs } from "pinia";
    import { useUserStore } from "@/store";

    import QuotaOverview from "@/components/QuotaOverview.vue";

    const router = useRouter();

    const userStore = useUserStore();
    const { isLogin } = storeToRefs(userStore);

    const init = () => {
        if (!isLogin.value) router.push("/login");
    };

    init();

</script>

<style lang="scss" scoped>
.wrap {
    .title {
        font-size: 0.75rem;
        color: var(--sec-text);
        p {
            letter-spacing: 0.1rem;
        }
        strong {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--main-text);
        }
    }
    .description {
        width: 80%;
        line-height: 2;
        color: #666666;
        margin-top: 12px;
    }
    .start {
        color: #DA7274;
        margin-top: 12px;
    }
    hr {
        border-width: thin 0 0;
        border-color: rgba(0, 0, 0, 0.12);
    }
}
</style>