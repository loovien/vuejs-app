<style scope>
    .login {
        box-shadow: wheat 3px 0 0;
    }
</style>
<template>
    <div>
        <div class="login">
            reset password
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
            submit: () => {
                this.$http.post("/resetpwd", this.credentials, (resp) => {
                    console.log(resp);
                }).error((error) => {
                    this.error.msg = error.msg;
                });
            }
        }
    }
</script>
