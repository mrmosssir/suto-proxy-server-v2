<template>
    <div class="quota-overview">
        <ul class="quota-overview-list">
            <li class="quota-overview-item" v-for="item in quotaKeyList">
                <strong class="quota-overview-title">{{ nameMapping[item as keyof QuotaMap].name }}</strong>
                <p class="quota-overview-content">
                    {{ quota[item as keyof Quota] }}
                    <template v-if="nameMapping[item as keyof QuotaMap].unit">
                        <span class="quota-overview-unit">{{ `/${nameMapping[item as keyof QuotaMap].unit}` }}</span>
                        <icon class="icon" icon="fa-solid fa-circle-info"></icon>
                    </template>
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { storeToRefs } from "pinia";
import { request } from "@/utils/request";

import { useUserStore } from "@/store";

interface Quota { proxyDomain: number, requests: number };

type QuotaMap = {
    proxyDomain: QuotaMapItem,
    requests: QuotaMapItem
};

type QuotaMapItem = { name: string, unit?: string };

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const nameMapping: QuotaMap = {
    requests: { name: "REQUESTS", unit: "day" },
    proxyDomain: { name: "PROXY SOURCES" },
}

const quota: Quota = reactive({
    requests: 0,
    proxyDomain: 0,
});

const quotaKeyList = computed(() => {
    return Object.keys(quota);
});

const getQuota = async (uid: string) => {
    try {
        const { data } = await request({ method: "get", url: `${import.meta.env.VITE_API_BASE_URL}/plan/${uid}` });
        quota.proxyDomain = data?.proxy_domain ?? 0;
        quota.requests = data?.request_per_day ?? 0;
    } catch (error) {
        console.log(error);
    }
}

getQuota(user.value.uid);

</script>

<style lang="scss" scoped>
.quota-overview {
    margin: 64px 0 48px 0;
    &-list {
        width: 100%;
        display: flex;
    }
    &-item {
        width: 25%;
    }
    &-title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
    }
    &-content {
        display: flex;
        align-items: flex-end;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        margin-top: 14px;
    }
    &-unit {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
        margin-left: 6px;
        margin-right: 6px;
    }
    .icon {
        cursor: pointer;
    }
}
</style>
