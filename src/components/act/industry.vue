<template>
    <div class="wrap" ref="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">{{title}}</h1>
        </header>
        
        <mugen-scroll scroll-container="wrap" :handler="fetchData" :should-handle="!loading">
            <template v-show="acts.length > 0">
                <router-link :to="{name: 'act_detail', params: {id: act.id}}" class="item mt10 clearfix" v-for="act in acts">
                    <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
                    <h3 class="title color_333 f16">{{act.title}}</h3>
                    <p class="desc f12 color_999">新的一年来临了，快来抢个新年币增加好运吧，抢到足够新年币，即可兑换好礼。</p>
                </router-link>
            </template>
            <div class="text-center loading-bottom clearfix">
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
            <div class="text-center loading-bottom clearfix">
                <span class="color_gray f12">已经到底了</span>
            </div>
            <p class="text-center color_gray data-none" v-show="acts.length == 0">此行业下暂无活动</p>
        </mugen-scroll>
        
    </div>
</template>

<script>
    import ActSrv from "../../service/actSrv";
    import MugenScroll from 'vue-mugen-scroll'

    export default {
        data: () => {
            return {
                acts: [],
                title: '',
                loading: false
            }
        },
        created: function () {
            this.title = this.$route.params.title;

            let id = this.$route.params.id;
            const actSrv = new ActSrv(this);
            actSrv.getIndustryActs(id).then((resp) => {
                this.acts = resp.data.data.data;
            })

        },
        components: { MugenScroll },
        methods: {
            fetchData() {
                console.log('加载更多')
            }
        }
    }
</script>
<style>
.wrap{
    position: absolute;
    width: 100%; height: 100%;
    overflow-y: scroll;
}
.item{
    display: block;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    padding: 10px 10px 10px 140px;
    background: #fff;
}
.thumbnail{
    margin-left: -130px;
    width: 110px; height: auto;
}
.desc{
    color: #ababab;
    margin-top: 5px;
}
.loading-bottom{
    padding: 10px 0;
    width: 90px;
    margin: 0 auto;
}
@-webkit-keyframes line-spin-fade-loader {
  50% { opacity: 0.3; }

  100% { opacity: 1; }
}

@keyframes line-spin-fade-loader {
  50% { opacity: 0.3; }

  100% { opacity: 1; }
}

.line-spin-fade-loader {
    position: relative;
}
.line-spin-fade-loader > div:nth-child(1) {
top: 6px;
left: 0;
-webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(2) {
top: 4px;
left: 4px;
-webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(3) {
top: 0;
left: 6px;
-webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
        transform: rotate(90deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(4) {
top: -4px;
left: 4px;
-webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
        transform: rotate(45deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(5) {
top: -6px;
left: 0;
-webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(6) {
top: -4px;
left: -4px;
-webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
        transform: rotate(-45deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(7) {
top: 0;
left: -6px;
-webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
        transform: rotate(90deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out; }
.line-spin-fade-loader > div:nth-child(8) {
top: 4px;
left: -4px;
-webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
        transform: rotate(45deg);
-webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
        animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out; }
.line-spin-fade-loader > div {
background-color: #000;
border-radius: 2px;
margin: 2px;
-webkit-animation-fill-mode: both;
        animation-fill-mode: both;
position: absolute;
width: 1px;
height: 4px;
}
.line-spin-fade-loader{
    margin: 5px 0 0 10px;
}

</style>










