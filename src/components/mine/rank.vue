<template>
    <div class="layout" ref="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">报名列表详情</h1>
        </header>
        <div class="box">
            <div class="inner">
                <p><span class="iconfont icon-team"></span>共有<span class="red key">{{rank.total}}</span>人参与</p>
                <table class="w100 ranking-table" cellpadding="0" cellspacing="1">
                    <thead>
                    <tr>
                        <th>名次</th>
                        <th>姓名</th>
                        <th>电话</th>
                        <th>成绩</th>
                        <th>状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in rank.data">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.join_cnt}}</td>
                        <td>{{item.is_completed ? '已完成' : '未完成'}}</td>
                    </tr>
                    <tr v-show="rank.total == 0">
                        <td colspan="5">暂无人参与活动</td>
                    </tr>
                    </tbody>
                </table>
                <mugen-scroll scroll-container="wrap" :handler="fetchData" :should-handle="!loading">
                    <div class="text-center loading-bottom clearfix" v-show="!isLoadAll">
                        <span class="color_gray f12 fl">正在努力加载</span>
                        <div class="loader-inner line-spin-fade-loader fl">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div class="text-center loading-bottom clearfix" v-show="isLoadAll">
                        <span class="color_gray f12">已经到底了</span>
                    </div>
                </mugen-scroll>
            </div>
        </div>
        <fixed :options="{account: true, home: false}"></fixed>
    </div>
</template>

<script>
    import ActSrv from "../../service/actSrv";
    import MugenScroll from 'vue-mugen-scroll'
    import Fixed from '../shared/fixed.vue'

    export default {
        data: () => {
            return {
                id: 0,
                act: "",
                page: 1,
                loading: false,
                isLoadAll: false,
                rank: {
                    total: 0,
                    current_page: 1,
                    last_page: 1,
                    data: []
                } // 遍历排行榜
            }
        },
        created: function () {
            this.loadMore();
        },
        components: { MugenScroll, Fixed},
        methods: {
            goback: function(){
                history.go(-1)
            },
            loadMore: function(){
                this.loading = true;

                let actId = this.$route.params.actId;
                this.id = actId;
                const actSrv = new ActSrv(this);
                actSrv.getRank({actId, page: this.page}).then((resp) => {
                    this.loading = false;
                    const preRank = this.rank.data;
                    this.rank = resp.data.data;
                    this.rank.data = preRank.concat(resp.data.data.data);

                    this.page += 1;
                    if(this.page >= resp.data.data.last_page){
                        this.isLoadAll = true//加载完毕
                    }
                });
            },
            fetchData() {
                if(!this.isLoadAll){
                    this.loadMore()
                }
            },
        }
    }
</script>

<style scoped>
    .layout{
        /*background: #fedc40;*/
        padding-bottom: 80px;
    }
    .red{
        color: #ff4c12;
    }
    .key{
        padding: 0 3px;
    }
    .box{
        margin: 10px auto 0;
        width: 90%;
        background: #fdf8da;
        border-radius: 5px;
        padding: 20px 20px 20px;
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












