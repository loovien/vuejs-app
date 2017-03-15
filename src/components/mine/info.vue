<template>
    <div>
        <h1>个人中心</h1>
        <hr/>
        剩余: 1888天   到期日期: xxxxxx
        <p>姓名:  182888800  退出</p>
        <router-link :to="{name: 'mineStart'}">开始的活动</router-link>
        <router-link :to="{name: 'mineNostart'}">未开始的活动</router-link>
        <router-link :to="{name: 'mineEnd'}">结束的活动</router-link>
        <hr/>
        我的活动
        <div>
            海蓝指甲
        </div>

        <h3>最新推荐</h3>
        <hr/>
        <p v-for="recommend in recommends">
            <router-link :to="{name: 'act_detail', params: {id: recommend.id}}">{{recommend.title}}</router-link>
        </p>

    </div>
</template>

<script>
    import IndexSrv from "../../service/indexSrv";
    export default {
        data: () => {
            return {
                recommends: []

            }
        },
        created: function () {
            const indexSrv = new IndexSrv(this);
            indexSrv.getRecommendList().then((resp) => {
                this.recommends = resp.data.data;
            })

        },
        methods: {
        }
    }
</script>

