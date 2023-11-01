import { defineStore } from "pinia";
import { reactive, ref, computed, inject } from "vue";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { sha256 } from "js-sha256";

export const useUserStore = defineStore("user", () => {

    type User = {
        name: string,
        email: string,
    }

    const auth: any = inject("$auth");

    // state
    const token = ref<string>("");
    const user = reactive<User>({ name: "", email: "" });
    
    // getters
    const isLogin = computed(() => !!token.value);

    // mutations
    const SET_TOKEN = (val: string) => token.value = val;

    const SET_USER = (data: User) => {
        user.name = data.name;
        user.email = data.email;
    };

    // actions
    const login = async (email: string, password: string) => {
        try {
            const user: any = await signInWithEmailAndPassword(auth, email, sha256(password));
            SET_TOKEN(user.idToken);
            SET_USER(user);
        } catch (error) {
            console.log(error);
            alert("unknown error, please contact customer service.");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            SET_TOKEN("");
        } catch (error) {
            console.log(error);
            alert("unknown error, please contact customer service.");
        }
    }

    // package
    const state = { token, user };

    const getters = { isLogin };

    const mutations = { SET_TOKEN };

    const actions = { login, logout };


    return { ...state, ...getters, ...mutations, ...actions  };
});