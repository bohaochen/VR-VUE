<template>
	<div class="content" id="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<div class="relative_box">
			<img src="../../../static/img/ai_gs.jpg" class="longImage" />

			<div class="btns">
				<!-- <div class="btns hidden"> -->
				<img src="../../../static/img/aiStoryText.png" class="wenzi-text" alt="">
				<img src="../../../static/img/jt_04.png" class="jiantou psv-marker-jiantou" />
				<img src="../../../static/img/houmianyougecaidan.png" @click="goToImagerecognition" class="btn1" />
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				wordArr: [],
				isTouch: true,
				isOutPage: false,
				isShowBtns: false
			};
		},
		mounted() {
			var _this = this;
			_this.ontouchFn();
			setTimeout(function() {
				var scollFn = setInterval(function() {
					if(_this.isTouch) {
						_this.scollUp();
					}
					if(_this.isOutPage) {
						clearInterval(scollFn)
						console.log(clearInterval)
					}
				}, 20);
			}, 1500);
			var dom = document.getElementById("content");
			document.getElementById("content").onscroll = function() {
				if((dom.scrollHeight - dom.scrollTop) < ((dom.clientHeight) * 1.25)) {
					document.getElementsByClassName("wenzi-text")[0].style.display = "block";
				}
				if((dom.scrollHeight - dom.scrollTop) < ((dom.clientHeight) * 1.2)) {
					setTimeout(function() {
						document.getElementsByClassName("jiantou")[0].style.opacity = "1";
					}, 500)
				}
				if((dom.scrollHeight - dom.scrollTop) < ((dom.clientHeight) * 1.15)) {
					setTimeout(function() {
						document.getElementsByClassName("btn1")[0].style.opacity = "1";
					}, 1000)
				}
			}
		},
		beforeDestroy: function() {
			this.isOutPage = true;
		},
		methods: {
			scollUp() {
				var _this = this;
				var dom = document.getElementsByClassName("content")[0];
				var y = dom.scrollTop;
				dom.scrollTop = y + 4;
			},
			goToImagerecognition() {
				//页面跳转
				let self = this;
				// 带查询参数，变成 /register?plan=private
				self.$router.push({
					path: "userinfo",
				});
				//				if(self.$route.query.isIndex == 0) {
				//					self.$router.push({
				//						path: "imagerecognition",
				//						query: {
				//							isIndex: 0,
				//						}
				//					});
				//				} else {
				//					self.$router.push({
				//						path: "userinfo",
				//					});
				//				}
			},
			ontouchFn() {
				var _this = this;

				function stopOrPlay() {
					if(_this.isTouch == true) {
						_this.isTouch = false;
						window.stopScollFn = setTimeout(function() {
							_this.isTouch = true;
						}, 2000);
					} else {
						try {
							clearTimeout(stopScollFn);
						} catch(e) {
							console.log("firstTouch");
						}
						window.stopScollFn = setTimeout(function() {
							_this.isTouch = true;
						}, 2000);
					}
				}
				document.body.ontouchstart = function() {
					_this.isTouch = false;
				};
				document.body.ontouchmove = function() {
					_this.isTouch = false;
				};
				document.body.ontouchend = function() {
					stopOrPlay();
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #000000;
		overflow: auto;
		position: relative;
		.bg {
			width: 100%;
			height: 100%;
			background: #0a0f13;
			position: fixed;
			top: 0;
			z-index: 1;
		}
		.logo {
			width: 26%;
			position: absolute;
			top: 2.5%;
			right: 20px;
			z-index: 2;
		}
		.longImage {
			width: 100%;
			z-index: 1;
			height: auto;
			position: relative;
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: 64px;
			z-index: 2;
			.jiantou {
				position: absolute;
				width: 7%;
				top: 0;
				z-index: 2;
				display: block;
				left: 50%;
				opacity: 0;
				transition: all 1s;
				margin-left: -3%;
				animation: 1s linear inherit alternate;
				transform: translate3d(0, -100%, 0);
				-moz-transform: translate3d(0, -100%, 0);
				-webkit-transform: translate3d(0, -100%, 0);
				-o-transform: translate3d(0, -100%, 0);
			}
			.wenzi-text {
				position: absolute;
				width: 80%;
				margin-left: 10%;
				display: none;
				animation: fuxian 1s;
				bottom: 333px;
			}
			.btn1,
			.btn2 {
				width: 66%;
				display: block;
				opacity: 0;
				margin: auto;
				transition: all 1s;
				pointer-events: auto;
			}
		}
		.relative_box {
			position: relative;
			width: 100%;
		}
		@keyframes fudong {
			from {
				transform: translate(0, -100%);
				opacity: 0;
			}
			to {
				transform: translate(0, -120%);
				opacity: 1;
			}
		}
		@keyframes fuxian {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}
</style>