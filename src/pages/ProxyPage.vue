<template>
    <div class="wrap">
        <Header title="Proxy" icon="fa-server" :quota="{ name: 'Proxy', max: quota.proxys, current: proxyList.length }"></Header>
        <div class="container">
            <div class="top">
                <h2 class="category">Personal ({{ proxyList.length }})</h2>
                <button class="add-btn" v-if="proxyList.length < quota.proxys">Add Proxy</button>
            </div>
            
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

<style lang="scss">
.wrap {
    width: 100%;
    .container {
        max-width: 1200px;
        width: 100%;
        padding: 24px 48px;
        margin: 0 auto;
    }
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }
    .category {
        font-size: 16px;
        font-weight: 500;
        color: var(--card-sec-text);
        border-radius: 100px;
    }
    .add-btn {
        font-size: 14px;
        border-radius: 24px;
        border: none;
        background: var(--btn-bkg-main);
        color: var(--btn-text-main);
        padding: 8px 16px;
        cursor: pointer;
    }
    .proxy-item {
        margin-bottom: 16px;
        padding: 24px;
        background: var(--card-sec-bkg);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        border-radius: 16px;
        .name {
            font-size: 20px;
            font-weight: 500;
            color: var(--card-sec-text);
            cursor: pointer;
        }
        .time {
            font-size: 16px;
            margin-top: 8px;
            color: var(--card-third-dark-text);
            span {
                font-size: 14px;
            }
        }
    }
}
</style>
