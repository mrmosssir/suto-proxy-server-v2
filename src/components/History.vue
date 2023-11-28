<template>
    <div class="history">
        <h2 class="history-title">
            <icon class="icon" icon="fa-solid fa-clock-rotate-left"></icon>
            History
        </h2>
        <div class="history-tab">
            <div class="history-tab-item active">Request</div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
.history {
    height: 100vh;
    width: 24rem;
    background: var(--sec-bkg);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    padding: 2rem;
    &-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--main-text);
        .icon {
            font-size: 1.25rem;
            color: var(--sec-text);
        }
    }
    &-tab {
        display: flex;
        background: var(--tab-bkg-main);
        border-radius: 1rem;
        padding: 1rem 0.75rem;
        margin-top: 2.5rem;
        &-item {
            flex: 1;
            font-weight: 500;
            font-size: 0.9rem;
            text-align: center;
            color: var(--tab-text-main);
            border-radius: 0.75rem;
            padding: 0.25rem 0.25rem 0.5rem 0.25rem;
            cursor: pointer;
            &.active {
                color: var(--tab-text-active);
                background: var(--tab-bkg-active);
            }
        }
    }
}
</style>