<template>
    <div class="layout">
        <div class="relative">
            <img src="/static/images/template_1/banner-bg.jpg" alt="" class="banner-bg">
            <div class="banner">
                <textarea class="ui-textarea" v-model="act.title" id="" cols="30" rows="6" :placeholder="act.title"></textarea>
            </div>
            <div class="countDown-box color_fff text-center">
                <div class="table w100">
                    <div class="table-cell f12">
                        <datepicker v-model="act.act_start_time" :isShowModal="true"></datepicker>
                    </div>
                    <div class="table-cell table-cell-2">
                        至
                    </div>
                    <div class="table-cell f12">
                        <datepicker v-model="act.act_end_time"></datepicker>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center playBtn-box">
            <img src="/static/images/template_1/play-btn.jpg" alt="点我去玩" class="playBtn">
        </div>

        <div class="box reward-box">
            <h2 class="box-title">
                <span class="word w0">活</span>
                <span class="word w1">动</span>
                <span class="word w2">奖</span>
                <span class="word w3">励</span>
            </h2>
            <div class="inner text-center">
                共
                <span class="reduce-btn" @click="act.act_prize_cnt > 0  ? act.act_prize_cnt-- : 0">-</span>
                <input type="text" class="ui-input input-1 text-center" v-model="act.act_prize_cnt">
                <span class="add-btn" @click="act.act_prize_cnt++">+</span>
                份
                <input type="text" class="ui-input mt15" placeholder="请输入活动奖励" v-model="act.act_prize_name">
            </div>
        </div>

        <div class="box introduce-box">
            <h2 class="box-title">
                <span class="word w0">活</span>
                <span class="word w1">动</span>
                <span class="word w2">介</span>
                <span class="word w3">绍</span>
            </h2>
            <div class="inner">
                <textarea class="ui-textarea introduce-textarea" v-model="act.description" cols="30" rows="20" placeholder="请输入活动介绍"></textarea>
            </div>
        </div>


        <div class="box">
            <h2 class="box-title">
                <span class="word w0">参</span>
                <span class="word w1">与</span>
                <span class="word w2">规</span>
                <span class="word w3">则</span>
            </h2>
            <div class="inner text-center">
                {{act.act_rule_decorate}}<input type="text" class="ui-input input-inline" v-model="act.act_rule_cnt" placeholder="请输入目标数据"/>{{act.act_rule_keywords}}
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">规</span>
                <span class="word w1">则</span>
                <span class="word w2">说</span>
                <span class="word w3">明</span>
            </h2>
            <div class="inner">
                <textarea class="ui-textarea introduce-textarea" cols="30" v-model="act.act_rule_desc" rows="20" placeholder="请输入参与规则">
                    {{act.act_rule_desc}}
                </textarea>
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">奖</span>
                <span class="word w1">品</span>
                <span class="word w2">描</span>
                <span class="word w3">述</span>
            </h2>
            <div class="inner">
                <input type="text" class="ui-input" placeholder="请输入奖品描述" v-model="act.act_prize_desc">
                <div class="mt15 upload-box text-center">
                    <template v-for="item in images">
                        <img :src="item" alt="" class="img-w100">
                    </template>
                    <template v-show="act.images.length < 6">
                        <input type="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange" placeholder="请输入奖品描述" class="upload-file">
                        <span class="icon-upload iconfont"></span>
                        <p class="text-center">最多只能上传6张图片</p>
                    </template>
                </div>
            </div>
        </div>

        <div class="box info-box">
            <h2 class="box-title">
                <span class="word w0">领</span>
                <span class="word w1">奖</span>
                <span class="word w2">信</span>
                <span class="word w3">息</span>
            </h2>
            <div class="inner">
                <p class="tit">主办方：</p>
                <input type="text" class="ui-input mt5" v-model="act.organizer_name" placeholder="请输入主办方">
                <p class="tit">主办方地址：</p>
                <textarea class="ui-textarea introduce-textarea mt5" v-model="act.organizer_address" cols="30" rows="3" placeholder="请输入主办方地址"></textarea>
                <p class="tit">主办方电话：</p>
                <input type="text" class="ui-input mt5" v-model="act.organizer_phone" placeholder="请输入主办方电话">
            </div>
        </div>

        <div class="box">
            <h2 class="box-title">
                <span class="word w0">关</span>
                <span class="word w1">于</span>
                <span class="word w2">我</span>
                <span class="word w3">们</span>
            </h2>
            <div class="inner">
                <textarea class="ui-textarea introduce-textarea mt5" v-model="act.about_us" cols="30" rows="5" placeholder="请输入“关于我们的介绍”增加公信力。"></textarea>
                <p>视频地址：</p>
                <input type="text" class="ui-input mt5" v-model="act.video_url" placeholder="请输入视频地址">
                <p>添加其他网址：</p>
                <input type="text" class="ui-input mt5" v-model="act.link_name" placeholder="请输入其他网址（名称）">
                <input type="text" class="ui-input mt10" v-model="act.link_url" placeholder="请输入其他网址">
            </div>
        </div>

        <!-- 报名成功 -->
        <modal v-if="goPreviewOrMine" :modalOptions="modalOptions" @ok="goPreview()" @close="goMine()"></modal>

        <fixed :options="{save: true, back: true, account: false}" @saveEvent="newAct"></fixed>
        <!-- {{act.description}} -->
    </div>
