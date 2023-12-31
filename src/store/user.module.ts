import { defineStore } from "pinia";
import { reactive, ref, computed, inject } from "vue";
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { sha256 } from "js-sha256";

export const useUserStore = defineStore("user", () => {

    type User = {
        displayName: string,
        email: string,
        uid: string
    }

    const auth: any = inject("$auth");

    // state
    const token = ref<string>("");
    const isLogin = ref<boolean>(false);
    const user = reactive<User>({ displayName: "", email: "", uid: "" });

    // mutations
    const SET_TOKEN = (val: string) => {
        token.value = val;
        localStorage.setItem("token", val);
        if (val) isLogin.value = true;
    };

    const SET_USER = (data: User) => {
        user.displayName = data.displayName;
        user.email = data.email;
        user.uid = data.uid;
        localStorage.setItem("user", JSON.stringify(data));
    };

    // actions
    const login = async (email: string, password: string) => {
        try {
            const { user }: any = await signInWithEmailAndPassword(auth, email, sha256(password));
            if (!user.emailVerified) {
                alert("Please verify your email address.");
                return;
            }
            SET_TOKEN(user.accessToken);
            SET_USER(user);
            return;
        } catch (error) {
            console.log(error);
            alert("unknown error, please contact customer service.");
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            SET_TOKEN("");
            SET_USER({ displayName: "", email: "", uid: "" });
            isLogin.value = false;
            return;
        } catch (error) {
            console.log(error);
            alert("unknown error, please contact customer service.");
        }
    };

    const register = async (email: string, password: string, username: string) => {
        try {
            const response: any = await createUserWithEmailAndPassword(auth, email, sha256(password));
            const user = response.user;
            await updateProfile(user, { displayName: username });
            await sendEmailVerification(user);
            alert(`Verification email has been sent, please go to ${user.email} for authentication.`);
            return true;
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
    const state = { token, isLogin, user };

    const getters = {};

    const mutations = { SET_TOKEN, SET_USER };

    const actions = { login, logout, register };


    return { ...state, ...getters, ...mutations, ...actions  };
});