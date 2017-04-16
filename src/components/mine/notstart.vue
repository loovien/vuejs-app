<template>
    <div class="activityList-wrap" ref="wrap">
        <header class="header">
            <span class="iconfont icon-back header-goback" @click="goback"></span>
            <h1 class="header-title">未开始活动</h1>
        </header>
        
        <div class="list">
            <div class="item mt10 clearfix table w100" v-for="act in acts" :key="act.id">
                <div class="table w100">
                    <router-link :to="{name: 'template1Shared', params: {id: act.id, openid}}" class="thumbnail-box table-cell">
                        <img :src="act.banner_img" alt="" class="thumbnail fl">
                    </router-link>
                    <div class="relative item-info table-cell">
                        <router-link :to="{name: 'actDetail', params: {id: act.id}}" class="title color_333 f16">{{act.title}}</router-link>
                        <p class="desc f12 color_999">{{act.description}}</p>
                        <div class="operate text-right">
                            <div class="inline-block">
                                <span class="iconfont icon-edit color_gray"></span>
                                <span class="color_666 f12" @click="editAct(act.id)">编辑</span>
                            </div>
                            <div class="inline-block delete">
                                <span class="iconfont icon-delete color_gray"></span>
                                <span class="color_666 f12" @click="deleteAct(act.id)">删除</span>
                            </div>
                        </div>
                    </div>
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
        <modal v-if="showModal" :modalOptions="modalOptions" @close="closeModal" @ok="okModal"></modal>
    </div>
</template>

<script>
    import Modal from '../shared/modal.vue'
    import MineSrv from "../../service/mineSrv";
    import MugenScroll from 'vue-mugen-scroll';
    import AuthUtil from "../../utils/authUtil";

    export default {
        data(){
            return {
                authUtil: null,
                loading: false,
                isLoadAll: false, //是否加载完毕
                acts: [],
                page: 1,
                openid: '',
                showModal: false,
                delId: null,//删除id
                modalOptions: {
                    size: 'mini',
                    content: '删除后将无法返回，确定删除吗？'
                }
            }
        },
        created: function () {
            this.authUtil = new AuthUtil(this.$http);
            this.openid = this.authUtil.getOpenId();
            this.loadMore()
        },
        components: { MugenScroll, Modal },
        methods: {
            closeModal: function(){
                this.showModal = false;
            },
            okModal: function(){
                const mineSrv = this._getMineSrv();
                const id = this.delId;
                mineSrv.deleteActById(id).then((resp) => {
                   for(let i in this.acts){
                        if(this.acts[i].id == this.delId){
                            this.acts.splice(i, 1)
                        }
                    }
                });
                this.showModal = false;
            },
            goback: function(){
                history.go(-1)
            },
            loadMore: function(){
                var that = this;
                this.loading = true;

                const mineSrv = this._getMineSrv();
                mineSrv.getNoStartActs(that.page).then((resp) => {
                    this.acts = resp.data.data.data;
                    this.loading = false

                    that.page += 1;
                    
                    if(that.page > resp.data.data.total){
                        that.isLoadAll = true//加载完毕
                    }
                });
            },
            fetchData() {
                if(!this.isLoadAll){
                    this.loadMore()
                }
            },

            editAct(id) {
                this.$router.push({
                    name: "actEdit", params: {id}
                }); // 保存后到分享也, 游湖有需要就分享
            },

            deleteAct(id){
                this.delId = id;
                this.showModal = true;
            },

            _getMineSrv() {
                return new MineSrv(this);
            }
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
.delete{
    margin-left: 20px;
}
</style>