</template>

<script>
    import ActSrv from "../../../service/actSrv";
    import Fixed from '../../shared/fixed.vue'
    import '../../../../static/js/lrz.all.bundle'
    import Datepicker from '../../shared/Datepicker.vue'
    import Modal from '../../shared/modal.vue';
    import $ from 'jquery'

    export default {
        data: () => {
            return {
                act: {
                    act_prize_cnt: 1
                },
                images: [],
                goPreviewOrMine: false,
                modalOptions: {
                    size: "mini",
                    title: "预览或个人中心",
                    content: "",
                    showCancelButton: true,
                    cancelButtonText: "去个人中心",
                    showConfirmButton: true,
                    confirmButtonText: "去预览活动",
                },
                respData: {}
            }
        },
        components: { Fixed, Datepicker, Modal},
        created: function () {
            let id = this.$route.params.id;
            this.id = id;
            const actSrv = new ActSrv(this);
            actSrv.getActTemplateDetail(id).then((resp) => { // 获取默认活动数据
                this.act = resp.data.data;
            })
        },
        methods: {
            newAct: function () {
                const actSrv = new ActSrv(this);
                let postData = this.act;
                postData.act_images = this.images;
                this.validate(postData);
                actSrv.newAct(postData).then((resp) => {
                    const respData = resp.data;
                    if(respData.code === 0) {
                        this.respData = respData;
                        this.goPreviewOrMine = true;
                    }
                });
            },
            validate: function (data) {
                if(data.act_start_time == '') {
                    alert("请填写开始时间");
                    return;
                }
                if(data.act_end_time == '') {
                    alert("请填写结束时间");
                    return;
                }
                if(data.act_prize_cnt == 0) {
                    alert("请填写奖品数量");
                    return;
                }
            },
            goMine: function () {
                const actStartTime = this.act.act_start_time;
                const actEndTime = this.act.act_end_time;
                const startTimestamp = (new Date(actStartTime)).getTime();
                const endTimestamp = (new Date(actEndTime)).getTime();
                const nowTimestamp = (new Date()).getTime();

                if(startTimestamp > nowTimestamp) { // 未开始
                    this.$router.push({ name: "mineNostart"});
                } else if(startTimestamp < nowTimestamp && endTimestamp > nowTimestamp) { // 开始中
                    this.$router.push({ name: "mineStart"});
                } else { // 结束了
                    this.$router.push({ name: "mineNostart"});
                }
            },
            goPreview: function () {
                const actId = this.respData.data.id;
                const openid = this.respData.data.openid;
                this.$router.push({
                    name: "template1Shared", params: { actId, openid}
                }); // 保存后到分享也, 游湖有需要就分享
            },
            onFileChange: function(e) {
                var files = e.target.files || e.dataTransfer.files;
                if(!files.length) return;

                this.createImage(files, e);
            },
            createImage: function(file, e) {
                var that = this;
                const actSrv = new ActSrv(this);
                lrz(file[0], { width: 640 }).then(function(rst) {
                    var clearBase64 = rst.base64.substr( rst.base64.indexOf(',') + 1 );

                    $.ajax({
                        url: 'http://s.51lianying.com/upload/?c=image&m=process_for_form&type=biz&item=magazine&base64=1&field=base64&is_ajax=1',
                        type: 'POST',
                        data: {
                            image_data: clearBase64
                        },
                        success: function(resp){
                            var data = JSON.parse(resp).data;
                            that.images.push(data.url)
                        }
                    })
                });
            },
            upload: function(e){
                console.log(e)
            }
        }
    }
