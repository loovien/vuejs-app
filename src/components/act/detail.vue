<template>
    <div>
        <h1>{{act.title}}</h1>
        <hr/>
        {{act.description}}
        <router-link :to="{name: 'act_new', params:{id: id}}">我要制作</router-link>
    </div>
</template>

<script>
    import ActSrv from "../../service/actSrv";

    export default {
        data: () => {
            return {
                id: 0,
                act: ""
            }
        },
        created: function () {
            let id = this.$route.params.id;
            this.id = id;
            const actSrv = new ActSrv(this);
            actSrv.getActDetail(id).then((resp) => {
                console.log(resp.data, 'oo')
                this.act = resp.data.data;
            })
        }
    }
</script>