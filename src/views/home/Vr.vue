<template>
	<div class="content">
		<div class="content" ref="photosphere" id="photosphere"></div>
	</div>
</template>

<script>
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
			self.loadQj();
		},
		methods: {
			loadQj() {
				var self = this;
				//加载全景图
				var PSV = new PhotoSphereViewer({
					panorama: 'static/img/1.jpg', //缩略图
					container: 'photosphere', //全景组件父容器
					caption: '平安大厦</b>', //控制台标题
					loading_img: 'static/img/photosphere-logo.gif', //loadING图
					navbar: 'gyroscope', //控制台配置
					navbar: true, //控制台配置
					default_fov: 70, //初始焦距
					default_long: 5.6, //max 6.3
					default_lat: 0.73, //max 1.5
					tilt_up_max: Math.PI / 2,
					//tilt_down_max: Math.PI / 2,
					move_speed: 3, //滑动速度
					mousewheel: false, //监听鼠标操作
					gyroscope: true, //陀螺仪开关
					time_anim: true, //自动观察模式
					transition: {
						duration: 1500, // duration of transition in milliseconds
						loader: true // should display the loader ?
					}, //全景图切换
					markers: [{
						id: 'image',
						longitude: 3.198,
						latitude: -0.1,
						image: 'http://photo-sphere-viewer.js.org/assets/pin-blue.png',
						width: 32,
						height: 32,
						anchor: 'bottom center',
						content: document.getElementById('photosphere').innerHTML,
					}, {
						id: 'image11',
						longitude: 3.198,
						latitude: -0.15,
						image: 'http://photo-sphere-viewer.js.org/assets/pin-blue.png',
						width: 32,
						height: 32,
						anchor: 'bottom center',
						content: document.getElementById('photosphere').innerHTML,
					}] //标记
				});

				PSV.on('select-marker', function(marker) {
					//点击标记时的回调
					//				zoonAnimate(PSV)
					PSV.setPanorama('img/2.jpg');
					console.log("奔放吧少年", marker);
					// if(marker.data && marker.data.generated) {
					// 	PSV.removeMarker(marker);
					// }
				});

				PSV.on('position-updated', function(ev) {
					//点击标记时的回调
					//				console.log("位置更新",ev);
				});
				PSV.on('ready', function() {
					PSV.animate({
						longitude: 3.17,
						latitude: 0.13
					}, 2000)
				});

			},
			zoonAnimate(PSV_obj) {
				var nowNum = PSV_obj.getZoomLevel();
				var maxNum = nowNum + 18;
				var gotoZoom = setInterval(function() {
					PSV_obj.zoom(nowNum)
					if(nowNum < maxNum) {
						nowNum++
					} else {
						clearInterval(gotoZoom)
					}
				}, 24)
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import url("../../assets/css/photo-sphere-viewer.min.css");
	.content {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>