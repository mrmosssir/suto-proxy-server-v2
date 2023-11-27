<template>
    <div class="quota-overview">
        <ul class="quota-overview-list">
            <li class="quota-overview-item" v-for="item in quotaKeyList">
                <strong class="quota-overview-title">{{ nameMapping[item as keyof QuotaMap]?.name }}</strong>
                <p class="quota-overview-content">
                    {{ quota[item as keyof Quota] }}
                    <template v-if="nameMapping[item as keyof QuotaMap]?.unit">
                        <span class="quota-overview-unit">{{ `/${nameMapping[item as keyof QuotaMap]?.unit}` }}</span>
                        <icon class="icon" icon="fa-solid fa-circle-info"></icon>
                    </template>
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useUserStore, usePlanStore } from "@/store";

import { type Quota, type QuotaMap } from "@/types/Quota";

const { getQuota } = usePlanStore();

const { user } = storeToRefs(useUserStore());
const { quota } = storeToRefs(usePlanStore());

const nameMapping: QuotaMap = {
    requests: { name: "REQUESTS", unit: "day" },
    proxys: { name: "PROXY SOURCES" },
}

const quotaKeyList = computed(() => {
    // level column not display
    return Object.keys(quota.value).filter(item => item !== "level");
});

if (!quota.value.level) getQuota(user.value.uid);

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
