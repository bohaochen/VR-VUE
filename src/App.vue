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
			if(self.auto) {
				self.preloadingAllImg();
			}
		},
		watch: {
			$route() {
				let self = this;
				if(!self.isloadImgs) {

				}
				console.log("监听路由变化:", self.$route);
			}
		},
		beforeRouteEnter(to, from, next) {
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当守卫执行前，组件实例还没被创建
			console.log("beforeRouteEnter:",this)
		},
		beforeRouteUpdate(to, from, next) {
			// 在当前路由改变，但是该组件被复用时调用
			// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
			// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
			// 可以访问组件实例 `this`
			console.log("beforeRouteUpdate:",this)
		},
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