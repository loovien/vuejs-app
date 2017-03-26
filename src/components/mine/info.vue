<template>
    <div>
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">我的</h1>
        </header>
        <div class="info clearfix">
            <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
            <p class="userName color_yellow f16">{{info.name}}<span class="signOut" @click="logout()">[退出]</span></p>
            <p class="phoneNumber color_fff"><span class="iconfont icon-iphone"></span><span class="f12">{{info.mobile}}</span></p>
            <p class="time color_fff"><span class="color_yellow">{{info.expiredDays}}</span>天可用<span class="expire">到期时间：{{info.expiredAt}}</span></p>
        </div>
        <div class="tab bg_fff f12">
            <div class="tab-item fl active">
                <span class="tab-item-a block text-center">活动挑选</span>
            </div>
            <div class="tab-item fl text-center">
                <router-link :to="{name: 'mineNostart'}" class="tab-item-a inline-block">未开始活动</router-link>
            </div>
            <div class="tab-item fl text-center">
                <router-link :to="{name: 'mineStart'}" class="tab-item-a inline-block">进行中活动</router-link>
            </div>
            <div class="tab-item fl text-center">
                <router-link :to="{name: 'mineEnd'}" class="tab-item-a inline-block">历史活动</router-link>
            </div>
        </div>

        <div class="cart-box bg_fff mt10">
            <h2 class="title">
                <span class="iconfont icon-chart"></span>最新活动数据
            </h2>
            <div class="chart-table-box">
                <table cellpadding="0" cellspacing="1" class="chart-table w100">
                    <tr>
                        <td class="td-left text-center color_666">活动模板</td>
                        <td class="td-right">{{top1.title}}</td>
                    </tr>
                    <tr>
                        <td class="td-left text-center color_666">报名人数</td>
                        <td class="td-right">{{top1.join_cnt}}人</td>
                    </tr>
                    <tr>
                        <td class="td-left text-center color_666">完成目标</td>
                        <td class="td-right">{{top1.completed_cnt}}人</td>
                    </tr>
                    <tr>
                        <td class="td-left text-center color_666">影响微信用户</td>
                        <td class="td-right">{{top1.visit_cnt}}人</td>
                    </tr>
                    <tr>
                        <td class="td-right" colspan="2">
                            <table cellpadding="0" cellspacing="0" class="w100 color_yellow2">
                                <tr>
                                    <td>报名率：{{top1.join_proportion}}%</td>
                                    <td>转化率：{{top1.completed_proportion}}%</td>
                                    <td>传播速度：{{top1.join_proportion < 30 ? '慢' : '快'}}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        
        <div class="recommend-box bg_fff mt10">
            <h2 class="title clearfix">
                <router-link :to="{name: 'act'}" class="fr f12 color_gray">全部<span class="iconfont icon-arrow-r f12"></span></router-link>
                <span class="iconfont icon-recommend"></span>最新推荐
            </h2>
            <div class="clearfix recommend-list">
                <router-link :to="{name: 'act_detail', params: {id: act.id}}"  v-for="act in acts" class="fl recommend text-center">
                    <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" class="recommend-thumbnail" />
                    <h5 class="act-title">{{act.title}}</h5>
                </router-link>
            </div>
        </div>

        <!-- <p v-for="recommend in recommends">
            <router-link :to="{name: 'act_detail', params: {id: recommend.id}}">{{recommend.title}}</router-link>
        </p> -->

    </div>
</template>

<script>
    import IndexSrv from "../../service/indexSrv";
    import AuthUtil from "../../utils/authUtil";
    import MineSrv from "../../service/mineSrv";
    import UserSrv from "../../service/userSrv";
    import addDays from "date-fns/add_days";
    import format from "date-fns/format";

    export default {
        data: () => {
            return {
                acts: [],
                info: {
                    name: "",
                    mobile: "",
                    expiredDays: 0,
                    expiredAt: "",
                },
                top1: {

                }

            }
        },
        created: function () {
            const indexSrv = new IndexSrv(this);
            const authUtil = new AuthUtil(this.$http);
            indexSrv.getRecommendList().then((resp) => {
                this.acts = resp.data.data;
            });

            this.info.name = authUtil.getName();
            this.info.mobile = authUtil.getMobile();
            let expiredDays = authUtil.getExpiredDays();
            this.info.expiredDays = expiredDays;
            this.info.expiredAt = (expiredDays == 0) ? '已过期' : format(addDays(new Date(), expiredDays), "YYYY-MM-DD");

            /* 获取top1 活动信息*/
            const mineSrv = new MineSrv(this);
            mineSrv.getTop1().then((resp) => {
                this.top1 = resp.data.data;
            });

        },
        methods: {
            logout: function (){
                const userSrv = new UserSrv(this);
                const authUtls = new AuthUtil(this.$http);

                userSrv.logout().then((resp) => {
                    if(resp.data.code === 0) {
                        authUtls.logout();
                        return this.$router.go(resp.data.data.redirectUrl);
                    }
                    alert(resp.data.data.msg);
                });
            }
        }
    }
</script>
<style scoped>
.info{
    padding: 30px 15px 30px 110px;
    background: #ffb400;
}
.thumbnail{
    width: 77px; height: 77px;
    border: 2px solid #fff;
    border-radius: 3px;
    margin-left: -95px;
}
.signOut{
    text-decoration: underline;
    padding-left: 5px;
}
.phoneNumber{
    padding: 3px 0;
}
.expire{
    padding-left: 10px;
}
.tab{
    width: 100%; height: 50px;
    padding: 13px 0;
}
.tab-item{
    width: 25%;
    height: 24px;
    line-height: 24px;
    border-right: 1px solid #ddd;
    padding: 0 5px;
}
.tab-item:last-child{
    border-right: none;
}
.active .tab-item-a{
    color: #ffb400;
    border-bottom: 2px solid #ffb400;
    height: 50px;
    line-height: 50px;
    margin-top: -13px;
}
.icon-chart,
.icon-recommend{
    color: #c6d0d8;
    font-size: 20px;
    padding-right: 5px;
}

</style>









