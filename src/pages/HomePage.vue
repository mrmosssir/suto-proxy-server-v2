<template>
    <div class="home-page">
        <div class="container">
            <h1 class="title">
                <p>WELCOME TO</p>
                <span class="red">Sutoroxy</span>
                <span>.com</span>
            </h1>
            <p class="description">
                Sutoroxy simplifies API integration with its robust proxy solution. Enhance security, performance, and reliability effortlessly. Explore Sutoroxy API proxies for your project's success.
            </p>
            <p class="start">How does Sutoroxy.com works? Get started.</p>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.home-page {
    flex: 1;
    .container  {
        width: 960px;
        margin: 0 auto;
        padding: 48px;
    }
    .title {
        font-size: 14px;
        color: #666666;
        p {
            letter-spacing: 2px;
        }
        span {
            font-size: 48px;
            color: #333333;
            &.red {
                color: $primary;
            }   
        }
    }
    .description {
        width: 80%;
        line-height: 2;
        color: #666666;
        margin-top: 12px;
    }
    .start {
        color: $primary;
        margin-top: 12px;
    }
}
</style>