<template>
    <div class="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">用户绑定</h1>
        </header>
        <div class="login">
            <form action="">
                <div class="form-inputBox">
                    <div class="input-box">
                        <span class="iconfont icon-Password input-icon"></span>
                        <input type="text" placeholder="姓名" v-model="bindinfo.name" class="ui-input">
                    </div>
                    <div class="input-box">
                        <span class="iconfont icon-iphone input-icon"></span>
                        <input type="text" placeholder="手机号" v-model="bindinfo.mobile" class="ui-input">
                    </div>
                    <div class="input-box input-box-verifyCode">
                        <span class="iconfont icon-ad80-copy input-icon"></span>
                        <button class="color_yellow2 fr b-l-1 verifyCode-btn" @click="captcha()">获取验证码</button>
                        <input type="text" placeholder="验证码" v-model="bindinfo.verifyCode" class="ui-input">
                    </div>
                    <div class="input-box">
                        <span class="iconfont icon-Password input-icon"></span>
                        <input type="password" placeholder="密码" v-model="bindinfo.password" class="ui-input">
                    </div>
                </div>
                <div class="btn-box">
                    <button @click="bindmobile()" class="btn" disabled>提交</button>
                </div>
            </form>
            <div class="errorTips" v-show="error.msg">{{error.msg}}</div>
        </div>
    </div>
</template>

<script>
    import UserSrv from "../../service/userSrv";
    import AuthUtil from "../../utils/authUtil";
    export default {
        data: () => {
            return {
                bindinfo: {
                    name: "",
                    mobile: "",
                    password: "",
                    code: "",
                },
                error: {
                    msg: "验证码错误"
                }
            };
        },
        methods: {
            captcha: function () {
                let mobile = this.bindinfo.mobile;
                const userSrv = new UserSrv(this);
                userSrv.captcha(mobile).then((resp) => {
                    alert(resp.data.msg);
                    this.bindinfo.code = resp.data.data.code;
                });
            },
            bindmobile: function () {
                let credentials = this.bindinfo;
                const userSrv = new UserSrv(this);
                const authUtil = new AuthUtil(this.$http);
                userSrv.bindmobile(credentials).then((resp) => {
                    const respData = resp.data;
                    alert(respData.msg)
                    if(respData.code == 0) {
                        authUtil.setMobile(respData.data.mobile);
                        authUtil.setName(respData.data.name);
                        authUtil.setExpiredDays(respData.data.expiredDays);
                        this.$router.push({name: "mineIndex"});
                    }
                });
            }

        }
    }
</script>