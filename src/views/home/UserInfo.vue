<template>
	<div class="content-father">
		<div class="content" v-show="isInfoPage">
			<div class="bg"></div>
			<img src="../../../static/img/pn_logo_03.png" class="logo" />
			<img src="../../../static/img/cj_01.png" class="cjts" />
			<div class="join-box">
				<img src="../../../static/img/cj_02.png" class="b-bg">
				<input v-model="phone" class="put-text-ipone" placeholder="请输入你的手机号" />
				<input v-model="name" class="put-text-name" placeholder="请输入你的姓名" />
				<div class="put-text-box">
					请确保填写正确的手机号，以便中奖后工作人员与您取得联系。
				</div>
				<div class="btns">
					<img src="../../../static/img/cj_04.png" @click="checkPhone" class="btn" />
				</div>
			</div>
		</div>
		<div class="content1" v-show="isLuckPage">
			<div class="bg"></div>
			<img src="../../../static/img/pn_logo_03.png" class="logo" />
			<div class="hj-box">
				<div class="hj-img-box">
					<img src="../../../static/img/cj_05.png" class="hj-img" />
					<img src="../../../static/img/cj_gxn.png" class="hj-img-wz" v-show="isLuck" />
					<img src="../../../static/img/cj_hyh.png" class="hj-img-wz" v-show="!isLuck" />
					<span class="hj-text" :class="{huishe:!isLuck}">
					{{drawText}}
				</span>
				</div>

				<div class="ms-box">
					<h1>· 活动规则</h1>
					<ul>
						<li>1.每人仅有一次参与中奖机会;</li>
						<li>2.中奖用户，我们会在活动结束后的5个工作日内与您联系;</li>
						<li>3.中奖流量和手机话费，活动结束后10个工作日内充值至您的手机号码;</li>
						<li>4.活动时间：<span class="bbColor">即日起——2018年1月10日</span></li>
						<li>5.本次活动实时动态会更新在平安脸谱微信公众号(PAtianxiatong);</li>
						<li>6.活动禁止任何形式作弊，一经发现取消中奖资格;</li>
						<li>7.本活动解释权归平安脸谱所有。</li>
						<li>8.奖品设置</li>
					</ul>
					<div class="jp-box">
						<span>黑科技奖</span>
						<span>Apple Iphone X</span>
						<span>勇于探索奖</span>
						<span>小米摄像头小白智能摄像机</span>
						<span>勇于实践奖</span>
						<span>金士顿U盘</span>
						<span>开拓创新奖</span>
						<span>20元话费</span>
						<span>眼光独到奖</span>
						<span>流量20M</span>
					</div>
				</div>
			</div>

			<div class="btns">
				<!-- <div class="btns hidden"> -->
				<img src="../../../static/img/cj_06.png" @click="goToImagerecognition" class="btn1" />
				<img src="../../../static/img/cj_07.png" @click="share" class="btn2" />
			</div>
			<div class="share-it" v-show="isSharePage" @click="share">
				<img src="../../../static/img/share-it.png" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				name: "",
				drawText: "",
				isInfoPage: true,
				isLuckPage: false,
				isSharePage: false,
				isLuck: true
			};
		},
		mounted() {},
		methods: {
			jieping() {
				console.log("什么鬼");
			},
			drawNum(num) {
				var _this = this;
				console.log(num);
				var numType = parseInt(num);
				switch(numType) {
					case 0:
						_this.isLuck = false;
						_this.drawText = "您离iPhoneX只有一步之遥";
						break;
					case 1:
						_this.drawText = "获得勇于探索奖";
						break;
					case 2:
						_this.drawText = "获得勇于实践奖";
						break;
					case 3:
						_this.drawText = "获得开拓创新奖";
						break;
					case 4:
						_this.drawText = "获得眼光独到奖";
						break;
					default:
						break;
				}
			},
			checkPhone(phoneStr, nameStr) {
				var _this = this;
				if(!/^1[34578]\d{9}$/.test(_this.phone)) {
					_this.toast("请正确填写手机号码");
					console.log("请正确填写手机号码");
					return false;
				}
				if(
					/^[a-zA-Z ]{1,20}$/.test(_this.name) ||
					/^[\u4e00-\u9fa5]{1,10}$/.test(_this.name)
				) {} else {
					this.toast("请正确填写姓名");
					console.log("请正确填写姓名");
					return false;
				}
				let openid = window.localStorage.getItem("openid");
				_this.$http
					.post(
						"v1/em?action=update_userinfo&uid=" +
						openid +
						"&phone=" +
						_this.phone +
						"&name=" +
						_this.name
					)
					.then(function(response) {
						console.log(response);
						if(response.data.code == 200) {
							_this.$http
								.post("v1/em?action=draw&uid=" + openid)
								.then(function(response) {
									console.log(response);
									switch(response.data.code) {
										case 100:
											_this.toast("用户不存在");
											break;
										case 102:
											_this.toast("没有录入用户信息");
											break;
										case 103:
											_this.toast("还没做人脸对比");
											break;
										case 104:
//											_this.toast("已经抽过奖");
											_this.toast("你已经参与过活动,分享邀请好友一起参与吧");
											_this.drawNum(response.data.draw);
											break;
										default:
											_this.drawNum(response.data.draw);
											break;
									}
								})
								.catch(function(error) {
									console.log(error);
								});
							_this.goToLuckdraw();
						} else {
							console.log("接口返回错误");
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			goToLuckdraw() {
				//页面跳转
				let self = this;
				self.isInfoPage = false;
				self.isLuckPage = true;
			},
			goToImagerecognition() {
				//页面跳转
				let self = this;
				// 带查询参数，变成 /register?plan=private
				self.$router.push({
					path: "imagerecognition"
				});
			},
			share() {
				if(this.isSharePage) {
					this.isSharePage = false;
				} else {
					this.isSharePage = true;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	input::-webkit-input-placeholder {
		color: #16a5a3;
		opacity: 1;
	}
	
	.content {
		width: 100%;
		height: 100%;
		background-color: #000000;
		overflow: auto;
		position: absolute;
		background: url(../../../static/img/bg.jpg) 50%/cover;
		animation: fuxian 1s;
		top: 0px;
		/*.bg {
			width: 100%;
			height: 100%;
			background: url(../../../static/img/bg.jpg) no-repeat center center;
			background-size: 120% 120%;
			position: absolute;
			top: 0;
			z-index: 1;
		}*/
		.logo {
			width: 26%;
			position: fixed;
			top: 2.5%;
			right: 20px;
			z-index: 2;
		}
		.cjts {
			width: 86%;
			position: relative;
			top: 0;
			z-index: 2;
			left: 50%;
			margin-left: -43%;
			margin-top: 18%;
		}
		.join-box {
			position: relative;
			z-index: 2;
			width: 100%;
			top: 0;
			margin-top: 6%;
			margin-bottom: 64px;
			.b-bg {
				width: 100%;
			}
			.put-text-ipone {
				width: 72%;
				height: 107px;
				position: absolute;
				top: 13%;
				left: 50%;
				margin-left: -36%;
				color: #16a5a3;
				font-size: 32px;
				outline: none;
				line-height: 90px;
				border: 0px;
				background: url("../../../static/img/cj_03.png");
				background-size: 100% 100%;
				padding: 0px 45px;
				box-sizing: border-box;
			}
			.put-text-name {
				width: 72%;
				height: 107px;
				position: absolute;
				top: 30%;
				left: 50%;
				margin-left: -36%;
				color: #16a5a3;
				font-size: 32px;
				outline: none;
				line-height: 90px;
				border: 0px;
				background: url("../../../static/img/cj_03.png");
				background-size: 100% 100%;
				padding: 0px 45px;
				box-sizing: border-box;
			}
			.put-text-box {
				color: #16a5a3;
				font-size: 24px;
				position: absolute;
				top: 46%;
				width: 72%;
				left: 50%;
				margin-left: -36%;
				margin-top: 32px;
			}
			.btn {
				width: 66%;
				position: absolute;
				bottom: 14%;
				left: 50%;
				margin-left: -33%;
				pointer-events: auto;
			}
		}
	}
	
	.content1 {
		width: 100%;
		height: 100%;
		background-color: #000000;
		overflow: hidden;
		position: absolute;
		top: 0px;
		overflow: auto;
		animation: fuxian 1s;
		.share-it {
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 9999;
			top: 0px;
			background: rgba(0, 0, 0, 0.7);
			img {
				position: absolute;
				right: 20px;
				top: 20px;
			}
		}
		.bg {
			width: 100%;
			height: 100%;
			background: url(../../../static/img/bg.jpg) 50%/cover;
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
		.hj-img-box {
			width: 100%;
			position: relative;
		}
		.hj-box {
			width: 90%;
			position: relative;
			margin-left: 5%;
			margin-top: 14%;
			z-index: 2;
		}
		.hj-img {
			width: 100%;
			position: relative;
		}
		.hj-img-wz {
			width: 100%;
			position: absolute;
			top: 0%;
		}
		.hj-text {
			font-size: 48px;
			color: #e46321;
			display: block;
			position: absolute;
			width: 100%;
			font-weight: bold;
			top: 60%;
			margin-top: -20px;
			text-align: center;
		}
		.ms-box {
			width: 92%;
			margin-left: 4%;
			margin-top: 3%;
			top: 30%;
			color: #28b1b7;
			z-index: 2;
		}
		h1 {
			color: #35e8f1;
		}
		ul {
			list-style-type: none;
			padding: 10px 0px;
		}
		li {
			line-height: 34px;
			font-size: 19px;
			color: #5ab1b0;
		}
		.bbColor {
			color: #c75c26;
		}
		.jp-box {
			width: 100%;
			color: #5ab1b0;
			border: 1px #5ab1b0 solid;
			overflow: hidden;
			span {
				width: 50%;
				display: block;
				float: left;
				text-align: center;
				line-height: 34px;
				box-sizing: border-box;
				line-height: 40px;
				border: 1px #5ab1b0 solid;
			}
		}
		.btns {
			width: 100%;
			position: relative;
			z-index: 2;
			margin-bottom: 5%;
			top: 3.5%;
			.jiantou {
				position: absolute;
				width: 7%;
				top: 0;
				z-index: 2;
				left: 50%;
				margin-left: -3%;
				animation: fudong 5s linear infinite alternate;
				transform: translate3d(0, -100%, 0);
				-moz-transform: translate3d(0, -100%, 0);
				-webkit-transform: translate3d(0, -100%, 0);
				-o-transform: translate3d(0, -100%, 0);
			}
			.btn1,
			.btn2 {
				width: 66%;
				display: block;
				margin: auto;
				pointer-events: auto;
			}
		}
	}
	
	.huishe {
		color: #bdbdbd !important;
		font-size: 42px !important;
	}
</style>