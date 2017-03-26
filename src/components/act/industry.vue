<template>
    <div class="wrap activityList-wrap" ref="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">{{title}}</h1>
        </header>
        
        <div class="list" v-show="acts.length > 0">
            <router-link :to="{name: 'act_detail', params: {id: act.id}}" class="item mt10 clearfix table w100" v-for="act in acts" :key="act.id">
                <div class="table">
                    <div class="thumbnail-box table-cell">
                        <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
                    </div>
                    <div class="relative item-info table-cell">
                        <h3 class="title color_333 f16">{{act.title}}</h3>
                        <p class="desc f12 color_999">新的一年来临了，快来抢个新年币增加好运吧，抢到足够新年币，即可兑换好礼。</p>
                    </div>
                </div>
            </router-link>
        </div>
        <p class="text-center color_gray data-none" v-show="acts.length == 0">此行业下暂无活动</p>
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
        <fixed></fixed>
    </div>
</template>

<script>
    import ActSrv from "../../service/actSrv";
    import MugenScroll from 'vue-mugen-scroll'
    import Fixed from '../shared/fixed.vue'

    export default {
        data(){
            return {
                acts: [],
                title: '',
                loading: false,
                isLoadAll: false//是否加载完毕
            }
        },
        created: function () {
            this.title = this.$route.params.title;
            this.id = this.$route.params.id;

            this.loadMore()
        },
        components: { MugenScroll, Fixed },
        methods: {
            loadMore: function(){
                this.loading = true;

                const actSrv = new ActSrv(this);
                actSrv.getIndustryActs(this.id).then((resp) => {
                    this.acts = resp.data.data.data;
                    this.loading = false

                    //如果加载完毕 isLoadAll = true
                })
            },
            fetchData() {
                if(!this.isLoadAll){
                    this.loadMore()
                }
            }
        }
    }
</script>










