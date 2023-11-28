<template>
    <div class="account-layout">
        <div class="container">
            <RouterLink to="/">
                <img class="logo" src="@/assets/logo.svg" alt="logo">
            </RouterLink>
            <h1 class="title">Sutoroxy<span>.com</span></h1>
            <div class="content">
                <RouterView />
            </div>
            <p class="tips">© 2023 Sutoroxy.com. All rights reserved.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<style lang="scss">
    .account-layout {
        min-height: 100vh;
        background: rgba(0, 0, 0, 0.1);
        .container {
            max-width: 450px;
            text-align: center;
            margin: 0 auto;
            padding: 84px 12px;
        }
        .logo {
            width: 48px;
        }
        .title {
            font-size: 48px;
            color: #DA7274;
            margin-bottom: 32px;
            span {
                color: #333333;
            }
        }
        .content {
            width: 100%;
            background: #FFFFFF;
            border: 1px solid rgba(0,0,0,.12);
            border-radius: 4px;
            padding: 24px;
        }
        .tips {
            font-size: 14px;
            color: #666666;
            margin-top: 32px;
        }
    }
</style>