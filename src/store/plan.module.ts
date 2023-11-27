import { defineStore } from "pinia";
import { reactive } from "vue";

import { request } from "@/utils/request";

interface Quota { level: string, requests: number, proxys: number };

type QuotaMap = {
    requests: QuotaMapItem
    proxys: QuotaMapItem,
    
};

type QuotaMapItem = { name: string, unit?: string };

export const usePlanStore = defineStore("plan", () => {

    // state
    const quota: Quota = reactive({
        level: "",
        requests: 0,
        proxys: 0
    });

    // mutations
    const SET_QUOTA = (data: any) => {
        quota.level = data?.level ?? "";
        quota.proxys = data?.proxy_domain ?? 0;
        quota.requests = data?.request_per_day ?? 0;
    };

    // actions
    const getQuota = async (uid: string) => {
        try {
            const { data, code } = await request({ method: "get", url: `${import.meta.env.VITE_API_BASE_URL}/plan/${uid}` });
            if (code !== 0 ) return;
            SET_QUOTA(data);
        } catch (error) {
            console.log(error);
        }
    };

    // package
    const state = { quota };

    const getters = {};

    const mutations = { SET_QUOTA };

    const actions = { getQuota };


    return { ...state, ...getters, ...mutations, ...actions  };
});