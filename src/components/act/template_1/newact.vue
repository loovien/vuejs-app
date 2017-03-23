<template>
    <div>
        <h1>创建新活动</h1>
        <button @click="newAct()">保存</button>
        <hr/>
    </div>
</template>

<script>
    import ActSrv from "../../../service/actSrv";
    export default {
        data: () => {
            return {
                act: [],
                newActPostData: {

                }
            }
        },
        created: function () {
            let id = this.$route.params.id;
            this.id = id;
            const actSrv = new ActSrv(this);
            actSrv.getActDetail(id).then((resp) => { // 获取默认活动数据
                this.act = resp.data.data;
            })
        },
        methods: {
            newAct: function () {
                const actSrv = new ActSrv(this);
                let postData = this.newActPostData;
                actSrv.newAct(postData).then((resp) => {
                    alert(resp.data.msg)
                    console.log(resp)
                    this.$router.push({name: "mineIndex"}); // 保存好会到个人中心
                });
            }
        }
    }
</script>