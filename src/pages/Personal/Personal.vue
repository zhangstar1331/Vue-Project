<template>
	<div>欢迎来到{{userInfo.name}}的个人主页</div>
</template>
<script>
	import {mapState} from 'vuex';
	export default {
		computed:{
			...mapState(['userInfo'])
		}
	}
</script>
<style type="stylesheet/stylus" lang="stylus">

</style>