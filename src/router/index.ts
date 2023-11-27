import { createRouter, createWebHistory } from "vue-router";

import AccountLayout from "@/layouts/AccountLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import VerifyPage from "@/pages/VerifyPage.vue";
import ProxyPage from "@/pages/ProxyPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: MainLayout,
            children: [
                {
                    path: "/",
                    component: HomePage
                },
                {
                    path: "/proxy",
                    component: ProxyPage
                }
            ],
        },
        {
            path: "/",
            name: "account",
            component: AccountLayout,
            children: [
                {
                    path: "login",
                    component: LoginPage
                },
                {
                    path: "register",
                    component: RegisterPage
                }
            ]
        },
        {
            path: "/verify",
            name: "verify",
            component: VerifyPage
        }
    ]
})

export default router
