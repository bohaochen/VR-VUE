<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<img src="../../../static/img/cj_01.png" class="cjts" />
		<div class="join-box">
			<img src="../../../static/img/cj_02.png" class="b-bg">
			<input class="put-text-ipone" placeholder="请输入你的手机号"/>
			<input class="put-text-name" placeholder="请输入你的姓名"/>
      <div class="put-text-box">
        请确保填写正确的手机号，以便中奖后工作人员与您取得联系。
      </div>
      <div class="btns">
		  	<img src="../../../static/img/cj_04.png" @click="goToLuckdraw" class="btn" />
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
    jieping() {
      console.log("什么鬼")
    },
    goToLuckdraw() {
      //页面跳转
      let self = this;
      // 带查询参数，变成 /register?plan=private
      self.$router.push({
        path: "luckdraw",
      });
    },
  }
};
</script>

<style lang="scss" scoped>
input::-webkit-input-placeholder{
    color: #16a5a3;opacity:1;
}
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
  .cjts {
    width: 100%;
    position: absolute;
    top: 12%;
    z-index: 2;
  }
  .join-box {
    position: absolute;
    z-index: 2;
    width: 100%;
    bottom: 4%;
    .b-bg {
      width: 100%;
    }
  .put-text-ipone {
      width: 520px;
      height: 107px;
      position: absolute;
      top: 13%;
      left: 50%;
      margin-left: -260px;
      color: #16a5a3;
      font-size: 32px;
      outline: none;
      line-height: 90px;
      border: 0px;
      background: url("../../../static/img/cj_03.png");
      background-size: 100% 100%;
      padding: 0px 45px;
      box-sizing: border-box;
    }
	.put-text-name {
      width: 520px;
      height: 107px;
      position: absolute;
      top: 30%;
      left: 50%;
      margin-left: -260px;
      color: #16a5a3;
      font-size: 32px;
      outline: none;
      line-height: 90px;
      border: 0px;
      background: url("../../../static/img/cj_03.png");
      background-size: 100% 100%;
      padding: 0px 45px;
      box-sizing: border-box;
    }
  .put-text-box{
      color: #16a5a3;
      font-size: 24px;
      position: absolute;
      top: 46%;
      width: 520px;
      left: 50%;
      margin-left: -251px;
  }
  .btn{
    width: 449px;
    position: absolute;
    bottom: 14%;
    left: 50%;
    margin-left: -225px;
  }
  }
}
</style>