</script>

<style scoped>
.input-inline{
    display: inline-block;
    width: 80px!important;
    text-align: center;
    margin: 0 5px;
}
.upload-file{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
}
.img-w100{
    max-width: 100%; height: auto;
}
.ui-textarea, .ui-input{
    width: 100%;
    font-size: 14px;
    border: 1px solid #d7d7d7;
    padding: 5px;
}
.reduce-btn,
.add-btn{
    display: inline-block;
    width: 34px; height: 34px;
    text-align: center;
    line-height: 34px;
    border: 1px solid #d7d7d7;
    background: #fff;
}
.reward-box .input-1{
    display: inline-block;
    width: 62px;
    height: 34px;
    line-height: 34px;
}
.info-box .tit{
    color: #ff4c12;
    font-size: 16px;
}
.upload-box{
    width: 100%;
    background: #fff;
    vertical-align: middle;
    width: 100%;
    border: 1px solid #d7d7d7;
    padding: 50px 0 30px 0;
    position: relative;
}
.upload-box .file-btn{
    width: 100%; height: 100%;
    position: absolute;
    left: 0; top: 0;
}
.upload-box .icon-upload{
    color: #ff4c12;
    font-size: 50px;
    line-height: 30px;
}



.layout{
    background: #fedc40;
    padding-bottom: 40px;
}
.color_yellow{
    color: #ffea00;
}
.red{
    color: #ff4c12;
}
.key{
    padding: 0 3px;
}
.topBar{
    background: #161331;
    padding: 0 10px;
}
.pl10{
    padding-left: 10px;
}
.banner-bg{
    width: 100%; height: auto;
}
.banner{
    position: absolute;
    width: 100%;
    top: 0; left: 0;
    padding: 75px 36px 0;
}
.countDown-box{
    position: absolute;
    bottom: 3px;
    left: 50%;
    width: 256px; height: 85px;
    margin-left: -128px;
    padding-top: 15px;
}
.countDown-box .table{
    padding: 0 10px;
    height: 60px;
}
.countDown-box .table-cell{
    vertical-align: middle;
}
.countDown-box .table-cell-2{
    padding: 0 5px;
}
.playBtn-box{
    padding: 22px 0 0;
}
.playBtn{
    width: 76%;
}
.box{
    margin: 42px auto 0;
    width: 90%;
    background: #fdf8da;
    border-radius: 5px;
    padding: 40px 20px 20px;
    position: relative;
}
.box-title{
    width: 268px; height: 42px;
    position: absolute;
    top: -21px; left: 50%;
    margin-left: -134px;
    background: url(/static/images/template_1/tit-bg.png) no-repeat 0 0;
    background-size: 100% auto;
    color: #fff;
    font-size: 16px;
    text-align: center;
}
.word{
    position: absolute;
    left: 50%;
}
.w0{
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
    top: 13px;
    margin-left: -30px;
}
.w1{
    -webkit-transform: rotate(5deg);
            transform: rotate(5deg);
    top: 15px;
    margin-left: -10px;
}
.w2{
    -webkit-transform: rotate(-5deg);
            transform: rotate(-5deg);
    top: 15px;
    margin-left: 10px;
}
.w3{
    -webkit-transform: rotate(-16deg);
            transform: rotate(-16deg);
    top: 12px;
    margin-left: 30px;
}
.inner{
    color: #4d3a1b;
    line-height: 22px;
}
.inner p{
    padding-top: 20px;
}
.inner p:first-child{
    padding-top: 0;
}
.inner .num{
    display: inline-block;
    text-align: center;
    width: 22px; height: 22px;
    border-radius: 50%;
    color: #fff;
    background: #ff4c12;
    margin-right: 5px;
}
.madeBtn{
    display: block;
    width: 100%; height: 48px;
    line-height: 48px;
    background: #ff4c12;
    position: fixed;
    bottom: 0; left: 0;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}
.ranking-table{
    margin-top: 15px;
}
.ranking-table th,
.ranking-table td{
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.ranking-table th{
    background: #e6c86b;
    color: #fff;
    font-weight: normal;
}
.ranking-table td{
    background: #f8eba9;
}
.icon-team{
    color: #4d3a1b;
    font-size: 20px;
    margin-right: 5px;
}

</style>