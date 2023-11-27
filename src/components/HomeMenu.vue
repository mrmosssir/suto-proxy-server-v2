<template>
    <div class="home-menu">
        <h2 class="home-menu-title">Sutoroxy.com</h2>
        <div class="home-menu-list">
            <router-link class="home-menu-item" to="/">
                <icon class="icon" icon="fa-solid fa-house-chimney"></icon>
                <span class="home-menu-content">Home</span>
            </router-link>
            <router-link class="home-menu-item" to="/proxy">
                <icon class="icon" icon="fa-solid fa-server"></icon>
                <span class="home-menu-content">Proxys</span>
            </router-link>
        </div>
    </div>   
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
    .home-menu {
        width: 268px;
        height: 100vh;
        &-title {
            color: rgba(0, 0, 0, 0.5);
            font-size: 1.25rem;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-weight: 500;
            margin: 24px 0 24px 16px;
        }
        &-list {
            padding: 8px;
        }
        &-item {
            display: flex;
            align-items: center;
            gap: 24px;
            border-radius: 4px;
            padding: 12px 12px 12px 16px;
            transition: all 0.5s;
            margin-bottom: 8px;
            cursor: pointer;
            &:hover {
                background: rgba(0, 0, 0, 0.05);
            }
        }
        &-content {
            font-weight: 600;
            color: rgba(0, 0, 0 ,0.6);
        }
    }
</style>