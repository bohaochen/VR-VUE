<template>
	<div id="app">
		<transition name="bounce">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "app",
		data() {
			return {
				auto: true, //是否自动预加载
				isloadImgs: false,
				preloadingImgs: [
					"https://wx.nullexcept.com/s_static/img/1.jpg",
					"https://wx.nullexcept.com/s_static/img/2.jpg",
					"https://wx.nullexcept.com/s_static/img/3.jpg",
					"https://wx.nullexcept.com/s_static/img/4.jpg",
				],
			};
		},
		mounted() {
			//页面加载完成回调
			let self = this;
			//			self.setShare();
			//			self.wxLogin();
		},
		watch: {
			'$route' (to, from) {
				let self = this;
				self.$nextTick(function() {
					setTimeout(() => {
						self.setShare();
					}, 50);
				});
			}
		},
		methods: {
			share(title, link, imgUrl, desc) {
				//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
				//获取“分享给朋友”按钮点击状态及自定义分享内容接口
				wx.onMenuShareAppMessage({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
				//获取“分享到QQ”按钮点击状态及自定义分享内容接口
				wx.onMenuShareQQ({
					title: title, // 分享标题
					desc: desc, // 分享描述
					link: link, // 分享链接
					imgUrl: imgUrl, // 分享图标
					success: function() {
						// 用户确认分享后执行的回调函数
					},
					cancel: function() {
						// 用户取消分享后执行的回调函数
					}
				});
			},
			setShare() {
				let self = this
				let timestamp = new Date().getTime()
				//				let urlStr = encodeURIComponent(window.location.href.split("#")[0])
				let urlStr = encodeURIComponent(window.location.href.split("?")[0]);
				//				let urlStr = encodeURIComponent(location.protocol + '//' + window.location.host);	
				console.log(urlStr);
				self.$http.post("v1/em?action=query_config_parm&timestamp=" + timestamp + '&url=' + urlStr, {})
					.then(function(response) {
						if(response.data.code == 200) {
							// 微信配置
							wx.config({
								debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: 'wx42c67be9af7fa426', // 必填，公众号的唯一标识
								timestamp: response.data.timestamp, // 必填，生成签名的时间戳
								nonceStr: response.data.noncestr, // 必填，生成签名的随机串
								signature: response.data.signature, // 必填，签名，见附录1
								jsApiList: [
									'checkJsApi',
									"onMenuShareTimeline",
									"onMenuShareAppMessage",
									"onMenuShareQQ"
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});
							wx.error(function(res) {
								//验证失败
								//								alert("验证失败");
								alert("验证失败");
							});
							wx.ready(function() {
								alert("ready222");
								wx.checkJsApi({
									jsApiList: ['checkJsApi',
										"onMenuShareTimeline",
										"onMenuShareAppMessage",
										"onMenuShareQQ"
									],
									success: function(res) {
										let openid = window.localStorage.getItem('openid');
										var title = "聚焦AI,智创未来/平安人脸识别调用量破10亿";
										var link = 'https://wx.nullexcept.com/';
										var imgUrl = "https://wx.nullexcept.com/static/img/shareImg.png";
										var desc = "欢迎来见证人脸识别调用量破10亿!参与体验即可抽取小礼物,它可能是iPhoneX哦";
										self.share(title, link, imgUrl, desc);
										// 以键值对的形式返回，可用的api值true，不可用为false
										// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
									}
								});
							});
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
		},
		components: {}
	};
</script>

<style>
	@import "./assets/css/animate.css";
	@import "./assets/css/common.css";
	* {
		margin: 0;
		padding: 0;
	}
	
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #000;
	}
	
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(0);
		}
	}
</style>