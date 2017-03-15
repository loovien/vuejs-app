<template>
    <div>
        <ul v-show="acts.length > 0">
            <li v-for="act in acts">
                <router-link :to="{name: 'act_detail', params: {id: act.id}}">{{act.title}}</router-link>
            </li>
        </ul>
        <p v-show="acts.length == 0">行业下没有活动</p>
    </div>

</template>

<script>
    import ActSrv from "../../service/actSrv";
    export default {
        data: () => {
          return {
              acts: []
          }
        },
        created: function () {
            let id = this.$route.params.id;
            const actSrv = new ActSrv(this);
            actSrv.getIndustryActs(id).then((resp) => {
                this.acts = resp.data.data.data;
            })

        },
        methods: {

        }
    }
</script>
