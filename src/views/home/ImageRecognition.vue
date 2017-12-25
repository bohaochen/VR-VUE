<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />

		<div class="album">
			<div v-show="isRead" class="score_box animated">
				<div class="score score_1">1111</div>
				<div class="score score_2">111</div>
				<div class="score score_3">1111</div>
			</div>

			<!--<img class="waikuang" src="../../../static/img/renlianshibiekuangdeng.png" />-->
			<img class="waikuang" src="../../../static/img/renlianshibiekuangdengwu.png" />
			<img src="../../../static/img/guangdian.png" class="waikuangleftdian" />
			<img src="../../../static/img/guangdian.png" class="waikuangrightdian" />

			<div class="album-content">
				<div class="title" v-show="!base64Img">点击上传个人正面自拍照</div>
				<img :src="base64Img" ref="imgsss" class="imgsss" />
		<image-clipper ref="clipper" v-show="visible" :img="imgUrl"  @sure="sure"></image-clipper>
				
				<div class="upload">
					<input ref="upload" @change="start_upload(this)" type="file" name="upload" accept="image/*">
				</div>
			</div>
			<div class="upload-end" v-show="isUpload">
				<img src="../../../static/img/saomiao.png" class="saomiao-animate" />
			</div>
		</div>

		<div class="btns" :style="{display:isUnUpload ? 'block' : 'none'}">
			<img src="../../../static/img/querenceshi.png" @click="mashangtansuo" class="btn1" />
		</div>

		<div class="sb-btn animated" v-show="isUpload">
			<!--<img src="../../../static/img/titlebg.png" class="btn1" />-->
			<img src="../../../dist/static/img/titlebg1.png" class="btn1">
			<img src="../../../static/img/xiegang.png" class="xiegang" />
			<span class="is-cs">正在启动分析...</span>
		</div>

		<div class="sb-btn animated" v-show="isRead">
			<img src="../../../static/img/titlebg1.png" class="btn1" />
			<div class="star">
				<img class="starImg" src="../../../static/img/xingxing.png">
			</div>
		</div>

		<img v-show="chaoshi" src="../../../static/img/sbsb_1.png" class="sbsbsb" />
		<img v-show="cuowu" src="../../../static/img/sbsb_2.png" class="sbsbsb" />

		<img class="cntu" v-show="isRead" src="../../../static/img/cntu_bc.png">
		<img class="cntu" v-show="!isRead&&isPageOut" src="../../../static/img/cntu_ewm.png">

		<img class="html_img" :src="htmlImg" :style="{display:htmlImg ? 'block' : 'none'}">

		<div class="zd-xh" v-show="isPageOut" @click="goToUserInfo">
			<div class="zd-xh-text-box">
				<span class="zd-xh-text">
          接收到重大信号，点击接收！
        </span>
				<img class="zd-xh-box" src="../../../static/img/xinhaodantanchuang.png">
			</div>
			<img class="zd-xh-btn" src="../../../static/img/redbtn.png">
		</div>
	</div>

</template>

