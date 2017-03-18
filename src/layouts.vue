<template>
    <div class="container">
        <router-view></router-view>
        <div class="fixed">
            <span class="iconfont icon-gotop gotop" @click="gotop"></span>
            <router-link :to="{name: 'mine'}" class="iconfont icon-account account mt10"></router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    components: {  },
    created: function () {
        
    },
    methods: {
        gotop: function(){
            var timer=setInterval(function(){ 
                    document.body.scrollTop-=Math.ceil(document.body.scrollTop*0.1); 
                    if(document.body.scrollTop==0) clearInterval(timer); 
            },10); 
        }
    }
}
</script>

<style>
@import '/static/font/iconfont.css';
body,
div,
p,
ul,
li,
a,
img,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
input,
textarea,
button,
span{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 14px;
    font-weight: normal;
}

button {
    outline: none;
}

input[type="radio"]{
    margin: 0 5px 0 0;
}
body,
html {
    display: block;
    height: 100%;
    background: #f2f5f8;
}

body {
    color: #333;
    -webkit-font-smoothing: antialiased;
    font: 14px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
}
ul, li{
    list-style: none;
}
img{
    vertical-align: middle;
}
a{
    color: #333;
    text-decoration: none;
}
.clearfix:before,
.clearfix:after{
    content: " ";
    display:block;
    height: 0;
    line-height: 0;
    clear: both;
}
.f12{
    font-size: 12px;
}
.fl {
    float: left
}

.fr {
    float: right
}
.text-center{
    text-align: center;
}
.text-right{
    text-align: right;
}
.mt10{
    margin-top: 10px;
}
.bg_fff{
    background: #fff;
}
.color_666{
    color: #666;
}
.color_gray{
    color: #a5a5a5;
}
.table{
    display: table;
}
.table-row{
    display: table-row;
}
.table-cell{
    display: table-cell;
}
.w100{
    width: 100%;
}
.overflow-hidden{
    overflow: hidden;
}
.clamp1{
    display: block;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.clamp2{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    height: 42px;
}
.clamp3{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
}
.container{
    width: 100%; max-width: 640px;
    margin: 0 auto;
}
/* header */
.header{
    height: 40px;
    line-height: 40px;
    background: #ffb400;
    position: relative;
}
.header-title{
    text-align: center;
    color: #fff;
    font-size: 16px;
}
.header-goback,
.header-service{
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    color: #fff;
}
.header-goback{
    left: 10px;
}
.header-service{
    right: 10px;
}
.fixed{
    position: fixed;
    right: 10px;
    bottom: 100px;
    width: 45px;
}
.fixed .gotop,
.fixed .account{
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
}
</style>










