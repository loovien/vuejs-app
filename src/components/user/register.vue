<template>
    <div>
        <h1>注册</h1>
        <hr/>
        姓名: <input type="text" v-model="register.name"> <br>
        手机: <input type="text" v-model="register.phone"> <br>
        验证码: <input type="text" v-model="register.code"> <br>

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
                    phone: "",
                    code: "",
                }
            };
        },
        methods: {
            doReg: function () {
                let credentials = this.register;
                const userSrv = new UserSrv(this);
                userSrv.register(credentials).then((resp) => {
                    console.log(resp)
                });
            }
        }
    }
</script>