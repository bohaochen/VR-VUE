<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />
		<img src="../../../static/img/cj_01.png" class="cjts" />
		<div class="join-box">
			<img src="../../../static/img/cj_02.png" class="b-bg">
			<div class="put-text">我的妈呀</div>
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
    top: 20px;
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
	.b-bg{
		width: 100%;
	};
	.put-text{
		width: 400px;
		height: 30px;
		background: url("../../../static/img/cj_03.png");
	}
  }
}
</style>