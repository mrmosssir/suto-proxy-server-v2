<template>
    <div class="login">
        <h2 class="login-title">Sign in</h2>
        <h3 class="login-description">Welcome to Sutoroxy.com</h3>
        <ul class="login-form">
            <li class="login-form-item">
                <label for="email">EMAIL</label>
                <input type="text" id="email" v-model="form.email" @input="validEmail" @keypress.enter="submit" />
                <span class="login-tips" v-if="tips.email">{{ tips.email }}</span>
            </li>
            <li class="login-form-item">
                <label for="password">PASSWORD</label>
                <input type="password" id="password" v-model="form.password" @input="validPassword" @keypress.enter="submit" />
                <span class="login-tips" v-if="tips.password">{{ tips.password }}</span>
            </li>
        </ul>
        <button class="login-submit" :disabled="!canSubmit" @click="submit">Sign In</button>
        <div class="flex">
            <p class="login-link">
                <router-link to="/">Forget Password ?</router-link>
            </p>
            <p class="login-link">
                Not on Sutoroxy yet ? 
                <router-link to="/register">Sign Up</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { computed, reactive } from "vue";
    import { useRouter } from "vue-router";
    import { storeToRefs } from "pinia";

    import { useUserStore } from "@/store";

    const form = reactive({ email: "", password: "" });
    const tips = reactive({ email: "", password: "" });
    const valid = reactive({ email: false, password: false });

    const userStore = useUserStore();
    const { isLogin } = storeToRefs(userStore);
    const { login } = userStore;

    const router = useRouter();

    const canSubmit = computed(() => {
        return valid.email && valid.password;
    });
    const validEmail = () => {
        const regex = /^\S+@\S+\.\S+$/;
        if (!form.email) tips.email = "Please enter your email.";
        else tips.email = regex.test(form.email) ? "" : "This email is not valid, please enter your email.";
        valid.email = !tips.email;
    };
    const validPassword = () => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!form.password) tips.password = "Please enter password.";
        else tips.password = regex.test(form.password) ? "" : "Password must be at least eight characters and contain letters and numbers.";
        valid.password = !tips.password;
    };

    const submit = async () => {
        if (!canSubmit.value) return;
        await login(form.email, form.password);
        if (isLogin.value) router.push("/");
    };

    const init = () => {
        if (isLogin.value) router.push("/");
    };

    init();

</script>

<style lang="scss" scoped>

    .login {
        .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        &-title {
            font-size: 20px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
        }
        &-description {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 8px;
        }
        &-submit {
            display: block;
            width: 100%;
            height: 44px;
            color: #FFFFFF;
            font-size: 16px;
            border-width: 0px;
            border-radius: 4px;
            background: #DA7274;
            margin-bottom: 8px;
            cursor: pointer;
            &:disabled {
                color: #999999;
                background: #DDDDDD;
                cursor: not-allowed;
            }
        }
        &-link {
            text-align: left;
            margin-bottom: 8px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            a, a:active {
                color: #DA7274;
            }
        }
        &-form {
            margin-top: 24px;
            &-item {
                margin-top: 16px;
                &:last-child {
                    margin-bottom: 16px;
                }
            }
            label {
                display: block;
                color: rgba(0, 0, 0, 0.6);
                text-align: left;
                font-weight: 500;
                font-size: 14px;
                margin-bottom: 4px;
                cursor: pointer;
            }
            input {
                display: block;
                width: 100%;
                height: 44px;
                font-size: 16px;
                color: rgba(0, 0, 0, 0.6);
                background: #EEEEEE;
                border-width: 0px;
                border-radius: 4px;
                padding: 0 12px;
                &:focus-visible {
                    border-width: 0;
                    outline-width: 0px;
                }
            }
        }
        &-tips {
            display: block;
            text-align: left;
            font-size: 12px;
            color: #DD2C00;
            margin-top: 8px;
        }
    }

</style>