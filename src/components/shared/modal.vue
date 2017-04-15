<template>
<transition name="modal">
	<div class="modal-mask">
		<div class="modal-wrapper">
			<div class="modal-container" :class="[modal.size, modal.className]" :style="{width: modal.width}">
	            <!--头部-->
	            <div class="modal-header">
	                <slot name="header">
	                    <p class="title">{{modal.title}}</p>
	                    <span class="close" @click="close"></span>
	                </slot>
	            </div>
	            <!--内容区域-->
	            <div class="modal-body">
	                <slot name="body">{{modal.content}}</slot>
	            </div>
	            <!--尾部,操作按钮-->
	            <div class="modal-footer clearfix" v-if="modal.showCancelButton || modal.showConfirmButton">
	                <slot name="button">
	                	<a v-if="modal.showConfirmButton" href="javascript:void(0)" class="btn ok-btn btn-small fr btn-blue" :class="modal.confirmButtonClass" @click="ok">{{modal.confirmButtonText}}</a>
	                	<a v-if="modal.showCancelButton" href="javascript:void(0)" class="btn cancel-btn btn-small fl btn-default btn-cancel" :class="modal.cancelButtonClass" @click="close()">{{modal.cancelButtonText}}</a>
	                </slot>
	            </div>
	        </div>
	    </div>
    </div>
</transition>
</template>

<script>
export default {
    data() {
    	var opts = this.modalOptions;

	    return {
	        modal: {
	        	className: typeof opts.className === 'undefined' ? '' : opts.className,
	        	width: typeof opts.width === 'undefined' ? '' : opts.width,
	        	size: opts.size || 'middle',
	        	title: opts.title || '提示',
	        	showClose: typeof opts.showClose === 'undefined' ? true : opts.showClose,
	        	content: opts.content || '',
		        showCancelButton: typeof opts.showCancelButton === 'undefined' ? true : opts.showCancelButton,
		        cancelButtonClass: opts.cancelButtonClass ? opts.cancelButtonClass : '',
		        cancelButtonText: opts.cancelButtonText ? opts.cancelButtonText : '取消',
		        showConfirmButton: typeof opts.showConfirmButton === 'undefined' ? true : opts.showConfirmButton,
		        confirmButtonClass: opts.confirmButtonClass ? opts.confirmButtonClass : '',
		        confirmButtonText: opts.confirmButtonText ? opts.confirmButtonText : '确定'
	        }
	    };
	},
    props: ['modalOptions'],
    created: function(){

    },
	computed: {
		
	},
	methods: {
	    close: function() {
	    	this.$emit('close')
	    },
	    //点击确定按钮
	    ok: function(){
	    	this.$emit('ok')
	    }
	},
}
</script>

<style>
.ok-btn{
	background: url('/static/images/template_1/modal-btn-bg.jpg');
	background-size: 100% 100%;
	border: 2px solid #7b4506;
	border-radius: 6px;
	color: #5e1c08;
	height: 46px;
	line-height: 42px;
}
.cancel-btn{
	background: #ccc;
}
.modal-mask {
	position: fixed;
	z-index: 3;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
	transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
	margin: 0px auto;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .3s ease;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-dialog,
.modal-leave-active .modal-dialog {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-header{
	background: url('/static/images/template_1/modal-title-bg.png');
	background-size: 100% auto;
	position: relative;
}
.close{
	position: absolute;
	right: 10px;
	top: 0;
	width: 40px; height: 40px;
	text-align: center;
	cursor: pointer;
	background: url('/static/images/template_1/modal-close.png');
	background-size: 100% 100%;
}
.modal-body{
	background: #fff;
	color: #333;
}
.modal-footer{
	text-align: right;
	background: #fff;
}
.btn-cancel{
	margin-right: 10px;
}

.modal-title{
	font-size: 18px;
	font-weight: bold;
	color: #5e1c08;
	text-align: center;
}
.modal-container.middle{
	width: 800px;
}
.middle .modal-header{
	padding: 15px;
}
.middle .modal-body{
	height: 500px;
	overflow-y: auto;
}
.middle .modal-footer{
	padding: 15px;
	background: #f5f5f5;
}
.modal-container.mini{
	width: 300px;
}
.mini .modal-header{
	padding: 10px 15px;
}
.mini .modal-body{
	padding: 15px;
}
.mini .modal-footer{
	padding: 15px;
}

.qrcodeModal .close{
    top: 10px;
    margin-top: 0;
}
</style>











