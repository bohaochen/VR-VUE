<template>
	<div class="content malfunction3">
		<div class="bg"></div>
		<img src="../../assets/img/qiu.png" class="qiu" />
		<img ref="test" src="../../assets/img/pn_logo_03.png" class="logo animated bounceInRight" />
		<img src="../../assets/img/wzh3j_01.png" class="sanjiao animated" v-show="sjAni" :class="{slideInDown:sjAni}">
		<img src="../../assets/img/wz_01.png" class="heikeji" />
		<img src="../../assets/img/zj_01.png" class="jingweidu" />
		<div class="btns">
			<img src="../../assets/img/jt_04.png" class="jiantou" />
			<img src="../../assets/img/btn_04.png" @click="goToVr" class="btn1" />
			<img src="../../assets/img/btn_06.png" class="btn2" />
		</div>
	</div>
</template>

<script>
	import html2canvas from "html2canvas";
	export default {
		data() {
			return {
				sjAni: false,
			};
		},
		mounted() {
			//页面加载完成回调
			let self = this;
			//获取页面ref属性DOM(类似于查找id)
			let _rect = self.$refs.test;
			//监听动画执行回调
			self.MA(_rect, function() {
				console.log('动画执行完毕！');
				self.sjAni = true;
			});
			this.malfunction();
		},
		methods: {
			goToVr() {
				//页面跳转
				let self = this;
				// 带查询参数，变成 /register?plan=private
				self.$router.push({
					path: 'vr',
					query: {
						plan: 'private'
					}
				})
			},
			malfunction() {
				// document.getElementsByClassName("malfunction")[0].
				// transform: translate(-40px,0px)  scale(1)  ;
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
			background: url(../../assets/img/bg.jpg) 50%/cover;
			position: absolute;
			top: 0;
			z-index: 1;
			animation: myfirst 2s linear 0.5s infinite alternate;
			-moz-animation: myfirst 2s linear 0.5s infinite alternate;
			-webkit-animation: myfirst 2s linear 0.5s infinite alternate;
			-o-animation: myfirst 2s linear 0.5s infinite alternate;
		}
		.heikeji {
			width: 90%;
			margin-left: 5%;
			height: auto;
			position: absolute;
			top: 0;
			z-index: 3;
		}
		.jingweidu {
			width: 90%;
			margin-left: 5%;
			margin-top: 5%;
			height: auto;
			position: absolute;
			top: 0;
			z-index: 4;
		}
		.logo {
			width: 26%;
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 2;
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: 32px;
			z-index: 2;
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
			.btn1,
			.btn2 {
				width: 50%;
				display: block;
				margin: auto;
			}
		}
		.sanjiao {
			width: 100%;
			height: auto;
			position: absolute;
			top: 0;
			z-index: 2;
			/*animation: sanjiaoFD 1s linear 0.5s infinite alternate;
			-moz-animation: sanjiaoFD 1s linear 0.5s infinite alternate;
			-webkit-animation: sanjiaoFD 1s linear 0.5s infinite alternate;
			-o-animation: sanjiaoFD 1s linear 0.5s infinite alternate;*/
		}
		.qiu {
			width: 90%;
			margin-left: 5%;
			margin-top: 5%;
			height: auto;
			position: absolute;
			top: 0;
			z-index: 2;
		}
	}

	.malfunction1{
		animation: malfunction1 0.001s linear infinite alternate;
	}

	.malfunction2{
		animation: malfunction2 0.001s linear infinite alternate;
	}

	.malfunction3{
		animation: malfunction3 1s linear 3 alternate;
	}

	.malfunction4{
		animation: malfunction4 0.001s linear infinite alternate;
	}
	
	@keyframes sanjiaoFD {
		from {
			transform: translate3d(0, 5px, 0);
			-moz-transform: translate3d(0, 5px, 0);
			-webkit-transform: translate3d(0, 5px, 0);
			-o-transform: translate3d(0, 5px, 0);
		}
		to {
			transform: translate3d(0, -5px, 0);
			-moz-transform: translate3d(0, -5px, 0);
			-webkit-transform: translate3d(0, -5px, 0);
			-o-transform: translate3d(0, -5px, 0);
		}
	}
	
	@keyframes myfirst {
		from {
			opacity: 1;
		}
		to {
			opacity: 0.45;
		}
	}
	
	@keyframes malfunction1 {
		0% {
			transform: translate(30px,0);
		}
		100% {
			transform: translate(-2px,-3px);
		}
	}

	@keyframes malfunction2 {
		0% {
			transform: translate(-40px,0);
		}
		100% {
			transform: translate(-30px,-3px);
		}
	}
	
	@keyframes malfunction3 {
		0% {
			transform: translate(30px,0);
		}
		100% {
			transform: translate(-2px,-3px);
		}
	}

	@keyframes malfunction4 {
		0% {
			transform: translate(30px,0);
		}
		100% {
			transform: translate(-2px,-3px);
		}
	}
	
</style>