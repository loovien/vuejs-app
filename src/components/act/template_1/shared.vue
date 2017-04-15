<template>
    <div class="layout">
        <!--<div class="topBar color_fff f16"><span class="color_yellow">78</span>人查看<span class="color_yellow pl10">394</span>人分享<span class="color_yellow pl10">16</span>人报名</div>-->
        <div class="relative">
            <img src="/static/images/template_1/banner-bg.jpg" alt="" class="banner-bg">
            <div class="banner">
                <h1 class="title">{{act.title}}</h1>
            </div>
            <div class="countDown-box color_fff text-center">
                <template v-if="isStart && !isEnded">
                    <countDown :date="countDownTime" @timeDown="timeDown" v-if="countDownTime"></countDown>
                    <!--<p class="mt5"><span class="color_yellow">{{userInfo.name}}</span><span class="color_fff key">2016-11-01 12:15</span><span class="color_yellow">抽中奖品</span></p>-->
                    <p class="mt5"><span class="color_yellow">{{userInfo.username}} 您有</span><span class="color_fff key">{{userInfo.join_cnt}}</span><span class="color_yellow">个朋友参与活动。</span></p>
                </template>
                <div class="tips-notstart" v-if="!isStart">活动未开始</div>
                <div class="tips-notstart" v-if="isEnded">活动已结束</div>
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
                <p>总共<span class="red key">{{act.act_prize_cnt}}</span>{{act.act_prize_unit}} 最后<span class="red key">{{act.act_prize_cnt - completedCnt}}</span>{{act.act_prize_unit}}</p>
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
        <!-- 活动规则弹窗 -->
        <modal v-if="showRuleModal" :modalOptions="ruleModalOptions" @close="showRuleModal = false">
            <div slot="header">
                <p class="modal-title">活动规则</p>
                <span class="close" @click="showRuleModal = false"></span>
            </div>
            <div slot="body">
                rule
            </div>
            <div slot="button">
                <a href="javascript:void(0)" class="btn ok-btn btn-small fr btn-blue" @click="okRuleModal">我知道了</a>
            </div>
        </modal>
        <!-- 报名弹窗 -->
        <modal v-if="showSignupModal" :modalOptions="signupModalOptions" @close="showSignupModal = false">
            <div slot="header">
                <p class="modal-title">我要报名</p>
                <span class="close" @click="showSignupModal = false"></span>
            </div>
            <div slot="body">
                <input type="text" placeholder="请输入您的真实姓名" class="ui-input" v-model="signup.name">
                <input type="text" placeholder="请输入您的手机号码" class="ui-input mt10" v-model="signup.phone">
            </div>
            <div slot="button">
                <a href="javascript:void(0)" class="btn ok-btn btn-small fr btn-blue" @click="okSignupeModal">提交</a>
            </div>
        </modal>
        <!-- 报名成功 -->
        <modal v-if="showSuccessModal" :modalOptions="successModalOptions">
            <div slot="header"><p class="modal-title">恭喜你</p></div>
            <div slot="body" class="text-center successModal">
                <p class="iconfont icon-success"></p>
                报名成功 <span class="orange">{{successCountDown}}</span><span class="orange">S</span> 后将跳转
            </div>
            <div slot="button"></div>
        </modal>
        <fixed :options="{save: false, back: false, account: false}"></fixed>
        <span v-if="!!act.background_music" class="music-icon iconfont icon-music" :class="{'isPaused': isPaused}" @click="togglePause"></span>
        <audio v-if="!!act.background_music" loop="" :src="act.background_music" autoplay="" id="music"></audio>
    </div>
</template>

