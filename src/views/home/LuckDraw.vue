<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<div class="hj-box">
			<div class="hj-img-box">
				<img src="../../../static/img/cj_05.png" class="hj-img" />
				<span class="hj-text">
					获得勇于探索奖
				</span>
			</div>
			

			<div class="ms-box">
			<h1>· 活动规则</h1>
			<ul>
				<li>1.每人仅有一次参与中奖机会;</li>
				<li>2.中奖用户，我们会在活动结束后的5个工作日内与您联系;</li>
				<li>3.中奖流量和手机话费，活动结束后10个工作日内充值至您的手机号码;</li>
				<li>4.活动时间：<span class="bbColor">即日起——2018年1月10日</span></li>
				<li>5.本次活动实时动态会更新在平安脸谱微信公众号(PAtianxiatong);</li>
				<li>6.活动禁止任何形式作弊，一经发现取消中奖资格;</li>
				<li>7.本活动解释权归平安脸谱所有。</li>
				<li>8.奖品设置</li>
			</ul>
			<div class="jp-box">
				<span>黑科技奖</span>
				<span>Apple Iphone X</span>
				<span>勇于探索奖</span>
				<span>小米摄像头小白智能摄像机</span>
				<span>勇于实践奖</span>
				<span>金士顿U盘</span>
				<span>开拓创新奖</span>
				<span>20元话费</span>
				<span>眼光独到奖</span>
				<span>流量20M</span>
			</div>
		</div>
		</div>

		
		<div class="btns">
		<!-- <div class="btns hidden"> -->
			<img src="../../../static/img/cj_06.png" @click="goToImagerecognition" class="btn1" />
			<img src="../../../static/img/cj_07.png" @click="share" class="btn2" />
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      wordArr: []
    };
  },
  mounted() {},
  methods: {
    goToImagerecognition() {
      //页面跳转
      let self = this;
      // 带查询参数，变成 /register?plan=private
      self.$router.push({
        path: "imagerecognition"
      });
    },

    goToAi() {
      //页面跳转
      let self = this;
      // 带查询参数，变成 /register?plan=private
      self.$router.push({
        path: "ai"
      });
    },
    share() {
      alert("分享");
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
  overflow: auto;
  .bg {
    width: 100%;
    height: 100%;
    background: url(../../../static/img/bg.jpg) 50%/cover;
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .logo {
    width: 26%;
    position: absolute;
    top: 2.5%;
    right: 20px;
    z-index: 2;
  }
  .hj-img-box{
	  width: 100%;
	  position: relative;
  }
  .hj-box {
    width: 90%;
    position: relative;
    margin-left: 5%;
    margin-top: 14%;
    z-index: 2;
  }
  .hj-img {
    width: 100%;
    position: relative;
  }
  .hj-text {
    font-size: 50px;
    color: #e46321;
    display: block;
    position: absolute;
    width: 100%;
    font-weight: bold;
    top:60%;
	margin-top: -20px;
    text-align: center;
  }
  .ms-box {
    width: 90%;
    margin-left: 5%;
    margin-top: 3%;
    top: 30%;
    color: #28b1b7;
    z-index: 2;
  }
  h1 {
    color: #35e8f1;
  }
  ul {
    list-style-type: none;
    padding: 10px 0px;
  }
  li {
    line-height: 34px;
    font-size: 19px;
    color: #5ab1b0;
  }
  .bbColor {
    color: #c75c26;
  }
  .jp-box {
    width: 100%;
    color: #5ab1b0;
    border: 1px #5ab1b0 solid;
    overflow: hidden;
    span {
      width: 50%;
      display: block;
      float: left;
      text-align: center;
      line-height: 34px;
      box-sizing: border-box;
      line-height: 40px;
      border: 1px #5ab1b0 solid;
    }
  }
  .btns {
    width: 100%;
    position: relative;
    z-index: 2;
    margin-bottom: 5%;
    top: 3.5%;
    .jiantou {
      position: absolute;
      width: 7%;
      top: 0;
      z-index: 2;
      left: 50%;
      margin-left: -3%;
      animation: fudong 5s linear infinite alternate;
      transform: translate3d(0, -100%, 0);
      -moz-transform: translate3d(0, -100%, 0);
      -webkit-transform: translate3d(0, -100%, 0);
      -o-transform: translate3d(0, -100%, 0);
    }
    .btn1,
    .btn2 {
      width: 50%;
      display: block;
      margin: auto;
    }
  }
}
</style>