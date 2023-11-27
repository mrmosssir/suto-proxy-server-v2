import { defineStore } from "pinia";
import { ref } from "vue";

import { request } from "@/utils/request";

export const useProxyStore = defineStore("proxy", () => {

    // state
    const proxyList = ref([]);

    // mutations
    const SET_PROXY_LIST = (list: any) => {
        proxyList.value = list;
    };

    // actions
    const getProxyList = async (uid: string) => {
        try {
            const { data, code, message } = await request({ method: "get", url: `${import.meta.env.VITE_API_BASE_URL}/proxy-list/${uid}` });
            if (code !== 0) {
                alert(message);
                return;
            }
            SET_PROXY_LIST(data);
        } catch (error: any) {
            console.log(error);
            if (error.code === "auth/email-already-in-use") {
                alert("Email alreay exists.");
            }
            alert("unknown error, please contact customer service.");
            return false;
        }
        
    };

    // package
    const state = { proxyList };

    const getters = {};

    const mutations = { SET_PROXY_LIST };

    const actions = { getProxyList };


    return { ...state, ...getters, ...mutations, ...actions  };
});