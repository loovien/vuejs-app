<!--suppress ALL -->
<template>
    <div class="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">登录</h1>
            <router-link :to="{name: 'userHelp'}" class="iconfont icon-service header-service"></router-link>
        </header>
        <div class="login">
            <form action="">
                <div class="form-inputBox">
                    <div class="input-box">
                        <span class="iconfont icon-iphone input-icon"></span>
                        <input type="text" placeholder="手机号" v-model="credentials.mobile" class="ui-input">
                    </div>
                    <div class="input-box">
                        <span class="iconfont icon-Password input-icon"></span>
                        <input type="password" placeholder="密码" v-model="credentials.password" class="ui-input">
                    </div>
                </div>
                <div class="btn-box">
                    <button @click="submit()" class="btn">登录</button>
                </div>
            </form>
            <div class="errorTips" v-show="error.msg">{{error.msg}}</div>
            <p class="text-center">
                <router-link :to="{name: 'userBindmobile'}" class="registerBtn f12">注册商家恋</router-link>
                <router-link :to="{name: 'userResetpwd'}" class="color_gray resetpwdBtn f12">忘记密码</router-link>
            </p>
        </div>
        <div class="bottom">
            <img src="/static/images/logo.jpg" alt="我要联赢" class="logo">
            <p class="text-center color_666 f12"><span class="iconfont icon-phone"></span>400-6728-266</p>
        </div>
    </div>
</template>

<script>
    import UserSrv from "../../service/userSrv";
    import AuthUtil from "../../utils/authUtil";
    export default {
        data: () => {
            return {
                credentials: {
                    mobile: "",
                    password: ""
                },
                error: {
                    msg: ""
                }
            }
        },
        methods: {
            submit: function () {
                let redirectUrl = this.$route.query.redirect;
                const userSrv = new UserSrv(this);
                userSrv.login(this.credentials).then((resp) => {
                    if(resp.data.code == 0) {
                        const authUtil = new AuthUtil(this);
                        const mobile = resp.data.data.mobile;
                        const name = resp.data.data.name;
                        const expiredDays = resp.data.data.expiredDays;

                        authUtil.setName(name);
                        authUtil.setMobile(mobile);
                        authUtil.setExpiredDays(expiredDays);
                        this.$router.push({path: redirectUrl});

                    } else  {
                        this.error.msg = resp.data.msg;
                    }

                });
            }
        }
    }
</script>

<style scope>
.login {
    padding: 10px;
}
.bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding-bottom: 20px;
}
.icon-phone{
    color: #12abcc;
}
.logo{
    margin: 0 auto;
    display: inline-block;
    width: 98px; height: auto;
    display: block;
}
.registerBtn{
    color: #e8a70a;
    border-right: 1px solid #c5c5c5;
    padding-right: 15px;
}
.resetpwdBtn{
    padding-left: 15px;
}
.btn-box{
    padding: 20px 0;
}

</style>
