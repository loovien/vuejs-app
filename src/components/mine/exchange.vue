<template>
    <div class="activityList-wrap" ref="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">领取礼品列表</h1>
        </header>

        <div class="form-wrapper cf">
            <input type="text" placeholder="输入手机号" v-model="mobile" required>
            <button type="submit" @click="search()">搜索</button>
        </div>

        <div class="list">
            <div class="item mt10 clearfix table w100" v-for="act in acts" :key="act.id">
                <div class="table w100">
                    <div class="thumbnail-box table-cell"  @click="preview(act.id)">
                        <img :src="act.banner_img" alt="" class="thumbnail fl">
                    </div>
                    <div class="relative item-info table-cell">
                        <h3 class="title color_333 f16"  @click="preview(act.id)">{{act.title}}</h3>
                        <p class="desc f12 color_999"  @click="preview(act.id)">{{act.description}}</p>
                        <div class="operate text-right">
                            <div class="inline-block">
                                <span class="iconfont icon-edit color_gray"></span>
                                <span class="color_666 f12" @click="exchange(act.id)">领取</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center loading-bottom clearfix" v-show="acts.length == 0">
                <span class="color_gray f12">暂无兑换的活动</span>
            </div>
        </div>
        <fixed :options="{account: true, home: false}"></fixed>
    </div>
</template>

<script>
    import MineSrv from "../../service/mineSrv";
    import AuthUtil from "../../utils/authUtil";
    import Fixed from '../shared/fixed.vue'

    export default {
        data(){
            return {
                mobile: "",
                storageMobile: "",
                actId: 0,
                mineSrv: {},
                acts: [],
            }
        },
        created: function () {
            this.mineSrv = new MineSrv(this);
        },
        components: {Fixed },
        methods: {
            goback() {
                history.go(-1)
            },
            search() {
                this.storageMobile = this.mobile;
                this.mineSrv.getPrizeList(this.storageMobile).then((resp) => {
                   if(resp.data.code === 0){
                       this.acts = resp.data.data;
                   } else {
                       alert(resp.data.msg);
                   }
                });
            },
            exchange(actId) {
                if(window.confirm("兑换后不能撤销, 确认用户兑换吗?")) {
                    const mobile = this.storageMobile;
                    this.mineSrv.exchange({mobile, actId}).then((resp) => {
                        alert(resp.data.msg);
                        if(resp.data.code === 0) {
                            for(let i in this.acts){
                                if(this.acts[i].id == actId){
                                    this.acts.splice(i, 1)
                                }
                            }
                        }
                    })
                }
            },

            preview(id) {
                const authUtils = new AuthUtil(this.$http);
                this.$router.push({
                    name: "template1Shared",
                    params: {actId: id, openid: authUtils.getOpenId()}
                });
            }
            // methods end
        }
    }
</script>

<style scoped>
    .thumbnail-box{
        width: 120px;
    }
    .activityList-wrap .item-info{
        padding-bottom: 50px;
    }
    .operate{
        border-top: 1px solid #f4f4f4;
        height: 36px;
        line-height: 36px;
        position: absolute;
        width: 100%;
        right: 0; bottom: 0;
    }
    /*-------------------------------------*/

    .cf:before, .cf:after{
        content:"";
        display:table;
    }
    .cf:after{
        clear:both;
    }
    .cf{
        zoom:1;
    }
    /*-------------------------------------*/
    .form-wrapper {
        margin: 30px 20px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }

    .form-wrapper input {
        height: 40px;
        width: 80%;
        padding: 10px 10px;
        float: left;
        border: 0;
        background: #fdf8da;
    }

    .form-wrapper input:focus {
        outline: 0;
        background: #fff;
    }

    .form-wrapper button {
        width: 20%;
        overflow: visible;
        position: relative;
        float: right;
        border: 0;
        padding: 0;
        cursor: pointer;
        height: 40px;
        font: bold 15px/40px 'lucida sans', 'trebuchet MS', 'Tahoma';
        color: #fff;
        text-transform: uppercase;
        background: #ffb400;
    }

    .form-wrapper button:hover{
        background: yellow;
    }

    .form-wrapper button:active,
    .form-wrapper button:focus{
        background: #ffb400;
    }
</style>
