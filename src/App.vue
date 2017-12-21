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