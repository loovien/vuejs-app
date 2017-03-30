<template>
    <h1>
        活动页面展示, 分享就是分享此页面页面
        <button @click="letsPlay()">我也要玩</button>
    </h1>
</template>

<script>
    import ActSrv from "../../../service/actSrv";
    import AuthUtil from "../../../utils/authUtil";

    export default {
        data() {
            return {
                actSrv: {},
                query: {}, // address params
                openid: '', // current user openid
                actInfo: { // activity information

                },
                userInfo: { // 用户相关数据, 完成多少了等等,

                },
                rank: [] // 排行榜数据
            }
        },
        created() {
            const query = this.$route.params;
            const actSrv = new ActSrv(this);
            this.query = query;
            this.actSrv = actSrv;

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
            /* 我也要玩 */
            letsPlay() {
                // 检测是否已经参与, 参与直接跳转, 没有参与需要填写名字手机等信息
                const actId = this.query.actId;
                const authUtil = new AuthUtil(this.$http);
                const openid = authUtil.getOpenId(); // 获取当前用户openid

                /* 用户如果参与了, 直接显示用户的昵称, 和电话 */
                this.actSrv.letsPlay({actId, openid}).then((resp) => {
                });
            },
            /* 弹框填入姓名 */
            fillName() {
                const actId = this.query.actId;
                const openid = this.openid;
                const actOpenId = this.query.openid;
                const name = "用户输入名称";
                /* 成功条到输入电话弹框 */
                this.actSrv.fillName({actId, openid, name, actOpenId}).then((resp) => {

                });
            },

            /* 弹框填入电话 */
            fillPhone() {
                const actId = this.actInfo.act_id;
                const openid = this.openid;
                const phone = "用户输入电话";
                const actOpenId = this.query.openid;
                this.actSrv.fillPhone({actId, openid, phone, actOpenId}).then((resp) => {
                   // 成功跳转到自己的活动也面了
                    this.$router.push({name: 'template1Shared', params: {actId, openid}});
                });
            }
        }
    }
</script>