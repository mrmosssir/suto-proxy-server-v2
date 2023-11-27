<template>
    <div class="header">
        <div class="title">
            <icon class="icon" :icon="`fa-solid ${props.icon}`"></icon>
            <h2>{{ props.title }}</h2>
        </div>
        <div class="quota">
            {{ `${props.quota.name} : 0 / ${props.quota.value}` }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

interface Props {
    title: string,
    quota: {
        name: string,
        value?: number
    },
    icon: string
};

const props = withDefaults(defineProps<Props>(), {
    title: "",
    quota: () => ({ name: "", value: 0 }),
    icon: "",
});

</script>

<style lang="scss" scoped>
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
        padding: 24px 48px;
        .title {
            display: flex;
            align-items: center;
            .icon {
                font-size: 18px;
                margin-right: 16px;
            }
            h2 {
                font-size: 18px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.6);
            }
        }
        .quota {
            background: rgba(0, 0, 0, 0.12);
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            border-radius: 4px;
            padding: 8px 24px;
            transition: all 0.3s;
            cursor: default;
            &:hover {
                background: rgba(0, 0, 0, 0.14)
            }
        }
    }
</style>