<script>
    import ActSrv from "../../../service/actSrv";
    import AuthUtil from "../../../utils/authUtil";
    import countDown from "../../shared/countDown.vue";
    import Modal from '../../shared/modal.vue'
    import Fixed from '../../shared/fixed.vue'

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
                completedCnt: 0, // 已经完成的数量
                countDownTime: null,
                isStart: true,//活动是否开始
                isEnded: false,//活动是否结束
                showRuleModal: false,
                ruleModalOptions: {
                    size: 'mini',
                    showCancelButton: false
                },
                showSignupModal: false,
                signupModalOptions: {
                    size: 'mini',
                    showCancelButton: false
                },
                signup: {
                    name: '',
                    phone: ''
                },
                showSuccessModal: false,
                successModalOptions: {
                    size: 'mini',
                    title: '恭喜你',
                    showConfirmButton: false,
                    showCancelButton: false
                },
                successCountDown: 3,
                isPaused: false//是否关闭音乐
            }
        },
        components: { countDown, Modal, Fixed },
        created() {
            const query = this.$route.params;
            const actSrv = new ActSrv(this);
            this.query = query;
            this.actSrv = actSrv;

            const authUtil = new AuthUtil(this.$http);
            const visitOpenId = this.openid = authUtil.getOpenId();
            this.userInfo.name = authUtil.getName();
            this.userInfo.mobile = authUtil.getMobile();

            actSrv.getActInfo(query).then((resp) => {
                // console.log(resp.data.data)
                const act = this.act = resp.data.data;
                const starttime = (new Date(act.act_start_time)).getTime();
                const endtime = (new Date(act.act_end_time)).getTime();
                const today = new Date().getTime();

                //活动未开始
                if(starttime - today > 0){
                    this.isStart = false
                }
                //活动已结束
                if(endtime - today < 0){
                    this.isEnded = true
                }
                this.countDownTime = endtime;
                const visitData = {actId: act.id, openid: visitOpenId, merchantId: act.merchant_id};
                /* 记录来访记录 */
                actSrv.visitLog(visitData).then((resp) => {});

                actSrv.completedCnt(act.id).then((resp) => {
                    if(resp.data.code === 0) {
                        this.completedCnt = resp.data.data.completed_cnt;
                    }
                });
                //微信分享
                this.share()
            });

            actSrv.getUserInfo(query).then((resp) => {
                this.userInfo = resp.data.data;
            });

            actSrv.getRank(query).then((resp) => {
                this.rank = resp.data.data;
            });
            // 用户一进来的时候, 表示已将帮忙了
            actSrv.helpIt(query).then((resp) => {
                // alert(resp.data.msg);
                if(resp.data.code == 0) {
                    this.userInfo.join_cnt += 1;
                }
            });
        },
        methods: {
            //微信分享
            share(){
                var act = this.act;

                window.share_config = {
                    title   : act.title,
                    desc    : act.description, 
                    link    : act.link_url,
                    imgUrl  : act.banner_img,
                    shareTrigger: function (res) {

                    },
                    shareSuccess: function (res, channel) {

                    },
                    shareCancel: function (res) {

                    },
                    shareFail: function (res) {

                    }
                };
            },
            //切换音乐开关
            togglePause: function(){
                if(this.isPaused){
                    document.getElementById('music').play()
                    this.isPaused = false
                } else {
                    document.getElementById('music').pause()
                    this.isPaused = true
                }
            },
            //提交报名弹窗
            okSignupeModal: function(){
                if(this.signup.name == ''){
                    alert('请填写姓名');
                    return
                } else if(this.signup.phone == ''){
                    alert('请填写手机号码');
                    return
                } else if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.signup.phone))){
                    alert('请填写正确的手机号码');
                    return
                }
                this.fillInfo(this.signup.name, this.signup.phone);
            },
            //关闭规则弹窗
            okRuleModal() {
                this.showRuleModal = false;
                this.showSignupModal = true;
            },
            //倒计时结束
            timeDown() {
                this.isEnded = true;
            },
            /* 我也要玩 */
            letsPlay() {
                // 检测是否已经参与, 参与直接跳转, 没有参与需要填写名字手机等信息
                const actId = this.query.actId;
                const actOwnerOpenId = this.query.openid;
                const openid = this.openid;

                if(actOwnerOpenId == openid) {
                    alert("这就是您本人的活动也, 自己就不要在玩了!");
                    return;
                }
                /* 用户如果参与了, 直接显示用户的昵称, 和电话 */
                this.actSrv.letsPlay({actId, openid}).then((resp) => {
                    if(resp.data.code === 0) {
                        this.showRuleModal = true
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
            /* 弹框填入姓名,电话 */
            fillInfo(name, phone) {
                const actId = this.query.actId;
                const openid = this.openid;
                const actOpenId = this.query.openid;
                /* 成功条到输入电话弹框 */
                this.actSrv.fillInfo({actId, openid, name, phone, actOpenId}).then((resp) => {
                    this.showSignupModal = false;
                    this.showSuccessModal = true;
                    var that = this;
                    var timer = setInterval(function(){
                        if(that.successCountDown <= 0){
                            clearInterval(timer)
                            this.$router.push({name: 'template1Shared', params: {actId, openid}});
                        } else {
                            that.successCountDown -= 1
                        }
                    }, 1000)
                });
            },
        }
    }
</script>

<style scoped>
    .music-icon.isPaused:after{
        content: '';
        width: 100%; height: 1px;
        background: #fff;
        position: absolute;
        top: 50%; left: 0;
        -webkit-transform:rotate(135deg); 
                transform:rotate(135deg);
    }
    .music-icon{
        display: block;
        width: 45px; height: 45px;
        border-radius: 50%;
        text-align: center;
        line-height: 45px;
        background: rgba(0,0,0,.7);
        color: #fff;
        position: fixed;
        top: 30px; right: 10px;
        font-size: 20px;
    }
    .successModal{
        padding: 20px 0;
    }
    .icon-success{
        color: #ff4c12;
        font-size: 40px;
        line-height: 40px;
        margin-bottom: 10px;
    }
    .orange{
        color: #ff4c12;
    }
    .ok-btn{
        background: url('/static/images/template_1/modal-btn-bg.jpg');
        background-size: 100% 100%;
        border: 2px solid #7b4506;
        border-radius: 6px;
        color: #5e1c08;
        height: 46px;
        line-height: 42px;
    }
    .ui-input{
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 100%; height: 50px;
        line-height: 50px;
        display: block;
        font-size: 16px;
        padding-left: 10px;
    }
    .tips-notstart{
        line-height: 50px;
        font-size: 20px;
        color: #ffea00;
    }
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
