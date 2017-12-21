<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<div class="hj-box">
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
				<li>3.中奖流量和手机话费，，活动结束后10个工作日内充值至您的手机号码;</li>
				<li>4.活动时间：即日起————2018年1月10日</li>
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
    jieping() {}
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
  .logo {
    width: 26%;
    position: absolute;
    top: 2.5%;
    right: 20px;
    z-index: 2;
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
    top: 54%;
    text-align: center;
  }
  .ms-box{
	width: 86%;
	position: absolute;
	left: 7%;
	top: 30%;
	color: #28b1b7;
	z-index: 2;
  }
  h1{
	color: #35e8f1;
  }
  ul{
	list-style-type:none;
  }
  .jp-box{
	width: 100%;
	color: #28b1b7;
	border: 1px red solid;
  }
}
</style>