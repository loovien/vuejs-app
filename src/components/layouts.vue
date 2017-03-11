<style>
    .title {
        background: pink;
    }
</style>
<template>
    <div>
        <h1> 首页信息 </h1>
        <h3> 活动集中展示 </h3>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                name: "luowen",
                age: 23
            }
        },
        methods: {
            show: (msg) => {
                alert(msg);
            }

        }
    }
</script>