<template>
	<div class="content">
		<div class="content" ref="photosphere" id="photosphere"></div>
		<div class="btns">
			<!--<div class="skip" @click="goToEyes">跳过</div>-->
			<div class="gyroscope-off" @click="toggleGyroscope" :class="{'gyroscope-on':isGyroscope}"></div>
			<div class="rotate-off" @click="toggleRotate" :class="{'rotate-on':isRotate}"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isGyroscope: false,
				isRotate: false,
				PSV: null,
				index: 0, //当前VR加载进度
				vrImgs: [
					"https://wx.nullexcept.com/s_static/img/1.jpg",
					"https://wx.nullexcept.com/s_static/img/2.jpg",
					"https://wx.nullexcept.com/s_static/img/3.jpg",
					"https://wx.nullexcept.com/s_static/img/4.jpg",
				],
				vrMarkers: [],
			};
		},
		methods: {
			isRotate: function() {
				let self = this;
				if(self.PSV != null) {
					console.log(self.PSV.isAutorotateEnabled())
					return self.PSV.isAutorotateEnabled();
				}
			}
		},
		mounted() {
			//页面加载完成回调
			let self = this;
			self.loadQj();
			self.$refs.photosphere.addEventListener("touchstart", function() {
				//				event.preventDefault();
				if(self.PSV != null) {
					self.isRotate = self.PSV.isAutorotateEnabled();
				}
			}, false);
		},
		methods: {
			loadQj() {
				let self = this;
				//加载全景图
				self.PSV = new PhotoSphereViewer({
					panorama: 'https://wx.nullexcept.com/s_static/img/1.jpg', //缩略图
					container: 'photosphere', //全景组件父容器
					//caption: '平安大厦</b>', //控制台标题
					loading_img: 'https://wx.nullexcept.com/s_static/img/photosphere-logo.gif', //loadING图
					//					navbar: 'gyroscope', //控制台配置
					navbar: false, //控制台配置
					default_fov: 70, //初始焦距
					default_long: 5.6, //max 6.3
					default_lat: 0.13, //max 1.5
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
						id: 'xiaoxi1',
						longitude: 3.198,
						latitude: -0.1,
						image: '/static/img/xinhao1.png',
						width: 364,
						height: 172,
						anchor: 'bottom center',
						//						content: document.getElementById('photosphere').innerHTML,
					}, {
						id: 'quan1',
						longitude: 3.198,
						latitude: -0.105,
						image: '/static/img/quan.png',
						width: 124,
						height: 72,
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
					}, {
						id: 'jiantou1',
						longitude: 3.198,
						latitude: -0.115,
						image: '/static/img/jiantou.png',
						width: 111,
						height: 142,
						className: 'psv-marker-jiantou',
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
					}, {
						id: 'xiaoxi2',
						longitude: 3.698,
						latitude: -0.1,
						image: '/static/img/jiejinxiansuo.png',
						width: 364,
						height: 172,
						anchor: 'bottom center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'quan2',
						longitude: 3.698,
						latitude: -0.105,
						image: '/static/img/quan.png',
						width: 124,
						height: 72,
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'jiantou2',
						longitude: 3.698,
						latitude: -0.115,
						image: '/static/img/jiantou.png',
						width: 111,
						height: 142,
						className: 'psv-marker-jiantou',
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'xiaoxi3',
						longitude: 2.95,
						latitude: -0.1,
						image: '/static/img/xinhao2.png',
						width: 364,
						height: 172,
						anchor: 'bottom center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'quan3',
						longitude: 2.95,
						latitude: -0.105,
						image: '/static/img/quan.png',
						width: 124,
						height: 72,
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'jiantou3',
						longitude: 2.95,
						latitude: -0.115,
						image: '/static/img/jiantou.png',
						width: 111,
						height: 142,
						className: 'psv-marker-jiantou',
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'xiaoxi31',
						longitude: 2.53,
						latitude: -0.1,
						image: '/static/img/zhajixinxihao.png',
						width: 242,
						height: 281,
						anchor: 'bottom left',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'xiaoxi4',
						longitude: 0.1,
						latitude: -0.1,
						image: '/static/img/xinhao3.png',
						width: 364,
						height: 172,
						anchor: 'bottom center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'quan4',
						longitude: 0.1,
						latitude: -0.105,
						image: '/static/img/quan.png',
						width: 124,
						height: 72,
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}, {
						id: 'jiantou4',
						longitude: 0.1,
						latitude: -0.115,
						image: '/static/img/jiantou.png',
						width: 111,
						height: 142,
						className: 'psv-marker-jiantou',
						anchor: 'top center',
						//						content: document.getElementById('photosphere').innerHTML,
						visible: false,
					}] //标记
				});
				self.PSV.on('ready',
					function() {
						self.clickEvtManage();
						self.PSV.animate({
							longitude: 3.17,
							latitude: 0.13
						}, 2000)
					});
			},
			showIndex: function(index) {
				let self = this;
				if(index >= self.vrImgs.length)
					index = self.vrImgs.length - 1;
				self.index = index;
				let imgSrc = self.vrImgs[index];
				self.PSV.setPanorama(imgSrc);
				self.vrMarkers.forEach((t1, i1) => {
					t1.forEach((t2, i2) => {
						self.PSV.hideMarker(t2);
					});
				});
				self.vrMarkers[index].forEach((t, i) => {
					self.PSV.showMarker(t);
				})
				switch(index) {
					case 0:
						break;
					case 1:
						self.PSV.animate({
							longitude: 3.698,
							latitude: 0.13
						}, 2000)
						break;
					case 2:
						self.PSV.animate({
							longitude: 2.82,
							latitude: 0.13
						}, 2000)
						break;
					case 3:
						self.PSV.animate({
							longitude: 0.1,
							latitude: 0.13
						}, 2000)
						break;
					default:
						break;
				}
			},
			clickEvtManage: function() { //标记事件管理
				let self = this;
				let xiaoxi1 = self.PSV.getMarker('xiaoxi1');
				let quan1 = self.PSV.getMarker('quan1');
				let jiantou1 = self.PSV.getMarker('jiantou1');
				xiaoxi1.$el.onclick = function() {
					self.showIndex(1);
				}
				quan1.$el.onclick = function() {
					self.showIndex(1);
				}
				jiantou1.$el.onclick = function() {
					self.showIndex(1);
				}
				self.vrMarkers.push([xiaoxi1, quan1, jiantou1]);

				let xiaoxi2 = self.PSV.getMarker('xiaoxi2');
				let quan2 = self.PSV.getMarker('quan2');
				let jiantou2 = self.PSV.getMarker('jiantou2');
				xiaoxi2.$el.onclick = function() {
					self.showIndex(2);
				}
				quan2.$el.onclick = function() {
					self.showIndex(2);
				}
				jiantou2.$el.onclick = function() {
					self.showIndex(2);
				}
				self.vrMarkers.push([xiaoxi2, quan2, jiantou2]);

				let xiaoxi31 = self.PSV.getMarker('xiaoxi31');
				let xiaoxi3 = self.PSV.getMarker('xiaoxi3');
				let quan3 = self.PSV.getMarker('quan3');
				let jiantou3 = self.PSV.getMarker('jiantou3');
				xiaoxi3.$el.onclick = function() {
					self.showIndex(3);
				}
				quan3.$el.onclick = function() {
					self.showIndex(3);
				}
				jiantou3.$el.onclick = function() {
					self.showIndex(3);
				}
				xiaoxi31.$el.onclick = function() {
					self.showIndex(3);
				}
				self.vrMarkers.push([xiaoxi3, quan3, jiantou3, xiaoxi31]);

				let xiaoxi4 = self.PSV.getMarker('xiaoxi4');
				let quan4 = self.PSV.getMarker('quan4');
				let jiantou4 = self.PSV.getMarker('jiantou4');
				xiaoxi4.$el.onclick = function() {
					self.goToEyes();
				}
				quan4.$el.onclick = function() {
					self.goToEyes();
				}
				jiantou4.$el.onclick = function() {
					self.goToEyes();
				}
				self.vrMarkers.push([xiaoxi4, quan4, jiantou4]);
				//				self.showIndex(1);
			},
			goToEyes() {
				this.$router.push({
					path: 'eyes'
				})
			},
			toggleGyroscope: function() {
				let self = this;
				self.isRotate = false;
				self.isGyroscope = !self.isGyroscope;
				if(self.isGyroscope) {
					self.PSV.startGyroscopeControl();
					self.PSV.stopAutorotate();
				} else {
					self.PSV.stopGyroscopeControl();
				}
			},
			toggleRotate: function() {
				let self = this;
				self.isGyroscope = false;
				self.isRotate = !self.isRotate;
				if(self.isRotate) {
					self.PSV.startAutorotate();
					self.PSV.stopGyroscopeControl();
				} else {
					self.PSV.stopAutorotate();
				}
			},
			destroy() {
				let self = this;
				self.PSV.destroy();
			},
			zoonAnimate(PSV_obj) {
				let nowNum = PSV_obj.getZoomLevel();
				let maxNum = nowNum + 18;
				let gotoZoom = setInterval(function() {
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
		.btns {
			position: fixed;
			bottom: 32px;
			right: 32px;
			/*background-color: rgba(0, 0, 0, 0.2);*/
			z-index: 999;
			display: -webkit-flex;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			align-items: center;
			font-size: 16px;
			.skip {
				width: 72px;
				height: 72px;
			}
			.gyroscope-off {
				width: 72px;
				height: 72px;
				padding-left: 22px;
				background: url(../../../static/img/tuoluoyino.png) no-repeat center center;
				background-size: 64px 64px;
			}
			.gyroscope-on {
				background: url(../../../static/img/tuoluoyi.png) no-repeat center center;
				background-size: 64px 64px;
			}
			.rotate-off {
				width: 72px;
				height: 72px;
				background: url(../../../static/img/xuanzhuanno.png) no-repeat center center;
				padding-left: 22px;
				background-size: 64px 64px;
			}
			.rotate-on {
				background: url(../../../static/img/xuanzhuan.png) no-repeat center center;
				background-size: 64px 64px;
			}
		}
	}
</style>