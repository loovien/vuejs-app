<template>
    <div class="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">忘记密码</h1>
        </header>
        <div class="login">
            <form onsubmit="return false;">
                <div class="input-box form-inputBox">
                    <span class="iconfont icon-Password input-icon"></span>
                    <input type="password" placeholder="输入新密码" v-model="password" class="ui-input">
                </div>
                <div class="btn-box">
                    <button @click="nextStep()" class="btn" >确定修改</button>
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
                password: "",
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
            nextStep() {
                const password = this.password;
                this.userSrv.resetpwd({password}).then((resp) => {
                    if(resp.data.code === 0) {
                        this.$router.push({
                            name: "userLogin"
                        });
                    }  else {
                        this.error.msg = resp.data.msg;
                    }
                });
            }
        }
    }
</script>

<style scope>

</style>
