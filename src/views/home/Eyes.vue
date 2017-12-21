<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<img src="../../../static/img/jiuzainiyanqian.png" class="jiuzaiyanqian" />
		<img src="../../../static/img/guangyunbg.png" class="gybg" />
		<div class="yuanquan">
			<img src="../../../static/img/guangyun.png" class="guanyun" />
		</div>
		<div class="btns">
			<div class="title">想体验试试吗？</div>
			<img src="../../../static/img/jt_04.png" class="jiantou psv-marker-jiantou" />
			<img src="../../../static/img/btn_04.png" @click="goToImageRecognition" class="btn1" />
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
			this.toast("你是猪吗");
		},
		methods: {
			goToImageRecognition() {
				let self = this;
				self.$router.push({
					path: "imagerecognition",
				});
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
		.gybg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			z-index: 1;
		}
		.yuanquan {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 3;
			.guanyun {
				position: absolute;
				width: 80%;
				left: 50%;
				margin-left: -40%;
				top: -32px;
				z-index: 5;
				/*transform: translate3d(0, -20%, 0);
				-webkit-transform: translate3d(0, -20%, 0);*/
				margin-top: -18%;
				animation: myfirst 80s linear 0.5s infinite ;
				-webkit-animation: myfirst 80s linear 0.5s infinite alternate;
			}
		}
		.jiuzaiyanqian {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 3;
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: 32px;
			z-index: 4;
			.jiantou {
				position: absolute;
				width: 7%;
				top: 0;
				z-index: 2;
				left: 50%;
				margin-left: -3%;
				transform: translate3d(0, -100%, 0);
				-moz-transform: translate3d(0, -100%, 0);
				-webkit-transform: translate3d(0, -100%, 0);
				-o-transform: translate3d(0, -100%, 0);
			}
			.title {
				font-size: 48px;
				color: #7ef9ff;
				position: absolute;
				width: 100%;
				text-align: center;
				top: 0;
				z-index: 2;
				transform: translate3d(0, -350%, 0);
				/*-moz-transform: translate3d(0, -100%, 0);
				-webkit-transform: translate3d(0, -100%, 0);
				-o-transform: translate3d(0, -100%, 0);*/
			}
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
	
	@keyframes myfirst {
		from {
			transform: rotate(0deg); //w3c标准  
			-webkit-transform: rotate(0deg); //webkit内核的safari和chrome  
		}
		to {
			transform: rotate(360deg); //w3c标准  
			-webkit-transform: rotate(360deg); //webkit内核的safari和chrome  
		}
	}
</style>