<template>
    <div>
        <h3>用户相关(登入, 注册...)</h3>
        <ul>
            <li><router-link :to="{name: 'userLogin'}">登入注册</router-link></li>
            <li><router-link :to="{name: 'userSetpwd'}">设置密码</router-link></li>
            <li><router-link :to="{name: 'userResetpwd'}">重置密码</router-link></li>
            <li><router-link :to="{name: 'userHelp'}">客服</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                msg: "user container"
            }
        }
    }
</script>