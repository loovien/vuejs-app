<template>
	<div class="inner">
		<span class="iconfont icon-404"></span>
		<p class="text">抱歉！您访问的页面不存在……</p>
		<div>
			<router-link :to="{name: 'home'}" class="btn">去首页</router-link>
		</div>
	</div>
</template>

<style scoped>
	.inner{
		position: absolute;
		width: 100%;
		text-align: center;
		top: 50%; left: 0;
		-webkit-transform: translateY(-50%);
            	transform: translateY(-50%);
	}
	.inner .icon-404{
		font-size: 80px;
		line-height: 80px;
	}
    .text {
        color: #ffb400;
    }
    .inner .btn{
    	display: inline-block;
    	width: 100px;
    	margin: 20px auto;
    	font-weight: normal;
    }
</style>
