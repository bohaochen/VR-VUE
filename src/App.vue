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
			//			let self = this;
			//			console.log(1111111);
			//			if(self.auto) {
			//				self.preloadingAllImg();
			//			}
			let url = window.location.href.split('?')[0];
			let code = this.queryString("code")
			if(code == null || code == '') {
				window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42c67be9af7fa426&redirect_uri=' + encodeURIComponent(url) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			} else {
				//				this.$http.jsonp(Oauth2Api + "&code=" + code).then(function(response) {
				//					if(response.data.code == 200) {
				//						this.userInfo = response.data
				//						window.localStorage.setItem("userInfo.nickname", this.userInfo.nickname)
				//						window.localStorage.setItem("userInfo.headimgurl", this.userInfo.headimgurl)
				//
				//						this.loadImage()
				//					} else {
				//						$.toast('网络连接失败，请重新试试吧！', 2000, 'success top');
				//					}
				//				})
			}
		},
		//		watch: {
		//			$route() {
		//				let self = this;
		//				if(!self.isloadImgs) {
		//
		//				}
		//				console.log("监听路由变化:", self.$route);
		//			}
		//		},

		methods: {
			preloadingAllImg() {
				//预加载图片资源
			},
			queryString(name) {
				let href = window.location.href
				if(href.indexOf('?') >= 0) {
					href = href.split('?')[1].split('&')
					for(let i = 0; i < href.length; i++) {
						let paramName = href[i].split('=')[0]
						if(name == paramName) {
							if(typeof(href[i].split('=')[1]) != "undefined")
								return href[i].split('=')[1]
							else
								return null
						}
					}
				}
				return null;
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