<script>
	//	import html2canvas from "html2canvas";
	export default {
		data() {
			return {
				visible: true,
				sure:false,
				imgUrl: '../../../static/img/guangyun.png',
				quality: 0.5,
				isUnUpload: false,
				chaoshi: false,
				cuowu: false,
				isUpload: false,
				isRead: false,
				isPageOut: false,
				base64Img: null,
				htmlImg: "",
				scoreArray: [{
						minScore: -1,
						maxScore: 0.1,
						starNum: 0,
						starMsg: ["竟然一点神秘感也没有？", "！！！", "WTF！！！"]
					},
					{
						minScore: 0.1,
						maxScore: 0.12,
						starNum: 5,
						starMsg: ["思想深不可测", "周围人的精神信仰", "神盾局局长就是你？"]
					},
					{
						minScore: 0.12,
						maxScore: 0.14,
						starNum: 4,
						starMsg: ["plan B计划不离手", "心思细腻到令人咋舌", "瞬间秒杀一票人的智商情商各种商"]
					},
					{
						minScore: 0.14,
						maxScore: 0.15,
						starNum: 4,
						starMsg: ["做别人所不能", "想别人不敢想", "永远在常人的理解范围以外"]
					},
					{
						minScore: 0.15,
						maxScore: 0.17,
						starNum: 1,
						starMsg: ["绝不藏着掖着", "该哭就哭该笑就笑", "一辈子的乐天派"]
					},
					{
						minScore: 0.17,
						maxScore: 0.19,
						starNum: 1,
						starMsg: ["一眼就被看穿", "心思单纯", "简简单单地像个长不大的孩子"]
					},
					{
						minScore: 0.19,
						maxScore: 0.2,
						starNum: 2,
						starMsg: ["太过正经", "偶尔活泼", "肯定超多人喜欢你这闷骚的小人"]
					},
					{
						minScore: 0.2,
						maxScore: 0.22,
						starNum: 3,
						starMsg: ["及时出手", "及时出现", "总能在关键时刻解决重要问题"]
					},
					{
						minScore: 0.22,
						maxScore: 0.24,
						starNum: 3,
						starMsg: ["时冷时热", "若即若离", "看透你比和阿尔法狗下棋还需要勇气"]
					},
					{
						minScore: 0.24,
						maxScore: 0.25,
						starNum: 3,
						starMsg: ["逢人只说三分话", "从不全抛一颗心", "只有神探夏洛克才能挖掘真实的你"]
					},
					{
						minScore: 0.25,
						maxScore: 0.27,
						starNum: 3,
						starMsg: ["你的心思不好猜", "你的话不好懂", "你的人需要X教授才能破解"]
					},
					{
						minScore: 0.27,
						maxScore: 0.29,
						starNum: 3,
						starMsg: ["掩藏着数不尽的故事", "经历过别人没有的岁月", "极致的内心亟待有缘人破解"]
					},
					{
						minScore: 0.29,
						maxScore: 0.3,
						starNum: 3,
						starMsg: ["时而安静", "时而热烈", "内心有一匹野马急需一片草原"]
					},
					{
						minScore: 0.3,
						maxScore: 0.32,
						starNum: 2,
						starMsg: ["总有新惊喜", "时常新变化", "了解你就像走进一个宝藏"]
					},
					{
						minScore: 0.32,
						maxScore: 0.34,
						starNum: 1,
						starMsg: ["经常面无表情", "看似神秘", "一开口就让这辈子的神秘感化为云朵飘走了～"]
					},
					{
						minScore: 0.34,
						maxScore: 0.35,
						starNum: 1,
						starMsg: ["一副冰块脸", "不喜多言", "熟悉了就立马变成撒泼打滚的小公举"]
					},
					{
						minScore: 0.35,
						maxScore: 0.37,
						starNum: 4,
						starMsg: ["轻易解读周围人内心的OS", "身体隐藏着巨大的能量", "X教授是你的谁？"]
					},
					{
						minScore: 0.37,
						maxScore: 0.39,
						starNum: 4,
						starMsg: ["表面上极端克制", "不轻易彻底放飞自我", "内心却如同进入另一个世界"]
					},
					{
						minScore: 0.39,
						maxScore: 0.4,
						starNum: 5,
						starMsg: ["看不清", "猜不透", "难道是隐藏在地球的外星人？"]
					},
					{
						minScore: 0.4,
						maxScore: 1000000,
						starNum: 5,
						starMsg: ["预警！", "此人神秘感爆表！！", "已无法破译！！！"]
					}
				]
			};
		},
		mounted() {
			let self = this;
			console.log(document.body.clientWidth * 74 / 100);
			document.getElementsByClassName("starImg")[0].style.width =
				document.body.clientWidth * 74 / 100 + "px";
			document.getElementsByClassName("starImg")[0].style.height =
				document.body.clientWidth * 74 / 460 + "px";
			document.getElementsByClassName("starImg")[0].style.marginTop = -(document.body.clientWidth * 74 / 460) / 2 + "px";
			//			var score = (Math.random() * 1.4).toFixed(2) - 1;
			//			console.log("score", score.toFixed(2))
			//			self.score(-0.5);
		},
		methods: {
			goToUserInfo() {
				//页面跳转
				let self = this;
				// 带查询参数，变成 /register?plan=private
				if(self.$route.query.isIndex == 0) {
					self.$router.push({
						path: "userinfo",
					});
				} else {
					self.$router.push({
						path: "ai",
						query: {
							isIndex: 1,
						}
					});
				}
			},
			mashangtansuo() {
				//马上探索
				let self = this;
				let base64Img = self.base64Img;
				if(base64Img == null || base64Img == '') {
					self.toast("请上传自拍照");
					return false;
				}
				var index = base64Img.indexOf(",");
				let openid = window.localStorage.getItem('openid');
				if(index >= 0) {
					base64Img = base64Img.substr(index + 1);
				}
				self.isUnUpload = false; //初始界面消失
				self.isUpload = true; //出现扫描界面
				self.$http
					.post("v1/em?action=compare&uid=" + openid, {
						base64: base64Img
					})
					.then(function(response) {
						console.log("compare:==code>" + response.data.code + "openid:" + openid);
						if(response.data.code == 200 || response.data.code == 102) {
							self.score(response.data.score); //设置打分界面
						} else {
							//							self.toast("人脸识别失败,请重试");
							self.isUpload = false;
							self.cuowu = true;
							setTimeout(() => {
								self.cuowu = false;
								self.isUnUpload = true;
							}, 3000);
						}
					})
					.catch(function(error) {
						self.chaoshi = true;
						self.isUpload = false;
						setTimeout(() => {
							self.chaoshi = false;
							self.isUnUpload = true;
						}, 3000);
						console.log(error);
					});
			},
			score(score) {
				var self = this;
				//				var score = obj.data.score; //需要改成OBJ的分数值！！！！！！！！！！！！！！！！！！！！！！！
				var scoreIndex = null;
				self.isUpload = false; //扫描消失
				self.isRead = true; //分数出现
				setTimeout(function() {
					self.isPageOut = true;
				}, 5000)
				self.scoreArray.forEach((element, index) => {
					if(score >= element.minScore && score < element.maxScore) {
						scoreIndex = index;
					}
				});
				document.getElementsByClassName("score_1")[0].innerHTML =
					self.scoreArray[scoreIndex].starMsg[0];
				document.getElementsByClassName("score_2")[0].innerHTML =
					self.scoreArray[scoreIndex].starMsg[1];
				document.getElementsByClassName("score_3")[0].innerHTML =
					self.scoreArray[scoreIndex].starMsg[2];
				switch(self.scoreArray[scoreIndex].starNum) {
					case 0:
						document.getElementsByClassName("star")[0].style.width = "47.6%";
						break;
					case 1:
						document.getElementsByClassName("star")[0].style.width = "53%";
						break;
					case 2:
						document.getElementsByClassName("star")[0].style.width = "64%";
						break;
					case 3:
						document.getElementsByClassName("star")[0].style.width = "74%";
						break;
					case 4:
						document.getElementsByClassName("star")[0].style.width = "85%";
						break;
					case 5:
						document.getElementsByClassName("star")[0].style.width = "100%";
						break;

					default:
						break;
				}
				//				self.jieping(function() {
				//					setTimeout(function() {
				//						self.isRead = false;
				//						self.isPageOut = true;
				//					}, 5000)
				//				});
			},
			start_upload(obj) {
				let self = this;
				self.compress(event, function(base64Img) {
					self.$refs.imgsss.src = base64Img;
					self.base64Img = base64Img;
					//					console.log("start_upload:", base64Img);
				});
			},
			compress(event, callback) {
				let self = this;
				try {
					let file = event.currentTarget.files[0];
					if(!/image\/\w+/.test(file.type)) {
						self.toast("请确保文件为图像类型");
						return false;
					}
					console.log("图片原始大小：", file.size)
					let Orientation = null;
					// var URL = URL || webkitURL;
					//获取照片方向角属性，用户旋转控制
					EXIF.getData(file, function() {
						//						EXIF.getAllTags(this);
						Orientation = EXIF.getTag(this, "Orientation");
						//						alert(Orientation)
						//return;
					});

					let reader = new FileReader();
					reader.onload = function(e) {
						let img = new Image();
						img.onload = function() {
							var square = 750;
							var canvas = document.createElement("canvas");
							canvas.width = img.width;
							canvas.height = img.height;
							var imageWidth = img.width;
							var imageHeight = img.height;
							console.log("img.width:", img.width)
							console.log("img.height:", img.height)
							var context = canvas.getContext("2d");
							context.clearRect(0, 0, imageWidth, imageHeight);
							
							var offsetX = 0;
							var offsetY = 0;

							var base64 = null;
							//修复ios
							if(navigator.userAgent.match(/iphone/i)) {
								//								alert('iphone');
								//alert(expectWidth + ',' + expectHeight);
								//如果方向角不为1，都需要进行旋转 added by lzk

								if(Orientation != "" && Orientation != 1) {
									//alert('旋转处理');
									switch(Orientation) {
										case 6: //需要顺时针（向左）90度旋转
											//												alert('需要顺时针（向左）90度旋转');
											self.rotateImg(this, "left", canvas);
											break;
										case 8: //需要逆时针（向右）90度旋转
											//												alert('需要顺时针（向右）90度旋转');
											self.rotateImg(this, "right", canvas);
											break;
										case 3: //需要180度旋转
											//												alert('需要180度旋转');
											self.rotateImg(this, "right", canvas); //转两次
											self.rotateImg(this, "right", canvas);
											break;
									}
								}
							}
							
							/////此处为图片裁剪    方法  
							//							if(this.width > this.height) {
							//								imageWidth = Math.round(square * this.width / this.height);
							//								imageHeight = square;
							//								offsetX = -Math.round((imageWidth - square) / 2);
							//							} else {
							//								imageHeight = Math.round(square * this.height / this.width);
							//								imageWidth = square;
							//								offsetY = -Math.round((imageHeight - square) / 2);
							//							}
							context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
							base64 = canvas.toDataURL("image/png", self.quality);
							let strLength = base64.length;
							var fileLength = parseInt(strLength - (strLength / 8) * 2);
							console.log("图片压缩后大小：", fileLength)
							if(fileLength > 1024 * 1000 * 2) {
								self.toast("自拍照不能大于2M");
								return false;
							} else {
								self.isUnUpload = true;
								callback && callback(base64);
							}
						};
						img.src = e.target.result;
					};
					reader.readAsDataURL(file);
				} catch(e) {
					console.log("压缩失败!");
					//调用上传方式  不压缩
				}
			},
			rotateImg(img, direction, canvas) {
				//对图片旋转处理 added by lzk
				//最小与最大旋转方向，图片旋转4次后回到原方向
				var min_step = 0;
				var max_step = 3;
				//var img = document.getElementById(pid);
				if(img == null) return;
				//img的高度和宽度不能在img元素隐藏后获取，否则会出错
				var height = img.height;
				var width = img.width;
				//var step = img.getAttribute('step');
				var step = 2;
				if(step == null) {
					step = min_step;
				}
				if(direction == "right") {
					step++;
					//旋转到原位置，即超过最大值
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}

				//旋转角度以弧度值为参数
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext("2d");
				switch(step) {
					case 0:
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(img, 0, 0);
						break;
					case 1:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, 0, -height);
						break;
					case 2:
						canvas.width = width;
						canvas.height = height;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, -height);
						break;
					case 3:
						canvas.width = height;
						canvas.height = width;
						ctx.rotate(degree);
						ctx.drawImage(img, -width, 0);
						break;
				}
			},
			jieping(callback) {
				//截屏
				html2canvas(document.getElementById("app")).then(canvas => {
					let url;
					url = canvas.toDataURL();
					this.htmlImg = url;
					callback();
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
		.html_img {
			width: 100%;
			position: absolute;
			z-index: 999;
		}
		.zd-xh-box {
			width: 80%;
			font-size: 30px;
			text-align: center;
			color: #fff;
			font-weight: bold;
			display: block;
			margin: auto;
			line-height: 200px;
		}
		.zd-xh-text-box {
			width: 100%;
			position: relative;
			animation: fuxian 1s;
		}
		.zd-xh-text {
			position: absolute;
			z-index: 2;
			font-size: 30px;
			color: #fff;
			font-weight: bold;
			width: 100%;
			display: inline-block;
			text-align: center;
			top: 50%;
			transform: translate(0, -50%);
		}
		.zd-xh-btn {
			width: 20%;
			display: block;
			margin: auto;
			margin-bottom: 3%;
			animation: fuxian1 1s linear infinite alternate;
		}
		.zd-xh {
			width: 100%;
			position: absolute;
			bottom: 0px;
			z-index: 999;
		}
		.bg {
			width: 100%;
			height: 100%;
			background: url(../../../static/img/bg.jpg) 50%/cover;
			position: absolute;
			top: 0;
			z-index: 1;
		}
		.score_box {
			animation: fuxian 0.5s linear;
			opacity: 1;
			z-index: 10;
			position: absolute;
			width: 100%;
			height: 100%;
		}
		.stars {
			position: absolute;
			top: 50%;
			margin-top: -25px;
			left: 239px;
			height: 56px;
			display: block;
			width: 340px;
			overflow: hidden;
		}
		.album {
			width: 100%;
			position: absolute;
			top: 12%;
			z-index: 4;
			.score {
				width: 55%;
				line-height: 50px;
				border: 2px #bb7753 solid;
				border-radius: 10px;
				color: #3bf6fe;
				text-shadow: 0px 0px 10px #00fff9;
				background: rgba(0, 0, 0, 0.24);
				position: absolute;
				z-index: 5;
				text-align: center;
				font-size: 26px;
			}
			.score_1 {
				right: 5%;
				top: 21%;
			}
			.score_2 {
				left: 4%;
				top: 54%;
			}
			.score_3 {
				right: 9%;
				top: 74%;
			}
			.album-content {
				position: absolute;
				/*border: 1px solid #7EF9FF;*/
				height: 70%;
				margin-left: -28.2%;
				width: 56%;
				top: 15%;
				left: 50%;
				overflow: hidden;
				background: url(../../../static/img/renlianshibierenlian.png) no-repeat 50%/cover;
				display: -webkit-flex;
				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
				align-items: center;
				font-size: 32px;
				.title {
					color: #7ef9ff;
				}
				.imgsss,
				.upload {
					position: absolute;
					top: 0;
					left: 0;
				}
				.upload {
					width: 100%;
					height: 100%;
					opacity: 0;
					-webkit-opacity: 0;
				}
				.upload input {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					opacity: 0;
					-webkit-opacity: 0;
				}
			}
			.waikuang {
				margin: auto;
				display: block;
				width: 80%;
			}
			.waikuangleftdian {
				position: absolute;
				top: 27.5%;
				left: 17.5%;
				height: 46%;
				animation: fuxian 0.1s infinite linear alternate;
			}
			.waikuangrightdian {
				position: absolute;
				top: 27.5%;
				right: 17.5%;
				height: 46%;
				animation: fuxian 0.1s infinite linear alternate;
			}
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: 5%;
			z-index: 4;
			.btn1 {
				width: 66%;
				display: block;
				margin: auto;
			}
		}
		.sb-btn {
			width: 74%;
			position: absolute;
			z-index: 4;
			top: 70%;
			opacity: 0;
			margin-top: -40px;
			left: 13%;
			animation: fuxian 0.5s linear;
			overflow: hidden;
			.btn1 {
				width: 100%;
				display: block;
				margin: auto;
			}
			.xiegang {
				position: absolute;
				height: 100%;
				top: 0;
				left: -36%;
				animation: laihuibaidong 2s linear infinite;
			}
			.star {
				width: 100%;
				height: 100%;
				padding: 0px;
				overflow: hidden;
				position: absolute;
				top: 0px;
				box-sizing: border-box;
				img {
					position: relative;
					top: 50%;
				}
			}
			.is-cs {
				position: absolute;
				color: #68faff;
				text-align: center;
				width: 100%;
				line-height: 42px;
				top: 50%;
				margin-top: -21px;
				font-size: 42px;
			}
			.is-read {
				position: absolute;
				color: #68faff;
				text-align: left;
				width: 100%;
				line-height: 42px;
				top: 50%;
				padding-left: 42px;
				margin-top: -21px;
				font-size: 42px;
			}
		}
		.logo {
			width: 26%;
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 2;
		}
		.upload-end {
			position: absolute;
			height: 70%;
			margin-left: -28.2%;
			width: 56%;
			top: 15%;
			left: 50%;
			overflow: hidden;
			img {
				top: 0px;
				width: 100%;
				position: absolute;
			}
		}
		.saomiao-animate {
			animation: toprun 3s linear infinite alternate;
		}
		@keyframes toprun {
			from {
				transform: translate(0, 100%);
			}
			to {
				transform: translate(0, 0%);
			}
		}
		@keyframes laihuibaidong {
			from {
				left: -36%;
			}
			to {
				left: 136%;
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
		@keyframes fuxian1 {
			from {
				opacity: 0.4;
			}
			to {
				opacity: 1;
			}
		}
		.animated {
			animation-fill-mode: forwards;
		}
		.cntu {
			width: 100%;
			bottom: 0px;
			position: absolute;
			z-index: 2;
			animation: fuxian 0.5s;
		}
		.sbsbsb {
			width: 100%;
			position: absolute;
			z-index: 2;
			animation: fuxian 0.5s;
			top: 70%;
		}
	}
</style>