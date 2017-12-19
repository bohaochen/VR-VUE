<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				wordArr: [],
			};
		},
		mounted() {

		},
		methods: {
			jieping() {

			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #000000;
		overflow: hidden;
		position: relative;
		.bg {
			width: 100%;
			height: 100%;
			background: url(../../../static/img/bg.jpg) 50%/cover;
			position: absolute;
			top: 0;
			z-index: 1;
		}
		.logo {
			width: 26%;
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 2;
		}
	}
</style>