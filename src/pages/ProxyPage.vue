<template>
    <div class="proxy-page">
        <Header title="Proxy" icon="fa-server" :quota="{ name: 'Proxy', value: quota.proxys }"></Header>
        <div class="container">
            <h2 class="category">PERONAL ({{ proxyList.length }})</h2>
            <div v-for="item in (proxyList as Array<ProxyItem>)" class="proxy-item">
                <h3 class="name">{{ item.name }}</h3>
                <p class="time">created on <span>{{ item.created }}</span></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore, usePlanStore, useProxyStore } from '@/store';

import { type ProxyItem } from "@/types/Proxy";

import Header from "@/components/Header.vue";

const { getQuota } = usePlanStore();
const { getProxyList } = useProxyStore();

const { user } = storeToRefs(useUserStore());
const { quota } = storeToRefs(usePlanStore());
const { proxyList } = storeToRefs(useProxyStore());

if (!quota.value.level) getQuota(user.value.uid);
if (!proxyList.value.length) getProxyList(user.value.uid);

</script>

<style lang="scss" scoped>
.proxy-page {
    width: 100%;
    .container {
        max-width: 1200px;
        width: 100%;
        padding: 0 48px 24px 48px;
        margin: 0 auto;
    }
    .category {
        margin-top: 24px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
    }
    .proxy-item {
        margin-top: 24px;
        padding: 24px;
        border: 0.5px solid rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        .name {
            font-size: 20px;
            font-weight: 500;
            color: #7163ba;
            cursor: pointer;
        }
        .time {
            font-size: 16px;
            margin-top: 8px;
            color: rgba(0, 0, 0, 0.5);
            span {
                font-size: 14px;
            }
        }
    }
}
</style>
