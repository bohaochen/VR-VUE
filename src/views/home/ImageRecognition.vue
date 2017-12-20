<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />

		<div class="album">
			<img class="waikuang" src="../../../static/img/renlianshibiekuangdeng.png" />
			<div class="album-content">
				<div class="title">点击上传个人正面自拍照</div>
				<img src="" ref="imgsss" class="imgsss" />
				<div class="upload">
					<input ref="upload" @change="start_upload(this)" type="file" name="upload" accept="image/*">
				</div>
			</div>
		</div>

		<div class="btns">
			<img src="../../../static/img/querenceshi.png" @click="mashangtansuo" class="btn1" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				quality: 0.8,
			};
		},
		mounted() {
			let self = this;
			//			self.$refs.upload.addEventListener('change',function(){
			//				
			//			},false)
		},
		methods: {
			mashangtansuo() {
				//马上探索
			},
			start_upload(obj) {
				let self = this;
				self.compress(event, function(base64Img) {
					self.$refs.imgsss.src = base64Img;
					//					console.log("start_upload:", base64Img);
				});
			},
			compress(event, callback) {
				try {
					let file = event.currentTarget.files[0];
					if(!/image\/\w+/.test(file.type)) {
						alert("请确保文件为图像类型");
						return false;
					}
					let Orientation = null;
					// var URL = URL || webkitURL;  
					//获取照片方向角属性，用户旋转控制  
					EXIF.getData(file, function() {
						// alert(EXIF.pretty(this));  
						EXIF.getAllTags(this);
						//alert(EXIF.getTag(this, 'Orientation'));   
						Orientation = EXIF.getTag(this, 'Orientation');
						alert(Orientation)
						//return;  
					});

					let reader = new FileReader();
					reader.onload = function(e) {
						let img = new Image();
						img.onload = function() {
							var square = 750;
							var canvas = document.createElement('canvas');
							canvas.width = square;
							canvas.height = square;
							var context = canvas.getContext('2d');
							context.clearRect(0, 0, square, square);
							var imageWidth;
							var imageHeight;
							var offsetX = 0;
							var offsetY = 0;
							if(this.width > this.height) {
								imageWidth = Math.round(square * this.width / this.height);
								imageHeight = square;
								offsetX = -Math.round((imageWidth - square) / 2);
							} else {
								imageHeight = Math.round(square * this.height / this.width);
								imageWidth = square;
								offsetY = -Math.round((imageHeight - square) / 2);
							}
							context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
							var base64 = null;
							//修复ios  
							if(navigator.userAgent.match(/iphone/i)) {
								console.log('iphone');
								//alert(expectWidth + ',' + expectHeight);  
								//如果方向角不为1，都需要进行旋转 added by lzk  
								console.log(Orientation)
								if(Orientation != "" && Orientation != 1) {
									//alert('旋转处理');
									switch(Orientation) {
										case 6: //需要顺时针（向左）90度旋转  
											//												alert('需要顺时针（向左）90度旋转');
											self.rotateImg(this, 'left', canvas);
											break;
										case 8: //需要逆时针（向右）90度旋转  
											//												alert('需要顺时针（向右）90度旋转');
											self.rotateImg(this, 'right', canvas);
											break;
										case 3: //需要180度旋转  
											//												alert('需要180度旋转');
											self.rotateImg(this, 'right', canvas); //转两次  
											self.rotateImg(this, 'right', canvas);
											break;
									}
								}

								/*var mpImg = new MegaPixImage(image); 
								mpImg.render(canvas, { 
								    maxWidth: 800, 
								    maxHeight: 1200, 
								    quality: 0.8, 
								    orientation: 8 
								});*/
								base64 = canvas.toDataURL("image/jpeg", 0.8);
							} else if(navigator.userAgent.match(/Android/i)) { // 修复android  
								var encoder = new JPEGEncoder();
								base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
							} else {
								//alert(Orientation);  
								if(Orientation != "" && Orientation != 1) {
									//alert('旋转处理');  
									switch(Orientation) {
										case 6: //需要顺时针（向左）90度旋转  
											//												alert('需要顺时针（向左）90度旋转');
											self.rotateImg(this, 'left', canvas);
											break;
										case 8: //需要逆时针（向右）90度旋转  
											//												alert('需要顺时针（向右）90度旋转');
											self.rotateImg(this, 'right', canvas);
											break;
										case 3: //需要180度旋转  
											//												alert('需要180度旋转');
											self.rotateImg(this, 'right', canvas); //转两次  
											self.rotateImg(this, 'right', canvas);
											break;
									}
								}
								base64 = canvas.toDataURL("image/jpeg", self.quality);
							}
							//uploadImage(base64);  
							callback && callback(base64);
						}
						img.src = e.target.result;
					}
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
				if(direction == 'right') {
					step++;
					//旋转到原位置，即超过最大值    
					step > max_step && (step = min_step);
				} else {
					step--;
					step < min_step && (step = max_step);
				}
				//img.setAttribute('step', step);    
				/*var canvas = document.getElementById('pic_' + pid);   
				if (canvas == null) {   
				    img.style.display = 'none';   
				    canvas = document.createElement('canvas');   
				    canvas.setAttribute('id', 'pic_' + pid);   
				    img.parentNode.appendChild(canvas);   
				}  */
				//旋转角度以弧度值为参数    
				var degree = step * 90 * Math.PI / 180;
				var ctx = canvas.getContext('2d');
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
			background: url(../../../static/img/bg.jpg) 50%/cover;
			position: absolute;
			top: 0;
			z-index: 1;
		}
		.album {
			width: 100%;
			position: absolute;
			top: 12%;
			z-index: 4;
			.album-content {
				position: absolute;
				/*border: 1px solid #7EF9FF;*/
				height: 70%;
				margin-left: -28.25%;
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
					color: #7EF9FF;
				}
				.imgsss,
				.upload {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
				.upload {
					opacity: 0;
					-webkit-opacity: 0;
				}
				.upload input {
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
				}
			}
			.waikuang {
				margin: auto;
				display: block;
				width: 80%;
			}
		}
		.btns {
			width: 100%;
			position: absolute;
			bottom: 32px;
			z-index: 4;
			.btn1 {
				width: 50%;
				display: block;
				margin: auto;
			}
		}
		.logo {
			width: 26%;
			position: absolute;
			top: 20px;
			right: 20px;
			z-index: 2;
		}
	}
</style>