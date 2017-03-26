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
                <div class="input-box input-box-verifyCode">
                    <span class="iconfont icon-ad80-copy input-icon"></span>
                    <button class="color_yellow2 fr verifyCode-btn">获取验证码</button>
                    <input type="password" placeholder="验证码" v-model="credentials.verifyCode" class="ui-input">
                </div>
            </form>
            <div class="errorTips" v-show="error.msg">{{error.msg}}</div>
            <div class="btn-box">
                <button @click="nextStep()" class="btn" disabled>下一步</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                credentials: {
                    mobile: "",
                    verifyCode: ""
                },
                error: {
                    msg: "验证码错误"
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
.input-box-verifyCode{
    padding-right: 90px!important;
}
.verifyCode-btn{
    width: 90px;
    text-align: center;
    margin: 10px -90px 0 0;
    line-height: 20px;
    height: 20px;
    border: none;
    background: none;
    border-left: 1px solid #b6b6b6;
}
</style>
