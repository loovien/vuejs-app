<template>
    <div class="wrap">
        <header class="header">
            <h1 class="header-title">首页</h1>
            <router-link :to="{name: 'userHelp'}" class="iconfont icon-service header-service"></router-link>
        </header>
    
        <img :src="bannerImgs" class="banner">
        
        <div class="recommend-box bg_fff mt10">
            <h2 class="title clearfix">
                <!--<router-link :to="{name: 'act'}" class="fr f12 color_gray"><span class="iconfont icon-arrow-r f12"></span></router-link>-->
                最新推荐
            </h2>
            <div class="clearfix recommend-list">
                <router-link :to="{name: 'actDetail', params: {id: act.id}}"  v-for="act in acts" :key="act.id" class="fl recommend text-center">
                    <img :src="act.cover_img" class="recommend-thumbnail" />
                    <h5 class="act-title">{{act.title}}</h5>
                </router-link>
            </div>
        </div>

        <div class="industry-box bg_fff mt10">
            <h2 class="title clearfix">
                <!--<a class="fr f12 color_gray">全部<span class="iconfont icon-arrow-r f12"></span></a>-->
                行业营销工具
            </h2>
            <div class="overflow-hidden w100">
                <div class="clearfix industry-list">
                    <div class="clearfix">
                        <router-link :to="{name: 'actIndustry', params: {id: industry.id, title: industry.name}}" v-for="industry in industries" :key="industry.id" class="fl industry text-center">
                            <span class="iconfont"></span>
                            <h5 class="industry-title">{{industry.name}}</h5>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <fixed></fixed>
    </div>
</template>

<script>
    import IndexSrv from "../../service/indexSrv";
    import Fixed from '../shared/fixed.vue'
    import WxSrv from '../../service/wxSrv';

    export default {
        data() {
            return {
                bannerImgs: '',
                industries: [],
                acts: []
            }
        },
        components: { Fixed },
        created: function () {
            const indexSrv = new IndexSrv(this);
            indexSrv.getBannerImg().then((response) => {
                const data = response.data.data;
                this.bannerImgs = data.banner_url;

                const wxSrv = new WxSrv(this);
                const currentUrl = window.location.origin + window.location.pathname;
                const shareImgUrl = window.location.origin + "/static/images/logom.png";
                const wxShareJsConfig = {
                    title: '商家恋-让你更懂营销推广',
                    desc: '使用商家恋 让你品牌传播速度飞起来，营销推广不再难。',
                    imgUrl: shareImgUrl,
                    link: currentUrl,
                };
                wxSrv.initWxJsConfig(currentUrl, wxShareJsConfig);
            });
            indexSrv.getIndustryList().then((response) => {
               this.industries = response.data.data;
            });

            indexSrv.getRecommendList().then((response) => {
                this.acts = response.data.data;
            })
        },
        methods: {
            
        }
    }
</script>

<style scoped>
.banner{
    width: 100%; height: auto;
}
.container{
    padding-bottom: 20px;
}

.industry-box{
    padding: 0 0 10px 0;
}
.industry-list{
    margin-bottom: -2px;
}
.industry-title{
    padding: 0 15px;
}
.industry{
    width: 25%;
    position: relative;
    padding: 10px 0;
}
.industry:after{
    content: '';
    width: 100%; height: 1px;
    background: #f4f4f4;
    position: absolute;
    left: 0; right: 0;
    bottom: 0;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
}
.industry:before{
    content: '';
    width: 1px; height: 100%;
    background: #f4f4f4;
    position: absolute;
    top: 0; right: 0;
    bottom: 0;
    -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
}
.industry:nth-child(4n):before{
    content: none;
}
.industry .iconfont{
    font-size: 30px;
    margin-bottom: 5px;
}
.industry:nth-child(1) .iconfont:before{
    content: '\e63a';
    color: #4eb1f4;
}
.industry:nth-child(2) .iconfont:before{
    content: '\e62f';
    color: #49d91d;
}
.industry:nth-child(3) .iconfont:before{
    content: '\e603';
    color: #ff6364;
}
.industry:nth-child(4) .iconfont:before{
    content: '\e6b5';
    color: #06b5a7;
}
.industry:nth-child(5) .iconfont:before{
    content: '\e604';
    color: #ff6d79;
}
.industry:nth-child(6) .iconfont:before{
    content: '\e608';
    color: #3bd5cd;
}
.industry:nth-child(7) .iconfont:before{
    content: '\e628';
    color: #b3cc30;
}
.industry:nth-child(8) .iconfont:before{
    content: '\e64f';
    color: #ffa906;
}
.industry:nth-child(9) .iconfont:before{
    content: '\e630';
    color: #82a7a5;
}
.industry:nth-child(10) .iconfont:before{
    content: '\e62b';
    color: #6bd425;
}
.industry:nth-child(11) .iconfont:before{
    content: '\e646';
    color: #517cc8;
}
.industry:nth-child(12) .iconfont:before{
    content: '\e605';
    color: #ddcb08;
}
</style>










