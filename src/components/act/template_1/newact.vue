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
                    const respData = resp.data;
                    alert(respData.msg)
                    this.$router.push({
                        name: "template1Shared", params: {
                            id: respData.data.id,
                            openid: respData.data.openid
                        }
                    }); // 保存后到分享也, 游湖有需要就分享
                });
            }
        }
    }
</script>