<template>
    <div>
        <h1>用户绑定</h1>
        <hr/>
        姓名: <input type="text" v-model="bindinfo.name"> <br>
        手机: <input type="text" v-model="bindinfo.mobile"><button @click="captcha()">获取验证码</button> <br>
        验证码: <input type="text" v-model="bindinfo.code"> <br>
        密码: <input type="password" v-model="bindinfo.password">

        <input type="submit" @click="bindmobile()">
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