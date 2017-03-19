<template>
    <div class="activityList-wrap" ref="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">未开始活动</h1>
        </header>
        
        <div class="list">
            <router-link :to="{}" class="item mt10 clearfix table w100" v-for="i in [1,2,3]">
                <div class="table">
                    <div class="thumbnail-box table-cell">
                        <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
                    </div>
                    <div class="relative item-info table-cell">
                        <h3 class="title color_333 f16">活动标题</h3>
                        <p class="desc f12 color_999">新的一年来临了，快来抢个新年币增加好运吧，抢到足够新年币，即可兑换好礼。</p>
                        <div class="operate text-right">
                            <div class="inline-block">
                                <span class="iconfont icon-edit color_gray"></span>
                                <span class="color_666 f12">编辑</span>
                            </div>
                            <div class="inline-block delete">
                                <span class="iconfont icon-delete color_gray"></span>
                                <span class="color_666 f12">删除</span>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
        <!-- <p class="text-center color_gray data-none">暂无未开始活动</p> -->
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
</template>

<script>
    import mineSrv from "../../service/mineSrv";
    import MugenScroll from 'vue-mugen-scroll'

    export default {
        data(){
            return {
                loading: false,
                isLoadAll: false//是否加载完毕
            }
        },
        created: function () {
            this.loadMore()
        },
        components: { MugenScroll },
        methods: {
            loadMore: function(){
                this.loading = true;

                const mineSrv = new MineSrv(this);
                mineSrv.getIndustryActs().then((resp) => {
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

<style scoped>
.activityList-wrap .item-info{
    padding-bottom: 50px;
}
.operate{
    border-top: 1px solid #f4f4f4;
    height: 36px;
    line-height: 36px;
    position: absolute;
    width: 100%;
    right: 0; bottom: 0;
}
.delete{
    margin-left: 20px;
}
</style>