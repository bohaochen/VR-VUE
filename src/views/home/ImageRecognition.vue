<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />

		<div>
			
		</div>

		<div class="btns">
			<img src="../../../static/img/btn_04.png" @click="mashangtansuo" class="btn1" />
		</div>
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
			mashangtansuo() {
				//马上探索
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
		.btns {
			width: 100%;
			position: absolute;
			bottom: 32px;
			z-index: 4;
			.btn1 {
				width: 50%;
				display: block;
				margin: auto;
			}
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