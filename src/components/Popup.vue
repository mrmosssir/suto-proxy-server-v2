<template>
    <div class="popup">
        <div class="popup-mask"></div>
        <div class="popup-content">
            <button class="popup-close">
                <icon class="icon" icon="fa-solid fa-xmark"></icon>
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped></style>
