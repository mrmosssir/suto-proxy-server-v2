<template>
    <ul class="quota-overview">
        <li class="quota-overview-item" v-for="item in quotaKeyList">
            <div class="quota-overview-icon">
                <icon :icon="`fa-solid ${nameMapping[item as keyof QuotaMap]?.icon}`"></icon>
            </div>
            <strong class="quota-overview-title">{{ nameMapping[item as keyof QuotaMap]?.name }}</strong>
            <p class="quota-overview-content">
                {{ quota[item as keyof Quota] }}
                <span class="quota-overview-unit" v-if="nameMapping[item as keyof QuotaMap]?.unit">
                    {{ nameMapping[item as keyof QuotaMap]?.unit }}
                </span>
                / {{ nameMapping[item as keyof QuotaMap]?.cycle }}
            </p>
            <Progress :percent="50"></Progress>
            <div class="quota-overview-bottom">
                <div class="quota-overview-rate">
                    0 / {{ quota[item as keyof Quota] }}
                </div>
                <div class="quota-overview-remain">
                    0 Remaing
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import Progress from "@/components/Progress.vue";

import { useUserStore, usePlanStore } from "@/store";

import { type Quota, type QuotaMap } from "@/types/Quota";

const { getQuota } = usePlanStore();

const { user } = storeToRefs(useUserStore());
const { quota } = storeToRefs(usePlanStore());

const nameMapping: QuotaMap = {
    requests: { name: "Requrets", unit: "record", cycle: "day", icon: "fa-share-from-square" },
    proxys: { name: "Proxy Sources", cycle: "total", icon: "fa-server" },
}

const quotaKeyList = computed(() => {
    // level column not display
    return Object.keys(quota.value).filter(item => item !== "level");
});

if (!quota.value.level) getQuota(user.value.uid);

</script>

<style lang="scss" scoped>
.quota-overview {
    width: 100%;
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    margin: 4rem 0 2rem 0;
    &-item {
        width: 16.25rem;
        background: var(--card-sec-bkg);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        border-radius: 1.25rem;
        text-align: center;
        position: relative;
        padding: 3rem 1.5rem 1.5rem 1.5rem;
    }
    &-icon {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1.25rem;
        font-size: 1.25rem;
        color: var(--card-main-text);
        background: var(--card-main-bkg);
        border-radius: 1.25rem;
    }
    &-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--card-sec-text)
    }
    &-content {
        font-size: 0.9rem;
        color: var(--card-third-dark-text);
        margin-top: 0.25rem;
    }
    &-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.25rem;
    }
    &-rate {
        font-size: 0.9rem;
        color: var(--card-third-dark-text);
    }
    &-remain {
        background: var(--badge-bkg-main);
        color: var(--badge-text-main);
        padding: 0.25rem 1rem 0.5rem 1rem;
        font-size: 0.9rem;
        font-weight: 500;
        border-radius: 5rem;
    }
    .icon {
        cursor: pointer;
    }
}
</style>
