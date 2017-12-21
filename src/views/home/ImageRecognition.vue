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
			<div class="upload-end" v-show="isUpload">
				<img src="../../../static/img/saomiao.png" class="saomiao-animate" />
			</div>
		</div>

		<div class="btns" v-show="!isUpload">
			<img src="../../../static/img/querenceshi.png" @click="mashangtansuo" class="btn1" />
		</div>

		<div class="sb-btn" v-show="isUpload">
			<img src="../../../static/img/titlebg.png" @click="mashangtansuo" class="btn1" />
			<span>正在启动分析...</span>
		</div>

	</div>
</template>

<script>
export default {
  data() {
    return {
	  quality: 0.8,
	  isUpload:false,
	  isRead:false,
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
		self.$http.post('/user'+"?uid="+111+"&action="+'compare', {
				base64: base64Img
			})
			.then(function (response) {
				console.log(response);
				alert(1)
			})
			.catch(function (error) {
				console.log(error);
			});
     	 });
    },
    compress(event, callback) {
      let self = this;
      try {
        let file = event.currentTarget.files[0];
        if (!/image\/\w+/.test(file.type)) {
          alert("请确保文件为图像类型");
          return false;
        }
        let Orientation = null;
        // var URL = URL || webkitURL;
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
          // alert(EXIF.pretty(this));
          //						EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
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
            canvas.width = square;
            canvas.height = square;
            var context = canvas.getContext("2d");
            context.clearRect(0, 0, square, square);
            var imageWidth;
            var imageHeight;
            var offsetX = 0;
            var offsetY = 0;

            var base64 = null;
            //修复ios
            if (navigator.userAgent.match(/iphone/i)) {
              //								alert('iphone');
              //alert(expectWidth + ',' + expectHeight);
              //如果方向角不为1，都需要进行旋转 added by lzk

              if (Orientation != "" && Orientation != 1) {
                //alert('旋转处理');
                switch (Orientation) {
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
            if (this.width > this.height) {
              imageWidth = Math.round(square * this.width / this.height);
              imageHeight = square;
              offsetX = -Math.round((imageWidth - square) / 2);
            } else {
              imageHeight = Math.round(square * this.height / this.width);
              imageWidth = square;
              offsetY = -Math.round((imageHeight - square) / 2);
            }
            context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
            base64 = canvas.toDataURL("image/png", self.quality);
            callback && callback(base64);
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } catch (e) {
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
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      var height = img.height;
      var width = img.width;
      //var step = img.getAttribute('step');
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
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
      switch (step) {
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
      margin-left: -28.2%;
      width: 56%;
      top: 15%;
      left: 50%;
      overflow: hidden;
      background: url(../../../static/img/renlianshibierenlian.png) no-repeat
        50%/cover;
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
    bottom: 10%;
    z-index: 4;
    .btn1 {
      width: 50%;
      display: block;
      margin: auto;
    }
  }
  .sb-btn {
    width: 100%;
    position: absolute;
    z-index: 4;
    top: 70%;
    margin-top: -40px;
    .btn1 {
      width: 74%;
      display: block;
      margin: auto;
    }
    span {
      position: absolute;
      color: #68faff;
      text-align: center;
      width: 100%;
      line-height: 42px;
      top: 50%;
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
  .upload-end{
	position: absolute;
    height: 70%;
    margin-left: -28.2%;
    width: 56%;
    top: 15%;
    left: 50%;
    overflow: hidden;
	  img{
		  top: 0px;
		  position: absolute;
	  }
  }
  .saomiao-animate{
	  animation: toprun 3s linear infinite alternate;
  }
  @keyframes toprun {
	  from{
		  top: 0%;
	  }
	  to{
		  top: 100%;
	  }
  }
}
</style>