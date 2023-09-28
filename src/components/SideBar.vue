<template>
    <nav class="side-bar">
        <RouterLink to="/">
            <img class="side-bar-logo" src="../assets/logo.svg" alt="">
        </RouterLink>
        <hr>
        <RouterLink to="/about">
            <span class="side-bar-profile">SUT</span>
        </RouterLink>
    </nav>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

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
        &-profile {
            display: block;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: $primary;
            color: #FFFFFF;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>