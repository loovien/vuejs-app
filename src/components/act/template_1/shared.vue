<template>
    <div class="layout">
        <!--<div class="topBar color_fff f16"><span class="color_yellow">78</span>人查看<span class="color_yellow pl10">394</span>人分享<span class="color_yellow pl10">16</span>人报名</div>-->
        <div class="relative">
            <img src="/static/images/template_1/banner-bg.jpg" alt="" class="banner-bg">
            <div class="banner">
                <h1 class="title">{{act.title}}</h1>
            </div>
            <div class="countDown-box color_fff text-center">
                <countDown :date="countDownTime"></countDown>
                <!--<p class="mt5"><span class="color_yellow">{{userInfo.name}}</span><span class="color_fff key">2016-11-01 12:15</span><span class="color_yellow">抽中奖品</span></p>-->
                <p class="mt5"><span class="color_yellow">{{userInfo.username}} 您有</span><span class="color_fff key">{{userInfo.join_cnt}}</span><span class="color_yellow">个朋友参与活动。</span></p>
            </div>
        </div>
        <div class="text-center playBtn-box">
            <img src="/static/images/template_1/play-btn.jpg" @click="letsPlay()" alt="点我去玩" class="playBtn">
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">活</span>
                <span class="word w1">动</span>
                <span class="word w2">奖</span>
                <span class="word w3">励</span>
            </h2>
            <div class="inner text-center">
                <p>总共<span class="red key">{{act.act_prize_cnt}}</span>{{act.act_prize_unit}} 最后<span class="red key">0</span>{{act.act_prize_unit}}</p>
                <!--<p>海澜之家<span class="red key">1000元</span>代金券</p>-->
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">活</span>
                <span class="word w1">动</span>
                <span class="word w2">介</span>
                <span class="word w3">绍</span>
            </h2>
            <div class="inner">
                <p>{{act.description}}</p>
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">参</span>
                <span class="word w1">与</span>
                <span class="word w2">规</span>
                <span class="word w3">则</span>
            </h2>
            <div class="inner">
                <p><span class="num">1</span>参与活动前，请详细阅读活动规则及相关条款。凡参与本次活动，则视为同意活动内容及免责声明条款。</p>
                <p><span class="num">2</span>如遇不可抗力因素，本次活动因故无法进行时，活动主办方在法律允许的范围内有权决定取消、终止、修改或暂停本活动。</p>
                <p><span class="num">3</span>请中奖用户按照活动提示提供正确的联系方式，若不正确导致无法收到奖品，活动主办方不予负责。</p>
                <p><span class="num">4</span>除质量问题外，本活动产品概不退货。</p>
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">奖</span>
                <span class="word w1">品</span>
                <span class="word w2">描</span>
                <span class="word w3">述</span>
            </h2>
            <div class="inner">
                {{act.act_prize_desc}}
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">领</span>
                <span class="word w1">奖</span>
                <span class="word w2">信</span>
                <span class="word w3">息</span>
            </h2>
            <div class="inner">
                <p>主办方: {{act.organizer_name}}</p>
                <p>主办地址: {{act.organizer_address}}</p>
                <p>主办电话: {{act.organizer_phone}} </p>
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">关</span>
                <span class="word w1">于</span>
                <span class="word w2">我</span>
                <span class="word w3">们</span>
            </h2>
            <div class="inner">{{act.about_us}}</div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">活</span>
                <span class="word w1">动</span>
                <span class="word w2">排</span>
                <span class="word w3">名</span>
            </h2>
            <div class="inner" v-show="rank.data.length ==0">
                <p class="text-center"><span class="iconfont icon-team"></span>活动暂时没人参与哦</p>
            </div>
            <div class="inner" v-show="rank.data.length > 0">
                <p class="text-center"><span class="iconfont icon-team"></span>共有<span class="red key">{{rank.total}}</span>人参与</p>
                <table class="w100 ranking-table" cellpadding="0" cellspacing="1">
                    <thead>
                        <tr>
                            <th>名次</th>
                            <th>姓名</th>
                            <th>总用时</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in rank.data">
                            <td>{{index+1}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.spend_time+'小时'}}</td>
                            <td>{{item.is_completed ? '已完成' : '未完成'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import ActSrv from "../../../service/actSrv";
    import AuthUtil from "../../../utils/authUtil";
    import countDown from "../../shared/countDown.vue";

    export default {
        data() {
            return {
                actSrv: {},
                query: {}, // address params
                openid: '', // current user openid
                act: { // activity information

                },
                userInfo: { // 用户相关数据, 完成多少了等等,
                    name: "",
                    mobile:""
                },
                rank: {
                    total: 0,
                    per_page: 0,
                    current_page: 0,
                    last_page: 0,
                    from: 0,
                    to: 0,
                    data: []
                }, // 排行榜数据
                countDownTime: new Date('2017-05-20 0:0:0').getTime()
            }
        },
        components: { countDown },
        created() {
            const query = this.$route.params;
            const actSrv = new ActSrv(this);
            this.query = query;
            this.actSrv = actSrv;


            const authUtil = new AuthUtil(this.$http);
            this.userInfo.name = authUtil.getName();
            this.userInfo.mobile = authUtil.getMobile();

            actSrv.getActInfo(query).then((resp) => {
                this.act = resp.data.data;
                this.countDownTime = (new Date(this.act.act_end_time)).getTime();
            });


            actSrv.getUserInfo(query).then((resp) => {
                this.userInfo = resp.data.data;
            });

            actSrv.getRank(query).then((resp) => {
                this.rank = resp.data.data;
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
                    if(resp.code == 1) {
                        alert("弹框填写姓名名称");
                    } else {
                        let confirm = window.confirm("您已经参与过此活动, 直接跳转到你的活动页?");
                        if(confirm) {
                            this.$router.push({
                                name: "template1Shared", params: {
                                    actId: actId,
                                    openid: openid
                                },
                            }); // 保存后到分享也, 游湖有需要就分享
                            window.location.reload(true);
                        }
                    }
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
                const actId = this.act.act_id;
                const openid = this.openid;
                const phone = "用户输入电话";
                const actOpenId = this.query.openid;
                this.actSrv.fillPhone({actId, openid, phone, actOpenId}).then((resp) => {
                   // 成功跳转到自己的活动也面了
                    this.$router.push({name: 'template1Shared', params: {actId, openid}});
                });
            },
        }
    }
</script>

<style scoped>
    .layout{
        background: #fedc40;
        padding-bottom: 80px;
    }
    .color_yellow{
        color: #ffea00;
    }
    .red{
        color: #ff4c12;
    }
    .key{
        padding: 0 3px;
    }
    .topBar{
        background: #161331;
        padding: 0 10px;
    }
    .pl10{
        padding-left: 10px;
    }
    .banner-bg{
        width: 100%; height: auto;
    }
    .banner{
        position: absolute;
        width: 100%;
        top: 0; left: 0;
    }
    .title{
        color: #fff;
        font-size: 34px;
        line-height: 40px;
        text-align: center;
        padding: 40px 30px;
    }
    .countDown-box{
        position: absolute;
        bottom: 3px;
        left: 50%;
        width: 256px; height: 85px;
        margin-left: -128px;
        padding-top: 15px;
    }
    .playBtn-box{
        padding: 22px 0 0;
    }
    .playBtn{
        width: 76%;
    }
    .box{
        margin: 42px auto 0;
        width: 90%;
        background: #fdf8da;
        border-radius: 5px;
        padding: 40px 20px 20px;
        position: relative;
    }
    .box-title{
        width: 268px; height: 42px;
        position: absolute;
        top: -21px; left: 50%;
        margin-left: -134px;
        background: url(/static/images/template_1/tit-bg.png) no-repeat 0 0;
        background-size: 100% auto;
        color: #fff;
        font-size: 16px;
        text-align: center;
    }
    .word{
        position: absolute;
        left: 50%;
    }
    .w0{
        -webkit-transform: rotate(12deg);
        transform: rotate(12deg);
        top: 13px;
        margin-left: -30px;
    }
    .w1{
        -webkit-transform: rotate(5deg);
        transform: rotate(5deg);
        top: 15px;
        margin-left: -10px;
    }
    .w2{
        -webkit-transform: rotate(-5deg);
        transform: rotate(-5deg);
        top: 15px;
        margin-left: 10px;
    }
    .w3{
        -webkit-transform: rotate(-16deg);
        transform: rotate(-16deg);
        top: 12px;
        margin-left: 30px;
    }
    .inner{
        color: #4d3a1b;
        line-height: 22px;
    }
    .inner p{
        padding-top: 20px;
    }
    .inner p:first-child{
        padding-top: 0;
    }
    .inner .num{
        display: inline-block;
        text-align: center;
        width: 22px; height: 22px;
        border-radius: 50%;
        color: #fff;
        background: #ff4c12;
        margin-right: 5px;
    }
    .madeBtn{
        display: block;
        width: 100%; height: 48px;
        line-height: 48px;
        background: #ff4c12;
        position: fixed;
        bottom: 0; left: 0;
        text-align: center;
        color: #fff;
        font-size: 18px;
        font-weight: bold;
    }
    .ranking-table{
        margin-top: 15px;
    }
    .ranking-table th,
    .ranking-table td{
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .ranking-table th{
        background: #e6c86b;
        color: #fff;
        font-weight: normal;
    }
    .ranking-table td{
        background: #f8eba9;
    }
    .icon-team{
        color: #4d3a1b;
        font-size: 20px;
        margin-right: 5px;
    }
</style>
