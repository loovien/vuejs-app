<template>
    <div class="fixed">
        <span class="save" v-show="save" @click="saveEvent">保存</span>
        <span class="back mt10" v-show="back" @click="backEvent">返回</span>
        <span class="iconfont icon-gotop gotop mt10" @click="topEvent" v-show="gotop"></span>
        <router-link :to="{name: 'mineIndex'}" class="account mt10" v-show="account">
            <span class="iconfont icon-account"></span>
            <span class="block f12">我的</span>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['options'],
    data() {
        var opt = this.options || {};

        return {
            back: typeof opt.back === 'undefined' ? false : opt.back,
            save: typeof opt.save === 'undefined' ? false : opt.save,
            gotop: typeof opt.gotop === 'undefined' ? true : opt.gotop,
            account: typeof opt.account === 'undefined' ? true : opt.account
        }
    },
    mounted() {
        
    },
    methods: {
        topEvent: function(){
            var timer=setInterval(function(){ 
                    document.body.scrollTop-=Math.ceil(document.body.scrollTop*0.1); 
                    if(document.body.scrollTop==0) clearInterval(timer); 
            },10); 
        },
        saveEvent: function(){
            this.$emit('saveEvent')
        },
        backEvent: function(){
            window.history.go(-1)
        }
    },
    computed: {}
}
</script>

<style scoped>

.fixed{
    position: fixed;
    right: 10px;
    bottom: 100px;
    width: 45px;
}
.fixed .gotop,
.fixed .account,
.fixed .save,
.fixed .back{
    display: block;
    width: 45px; height: 45px;
    border-radius: 50%;
    text-align: center;
    line-height: 43px;
}
.fixed .gotop{
    background: rgba(255,255,255,.8);
    border: 1px solid #eee;
    color: #757575;
}
.fixed .account{
    background: rgba(255,180,0,.8);
    color: #fff;
    line-height: 16px;
    padding: 5px 0 0 0;
}
.fixed .save,
.fixed .back{
    background: rgba(0,0,0,.7);
    color: #fff;
}
.fixed .save:hover, .fixed .save:active,
.fixed .back:hover, .fixed .back:active{
    background: rgba(255,180,0,.8);
    color: #fff;
}
</style>
