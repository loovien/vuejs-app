<template>
    <div class="activityList-wrap" ref="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">历史活动</h1>
        </header>
        
        <div class="list">
            <div class="item mt10 clearfix w100" v-for="i in [1,2]">
            	<div class="table">
            		<div class="thumbnail-box table-cell">
	                    <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
	                </div>
	                <div class="relative item-info table-cell">
	                    <h3 class="title color_333 f16">活动标题</h3>
	                    <p class="desc f12 color_999">新的一年来临了，快来抢个新年币增加好运吧，抢到足够新年币，即可兑换好礼。</p>
	                    <p class="color_yellow2 mt10 f12">结束时间：2017-06-27</p>
	                </div>
            	</div>
            	<div class="chart-table-box">
	                <table cellpadding="0" cellspacing="1" class="chart-table w100">
		                <thead>
		                	<tr>
		                        <th class="td-right" colspan="2">[海澜之家]集面粉送代金券</th>
		                    </tr>
		                </thead>
	                    <tr>
	                        <td class="td-left text-center color_666">报名人数</td>
	                        <td class="td-right">123人</td>
	                    </tr>
	                    <tr>
	                        <td class="td-left text-center color_666">完成目标</td>
	                        <td class="td-right">2人</td>
	                    </tr>
	                    <tr>
	                        <td class="td-left text-center color_666">影响微信用户</td>
	                        <td class="td-right">2000人</td>
	                    </tr>
	                    <tr>
	                        <td class="td-right" colspan="2">
	                            <table cellpadding="0" cellspacing="0" class="w100 color_yellow2">
	                                <tr>
	                                    <td>报名率：9.6%</td>
	                                    <td>转化率：1.1%</td>
	                                    <td>传播速度：慢</td>
	                                </tr>
	                            </table>
	                        </td>
	                    </tr>
	                </table>
	            </div>
            </div>
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
.chart-table .td-left{
    padding: 8px 0;
}
.chart-table .td-right{
    padding: 8px;
}
.chart-table-box{
    padding: 0 0 15px;
}
</style>