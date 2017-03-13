<template>
    <div>
        <h3>用户相关(登入, 注册...)</h3>
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