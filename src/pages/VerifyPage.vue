<template>
    <div class="container">
        <div class="card">
            <h1 class="card-title">{{ verifyTitle }}</h1>
            <p class="card-message">{{ verifyMessage }}</p>
            <RouterLink class="card-link" to="/login">{{ status ? "Sign In" : "Back" }}</RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { applyActionCode } from "firebase/auth";

import { request } from "@/utils/request";

const route = useRoute();
const query = route.query;

const mode = query.mode;
const actionCode = query.oobCode;
const continueUrl = query.continueUrl;
const lang = query.lang;

const name = ref("");
const verifyTitle = ref("");
const verifyMessage = ref("");
const status = ref(false);

const auth: any = inject("$auth");

const handleVerifyEmail = async (auth: any, actionCode: string, continueUrl: string, lang: string) => {
    applyActionCode(auth, actionCode).then( async (response: any) => {
        const { code, message } = await request({ method: "post", url: `${import.meta.env.VITE_API_BASE_URL}/init`, data: { uid: auth.currentUser.uid } })
        if (code !== 0) {
            verifyTitle.value = "ERROR";
            verifyMessage.value = message;
            return;
        }
        verifyTitle.value = "Email Verified Success";
        verifyMessage.value = `Your Emailhas been verified. Please click the button below to login.`;
        status.value = true;
    }).catch((error) => {
        verifyTitle.value = "ERROR";
        verifyMessage.value = "Verify data not found.";
        console.log(error);
    });
}

switch (mode) {
    case "verifyEmail":
        handleVerifyEmail(auth, String(actionCode), String(continueUrl), String(lang));
        break;
    default:
        verifyTitle.value = "ERROR";
        verifyMessage.value = "Verify data not found.";
        break;
}

</script>

<style lang="scss" scoped>
    .container {
        height: 100vh;
        background: #F3F2F4;
        position: relative;
        .card {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 480px;
            background: radial-gradient(98.37% 110.3% at 50% 3.66%, #7062b9 20.19%, #54469c 91.91%, #524696 100%);
            border-radius: 24px;
            color: #FFFFFF;
            box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.25);
            padding-top: 36px;
            padding-bottom: 72px;
            overflow: hidden;
            &-title {
                text-align: center;
                margin-top: 24px;
                font-size: 24px;
            }
            &-message {
                max-width: 360px;
                text-align: center;
                margin: 24px auto 0 auto;
                opacity: 0.6;
            }
            &-link {
                display: block;
                width: 150px;
                border: 1px solid #FFFFFF;
                border-radius: 8px;
                padding: 8px 24px;
                color: #FFFFFF;
                opacity: 0.6;
                text-align: center;
                margin: 24px auto 0 auto;
            }
            &::before, &::after {
                content: "";
                display: block;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: #FFFFFF;
                opacity: 0.2;
                position: absolute;
            }
            &::before {
                bottom: -10px;
                left: -10px;
            }
            &::after {
                top: -30px;
                right: -30px;
            }
        }
    }
</style>