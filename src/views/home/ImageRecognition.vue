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
			
			<img class="waikuang" src="../../../static/img/renlianshibiekuangdeng.png" />
			<div class="album-content">
				<div class="title" v-show="isUnUpload">点击上传个人正面自拍照</div>
				<img src="" ref="imgsss" class="imgsss" />
				<div class="upload">
					<input ref="upload" @change="start_upload(this)" type="file" name="upload" accept="image/*">
				</div>
			</div>
			<div class="upload-end" v-show="isUpload">
				<img src="../../../static/img/saomiao.png" class="saomiao-animate" />
			</div>
		</div>

		<div class="btns" v-show="isUnUpload">
			<img src="../../../static/img/querenceshi.png" @click="mashangtansuo" class="btn1" />
		</div>

		<div class="sb-btn animated" v-show="isUpload">
			<img src="../../../static/img/titlebg.png" class="btn1" />
			<span class="is-cs">正在启动分析...</span>
		</div>

		<div class="sb-btn animated" v-show="isRead">
			<img src="../../../static/img/titlebg1.png" class="btn1" />
			<div class="star" >
				<img class="starImg" src="../../../static/img/xingxing.png" >
			</div>
		</div>

		<img class="cntu" v-show="isRead" src="../../../static/img/cntu_bc.png" >
   		<img class="html_img" :src="htmlImg" :style="{display:htmlImg ? 'block' : 'none'}">

	</div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  data() {
    return {
      quality: 0.8,
      isUnUpload: true,
      isUpload: false,
      isRead: false,
      base64Img: null,
      htmlImg: "",
      scoreArray: [
        {
          minScore: 0,
          maxScore: 0.1,
          starNum: 5,
          starMsg: ["小心谨慎", "和蔼可亲", "多重性格"]
        },
        {
          minScore: 0.1,
          maxScore: 0.12,
          starNum: 1,
          starMsg: ["表里如一", "心境纯粹", "大智若愚"]
        },
        {
          minScore: 0.12,
          maxScore: 0.14,
          starNum: 2,
          starMsg: ["乐天达观", "善解人意", "聪明好学"]
        },
        {
          minScore: 0.14,
          maxScore: 0.15,
          starNum: 3,
          starMsg: ["风趣幽默", "感情用事", "豪放不羁"]
        },
        {
          minScore: 0.15,
          maxScore: 0.17,
          starNum: 4,
          starMsg: ["外表冷漠", "内心善良", "富正义感"]
        },
        {
          minScore: 0.17,
          maxScore: 0.19,
          starNum: 5,
          starMsg: ["深谋远虑", "洞察锐利", "占有欲强"]
        },
        {
          minScore: 0.19,
          maxScore: 0.2,
          starNum: 1,
          starMsg: ["纯净质朴", "内心平和", "向往自由"]
        },
        {
          minScore: 0.2,
          maxScore: 0.22,
          starNum: 2,
          starMsg: ["感情脆弱", "同理心重", "不拘小节"]
        },
        {
          minScore: 0.22,
          maxScore: 0.24,
          starNum: 3,
          starMsg: ["临机应变", "充满活力", "富于童心"]
        },
        {
          minScore: 0.24,
          maxScore: 0.25,
          starNum: 4,
          starMsg: ["谦逊有礼", "内心丰富", "不善表达"]
        },
        {
          minScore: 0.25,
          maxScore: 0.27,
          starNum: 5,
          starMsg: ["聪明机警", "善于推理", "追求挑战"]
        },
        {
          minScore: 0.27,
          maxScore: 0.29,
          starNum: 1,
          starMsg: ["精力充沛", "崇尚调和", "理性公正"]
        },
        {
          minScore: 0.29,
          maxScore: 0.3,
          starNum: 2,
          starMsg: ["坦白率真", "不受束缚", "富有野心"]
        },
        {
          minScore: 0.3,
          maxScore: 0.32,
          starNum: 3,
          starMsg: ["足智多谋", "好奇心强", "能屈能伸"]
        },
        {
          minScore: 0.32,
          maxScore: 0.34,
          starNum: 4,
          starMsg: ["善于倾听", "捉摸不定", "沉默寡言"]
        },
        {
          minScore: 0.34,
          maxScore: 0.35,
          starNum: 5,
          starMsg: ["自尊心强", "条理清晰", "极富野心"]
        },
        {
          minScore: 0.35,
          maxScore: 0.37,
          starNum: 1,
          starMsg: ["兴趣广泛", "脚踏实地", "个性单纯"]
        },
        {
          minScore: 0.37,
          maxScore: 0.39,
          starNum: 2,
          starMsg: ["勤奋努力", "个性明朗", "亲切温暖"]
        },
        {
          minScore: 0.39,
          maxScore: 0.4,
          starNum: 5,
          starMsg: ["谨慎谦虚", "创意十足", "眼光敏锐"]
        },
        {
          minScore: 0.4,
          maxScore: 100,
          starNum: 4,
          starMsg: ["色彩敏感", "细腻入微", "情绪不定"]
        }
      ]
    };
  },
  mounted() {
    let self = this;
    //			self.$refs.upload.addEventListener('change',function(){
    //
	//			},false)
	console.log(document.body.clientWidth*74/100)
	document.getElementsByClassName("starImg")[0].style.width = document.body.clientWidth*74/100 +"px";
	document.getElementsByClassName("starImg")[0].style.height = document.body.clientWidth*74/460 +"px";
	document.getElementsByClassName("starImg")[0].style.marginTop = -(document.body.clientWidth*74/460)/2 +"px";
	// document.getElementsByClassName("btn1")[0].width = (document.body.clientWidth*74/100 + "px");
  },
  methods: {
    mashangtansuo() {
      //马上探索
      let self = this;
      let base64Img = self.base64Img;
      self.isUnUpload = false; //初始界面消失
	    self.isUpload = true; //出现扫描界面
      self.$http.post("/user" + "?uid=" + 111 + "&action=" + "compare", {
          base64Img
        })
        .then(function(response) {
          console.log(response);
          if (response) {
            self.score(response); //设置打分界面
          }
        })
        .catch(function(error) {
          console.log(error);
          self.score();
        });
    },
    score(obj) {
      var self = this;
      var score = 0.2; //需要改成OBJ的分数值！！！！！！！！！！！！！！！！！！！！！！！
      var scoreIndex = null;
      setTimeout(function() {
        self.isUpload = false; //扫描消失
        self.isRead = true; //分数出现
        self.scoreArray.forEach((element, index) => {
          if (score >= element.minScore && score < element.maxScore) {
            scoreIndex = index;
          }
        });
        document.getElementsByClassName("score_1")[0].innerHTML =
          self.scoreArray[scoreIndex].starMsg[0];
        document.getElementsByClassName("score_2")[0].innerHTML =
          self.scoreArray[scoreIndex].starMsg[1];
        document.getElementsByClassName("score_3")[0].innerHTML =
          self.scoreArray[scoreIndex].starMsg[2];
        switch (self.scoreArray[scoreIndex].starNum) {
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
    setTimeout(function(){
	  	self.jieping();
    },2000)
      }, 5000);
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
	},
	jieping() {
		//截屏
      // html2canvas(document.body, {
      //   scale: 1,
      //   backgroundColor: "#fff"
      // }).then(canvas => {
      //   console.log(canvas);
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      //   let url = canvas.toDataURL();
      //   this.htmlImg = url;
      //   alert("截屏成功，可以长按分享啦");
      // });
      html2canvas(document.getElementById("app")).then(canvas => {
					let url;
					// canvas.width = window.innerWidth;
					// canvas.height = window.innerHeight;
					// document.body.appendChild(canvas);
					url = canvas.toDataURL();
					this.htmlImg = url;
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
  .html_img{
    width: 100%;
    position: absolute;
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
      width: 300px;
      line-height: 50px;
      border: 2px #bb7753 solid;
      border-radius: 10px;
      color: #3bf6fe;
      text-shadow: 0px 0px 10px #00fff9;
      background: rgba(0, 0, 0, 0.24);
      position: absolute;
      z-index: 5;
      text-align: center;
      font-size: 30px;
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
    width: 74%;
    position: absolute;
    z-index: 4;
    top: 70%;
  	opacity: 0;
    margin-top: -40px;
    left: 13%;
    animation: fuxian 0.5s linear;
    .btn1 {
      width: 100%;
      display: block;
      margin: auto;
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
      transform: translate(0,100%)
    }
    to {
      transform: translate(0,0%)
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
  .animated{
	  animation-fill-mode: forwards;
  }
  .cntu{
	  width: 100%;
	  bottom: 0px;
	  position: absolute;
	  z-index: 2;
	  animation: fuxian 0.5s;
  }
}
</style>