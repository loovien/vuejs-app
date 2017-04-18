<template>
    <div class="wrap">
        <router-view></router-view>
        <fixed :options="{account: false, home: true}"></fixed>
    </div>
</template>
<script>
	import Fixed from '../shared/fixed.vue'

	export default {
		components: { Fixed }
	}
</script>