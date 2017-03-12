<style>
    .container {
        width: 300px;
        text-align: center;
        overflow: hidden;
    }
    a.industry{
        color: #fff;
        margin: 10px;
        display: block;
        float: left;
        padding: 5px;
        border: 2px dashed #000;
        background: #ccc;
        text-decoration: none;
    }
    a.industry:hover {
        background: #888;
    }
</style>
<template>
    <div class="container">
        <h1> 首页信息 </h1>
        <img :src="bannerImg" />
        <h3> 活动集中展示 </h3>
        <div class="industry-box">
            <a href="#" class="industry" v-for="industry in industries">
                {{industry.name}}
            </a>
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
        }
    }
</script>