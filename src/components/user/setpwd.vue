<template>
    <div class="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">忘记密码</h1>
        </header>
        <div class="login">
            <form action="">
                <div class="input-box form-inputBox">
                    <span class="iconfont icon-Password input-icon"></span>
                    <input type="password" placeholder="输入新密码" v-model="credentials.password" class="ui-input">
                </div>
                <div class="btn-box">
                    <button @click="nextStep()" class="btn" disabled>确定修改</button>
                </div>
            </form>
            <div class="errorTips" v-show="error.msg">{{error.msg}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                credentials: {
                    password: "",
                },
                error: {
                    msg: "请输入密码"
                }
            }
        },
        methods: {
            goback: function(){
                history.go(-1)
            },
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

</style>
