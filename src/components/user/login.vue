<style scope>
    .login {
        box-shadow: wheat 3px 0 0;
    }
</style>
<template>
    <div>
        <div class="login">
            Username: <input type="text">
            <br/>
            password: <input type="text">
            <button @click="submit()">submit</button>
            <router-link :to="{name: 'userRegister'}">没有帐号?注册</router-link>
        </div>
    </div>
</template>

<script>
    import AuthSrv from "../../service/authSrv";
    export default {
        data: () => {
            return {
                credentials: {
                    username: "",
                    password: ""
                },
                error: {
                    msg: ""
                }
            }
        },
        methods: {
            submit: function () {
                const authSrv = new AuthSrv();
                isLoginSrv = authSrv.login(null, this.credentials).then((response) => {
                    console.log("login")
                })
            }
        }
    }
</script>
