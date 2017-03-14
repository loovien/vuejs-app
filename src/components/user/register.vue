<template>
    <div>
        <h1>注册</h1>
        <hr/>
        姓名: <input type="text" v-model="register.name"> <br>
        手机: <input type="text" v-model="register.mobile"><button @click="captcha()">获取验证码</button> <br>
        验证码: <input type="text" v-model="register.code"> <br>
        密码: <input type="password" v-model="register.password">

        <input type="submit" @click="doReg()">
    </div>
</template>

<script>
    import UserSrv from "../../service/userSrv";
    export default {
        data: () => {
            return {
                register: {
                    name: "",
                    mobile: "",
                    password: "",
                    code: "",
                }
            };
        },
        methods: {
            captcha: function () {
                let mobile = this.register.mobile;
                const userSrv = new UserSrv(this);
                userSrv.captcha(mobile).then((resp) => {
                    alert(resp.data.msg);
                });
            },
            doReg: function () {
                let credentials = this.register;
                const userSrv = new UserSrv(this);
                userSrv.register(credentials).then((resp) => {
                    alert(resp.data.msg);
                    console.log(this.$router, 'roo');
                    if(resp.data.code == 0) {
                    }
                });
            }

        }
    }
</script>