<style>
    .container {
        width: 300px;
        overflow: hidden;
    }
    .act > a {
        margin: 4px;
        padding: 10px 3px;
        background: #ccc;
    }
    .industry > a{
        color: #fff;
        margin: 10px;
        display: block;
        float: left;
        padding: 5px;
        border: 2px dashed #000;
        background: #ccc;
        text-decoration: none;
    }
    .industry > a:hover {
        background: #888;
    }
</style>
<template>
    <div class="container">
        <h1> 首页信息 </h1>
        <img :src="bannerImg" />
        <hr>
        <h3>推荐活动</h3>
        <div class="act">
            <router-link :to="{name: 'act_detail', params: {id: act.id}}"  v-for="act in acts">{{act.title}}</router-link>
        </div>
        <h3> 行业营销工具 </h3>
        <hr>
        <div class="industry-box">
            <div class="industry">
                <router-link :to="{name: 'act_industry', params: {id: industry.id}}" v-for="industry in industries">
                    {{industry.name}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import IndexSrv from "../service/indexSrv";
    export default {
        data: () => {
            return {
                bannerImg: '',
                industries: [],
                acts: []
            }
        },
        created: function () {
            const indexSrv = new IndexSrv(this);
            indexSrv.getBannerImg().then((response) => {
                const data = response.data.data;
                this.bannerImg = data.banner_url;
            });
            indexSrv.getIndustryList().then((response) => {
               this.industries = response.data.data;
            });

            indexSrv.getRecommendList().then((response) => {
                this.acts = response.data.data;
            })
        }
    }
</script>