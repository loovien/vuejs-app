<template>
    <div class="wrap">
        <router-view></router-view>
        <fixed :options="{account: false}"></fixed>
    </div>
</template>
<script>
	import Fixed from '../shared/fixed.vue'

	export default {
		components: { Fixed }
	}
</script>