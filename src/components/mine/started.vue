<template>
    <div class="activityList-wrap" ref="wrap">
        <header class="header">
            <a href="" class="iconfont icon-back header-goback" @click="window.history.go(-1)"></a>
            <h1 class="header-title">进行中的活动</h1>
        </header>
        
        <div class="list">
            <div class="item mt10 clearfix w100" v-for="act in acts" :key="act.id">
            	<div class="table">
            		<div class="thumbnail-box table-cell">
	                    <img src="http://s.51lianying.com/images/www/index_v2/thum-1.jpg" alt="" class="thumbnail fl">
	                </div>
	                <div class="relative item-info table-cell">
	                    <h3 class="title color_333 f16">{{act.title}}</h3>
	                    <p class="desc f12 color_999">{{act.description}}</p>
	                    <p class="color_yellow2 mt10 f12">结束时间：{{act.act_end_time}}</p>
	                </div>
            	</div>
            	<div class="chart-table-box">
	                <table cellpadding="0" cellspacing="1" class="chart-table w100">
		                <thead>
		                	<tr>
		                        <th class="td-right" colspan="2">{{act.act_prize_name}}</th>
		                    </tr>
		                </thead>
	                    <tr>
	                        <td class="td-left text-center color_666">报名人数</td>
	                        <td class="td-right">{{act.join_count}}</td>
	                    </tr>
	                    <tr>
	                        <td class="td-left text-center color_666">完成目标</td>
	                        <td class="td-right">{{act.completed_count}}人</td>
	                    </tr>
	                    <tr>
	                        <td class="td-left text-center color_666">影响微信用户</td>
	                        <td class="td-right">{{act.visit_count}}</td>
	                    </tr>
	                    <tr>
	                        <td class="td-right" colspan="2">
	                            <table cellpadding="0" cellspacing="0" class="w100 color_yellow2">
	                                <tr>
	                                    <td>报名率：{{act.join_proportion}}%</td>
	                                    <td>转化率：{{act.completed_proportion}}%</td>
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
    import MineSrv from "../../service/mineSrv";
    import MugenScroll from 'vue-mugen-scroll'

    export default {
        data(){
            return {
                loading: false,
                isLoadAll: false,//是否加载完毕
				acts: [],
                page: 1
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
                mineSrv.getStartedActs(this.page).then((resp) => {
                    this.loading = false
					this.acts = this.acts.concat(resp.data.data.data);

                    that.page += 1;
                    
                    if(that.page > resp.data.data.total){
                        that.isLoadAll = true//加载完毕
                    }
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