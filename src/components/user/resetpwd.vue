<template>
    <div class="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">忘记密码</h1>
        </header>
        <div class="login">
            <form onsubmit="return false;">
                <div class="form-inputBox">
                    <div class="input-box">
                        <span class="iconfont icon-iphone input-icon"></span>
                        <input type="text" placeholder="手机号" v-model="credentials.phone" class="ui-input">
                    </div>
                    <div class="input-box input-box-verifyCode">
                        <span class="iconfont icon-ad80-copy input-icon"></span>
                        <button class="color_yellow2 fr b-l-1 verifyCode-btn" @click="getCaptcha()">获取验证码</button>
                        <input type="text" placeholder="验证码" v-model="credentials.code" class="ui-input">
                    </div>
                </div>
                <div class="btn-box">
                    <button @click="nextStep()" class="btn">下一步</button>
                </div>
            </form>
            <div class="errorTips" v-show="error.msg">{{error.msg}}</div>
        </div>
    </div>
</template>

<script>
    import UserSrv from "../../service/userSrv";

    export default {
        data: () => {
            return {
                userSrv: {},
                credentials: {
                    phone: "",
                    code: ""
                },
                error: {
                    msg: ""
                }
            }
        },
        created: function () {
            this.userSrv = new UserSrv(this);
        },
        methods: {
            goback() {
                history.go(-1)
            },
            getCaptcha() {
                const phone = this.credentials.phone;
                this.userSrv.getPwdCaptcha({phone}).then((resp) => {
                    if(resp.data.code === 0) {
                        alert(resp.data.msg);
                        this.credentials.code = resp.data.data.code;
                    } else {
                        this.error.msg = resp.data.msg;
                    }
                });
            },
            nextStep () {
                const verifyData = this.credentials;
                this.userSrv.verifycode(verifyData).then((resp) => {
                    if(resp.data.code === 0) {
                        this.$router.push({
                            name: "userSetpwd"
                        })
                    } else {
                        this.error.msg = resp.data.msg;
                    }
                })
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
}
</style>
