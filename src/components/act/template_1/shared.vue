<template>
    <h1>活动页面展示, 分享就是分享此页面页面</h1>
</template>

<script>
    import ActSrv from "../../../service/actSrv";

    export default {
        data() {
            return {
                actInfo: { // 活动相关数据

                },
                userInfo: { // 用户相关数据, 完成多少了等等,

                },
                rank: [] // 排行榜数据
            }
        },
        created() {
            const query = this.$route.params;
            const actSrv = new ActSrv(this);
            actSrv.getActInfo(query).then((resp) => {
                console.log(resp);
            });

            actSrv.getUserInfo(query).then((resp) => {
                console.log(resp);
            });

            actSrv.getRank(query).then((resp) => {
                console.log(resp);
            });

            actSrv.helpIt(query).then((resp) => { // 用户已经来的时候, 表示已将帮忙了

            });

        },
        methods: {

        }
    }
</script>