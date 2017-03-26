<template>
    <div class="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">忘记密码</h1>
        </header>
        <div class="login">
            <form action="" class="form">
                <div class="input-box">
                    <span class="iconfont icon-iphone input-icon"></span>
                    <input type="text" placeholder="手机号" v-model="credentials.mobile" class="ui-input">
                </div>
                <div class="input-box">
                    <span class="iconfont icon-Password input-icon"></span>
                    <input type="password" placeholder="密码" v-model="credentials.password" class="ui-input">
                </div>
                <span v-show="error.msg">{{error.msg}}</span>
            </form>
            <div class="btn-box">
                <button @click="nextStep()" class="btn">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>
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
            nextStep: () => {
                this.$http.post("/resetpwd", this.credentials, (resp) => {
                    console.log(resp);
                }).error((error) => {
                    this.error.msg = error.msg;
                });
            }
        }
    }
</script>

<style scope>
    .login {
        box-shadow: wheat 3px 0 0;
    }
</style>
