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
                    <p class="mt5"><span class="color_yellow">{{userInfo.username ? userInfo.username : userInfo.name}} 您有</span><span class="color_fff key">{{userInfo.join_cnt}}</span><span class="color_yellow">个朋友参与活动。</span></p>
                </template>
                <div class="tips-notstart" v-if="!isStart">活动未开始</div>
                <div class="tips-notstart" v-if="isEnded">活动已结束</div>
            </div>
        </div>
        <div class="text-center playBtn-box" v-show="isStart">
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
                {{act.act_rule_desc}}
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
                <div class="mt15 upload-box text-center">
                    <template v-for="item in act.act_images">
                        <img :src="item" alt="" class="img-w100">
                    </template>
                </div>
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

        <div class="box" v-show="!!act.video_url">
            <h2 class="box-title">
                <span class="word w0">视</span>
                <span class="word w1">频</span>
                <span class="word w2">介</span>
                <span class="word w3">绍</span>
            </h2>
            <!-- <video :src="act.video_url" controls></video> -->
            <iframe :src="act.video_url" frameborder="0" scrolling="no"></iframe>
        </div>

        <div class="box" v-show="!!act.link_url" >
            <h2 class="box-title">
                <span class="word w0">推</span>
                <span class="word w1">荐</span>
                <span class="word w2">链</span>
                <span class="word w3">接</span>
            </h2>
            <button class="btn" @click="gobuy(act.link_url)">{{act.link_name}}</button>
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
                {{act.act_rule_desc}}
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
        <fixed :options="{save: false, back: false, account: false, home: true}"></fixed>
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
    import WxSrv from '../../../service/wxSrv';

    export default {
        data() {
            return {
                authUtil: null,
                actSrv: {},
                wxSrv: {},
                query: {}, // address params
                openid: null, // current user openid
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
                isPaused: true//是否关闭音乐
            }
        },
        components: { countDown, Modal, Fixed },
        created() {
            const query = this.$route.params;
            const actSrv = new ActSrv(this);
            this.query = query;
            this.actSrv = actSrv;

            const authUtil = new AuthUtil(this.$http);
            this.authUtil = authUtil;
            const visitOpenId = authUtil.getOpenId();
            this.userInfo.name = authUtil.getName();
            this.userInfo.mobile = authUtil.getMobile();

            actSrv.getActInfo(query).then((resp) => {
                // console.log(resp.data.data)
                let act = this.act = resp.data.data;

                // 微信分享
                //http://203.195.235.76/jssdk/#menu-share
                let currentUrl = window.location.origin + window.location.pathname;
                const wxSrv = new WxSrv(this);
                wxSrv.initWxJsConfig(currentUrl, (resp) => {
                    if(!resp) {
                        console.error("微信分享失败");
                        return
                    }
                    wxSrv.onError();
                    wxSrv.onSuccess();
                    const wxShareConfig = {
                        title: act.title || '我要联赢-商家恋',
                        desc: act.description,
                        link: currentUrl,
                        imageUrl: act.cover_img,
                        success: function () {
                            alert("分享成功");
                        }
                    };
                    /*
                    const wxShareConfig = {
                        title: '参与活动, 可免费或的一对一辅导2222222',
                        link: 'http://sjl.51lianying.com/act/shared/9/o0sUawQY0A2u1ntP9RaALiazR8Hw',
                        imageUrl: 'http://cdn.qimg.51lianying.com/form/biz/magazine/2017/04/16/16/86b24d65f5de6ebaf0c32fcfa2b3ea87.jpeg?imageView2/2/w/640/format/jpg/interlace/0/q/80',
                        success: function () {
                            alert("ok");
                        }
                    }
                     */
                    console.log(wxShareConfig);
                    wxSrv.onMenuShareAppMessage(wxShareConfig);
                    wxSrv.onMenuShareTimeline(wxShareConfig);
                });
                /*
                try {
                    //this.act.act_images = JSON.parse(this.act.act_images);
                } catch (e) {
                    console.error(e)
                    this.act.act_images = [];
                }
                */
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
                let act = this.act;
                let url = window.location.origin + window.location.pathname;
                this.wxSrv.checkWx(url).then((resp) => {
                    if(resp.data.code === 0) {
                        wx.config(resp.data.data);
                    } else {
                        console.log("分享出错", resp.data);
                    }
                });
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
                let that = this;
                const openid = this.authUtil.getOpenId();
                const actId = this.query.actId;
                const actOwnerOpenId = this.query.openid;

                if(actOwnerOpenId == openid) {
                    alert("这就是您本人的活动也, 自己就不要在玩了!");
                    return;
                }
                /* 用户如果参与了, 直接显示用户的昵称, 和电话 */
                that.actSrv.letsPlay({actId, openid}).then((resp) => {
                    if(resp.data.code === 0) {
                        that.showRuleModal = true
                    } else {
                        let confirm = window.confirm("您已经参与过此活动, 直接跳转到你的活动页?");
                        if(confirm) {
                            that.$router.push({name: 'template1Shared', params: {actId, openid}});
                            window.location.reload(true);
                            return;
//                            window.location.href = `/act/shared/${actId}/${openid}`;
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
                    var that = this;
                    this.showSignupModal = false;
                    this.showSuccessModal = true;
                    var timer = setInterval(function(){
                        if(that.successCountDown <= 0){
                            clearInterval(timer)
                            that.$router.push({name: 'template1Shared', params: {actId, openid}});
                            window.location.reload(true);
                        } else {
                            that.successCountDown -= 1
                        }
                    }, 1000)
                });
            },

            gobuy(url) {
                window.location.href = url;
            }

            // methods end
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
    .box img {
        margin-bottom: 10px;
        width: 100%;
        background: #fdf8da;
        border-radius: 5px;
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
