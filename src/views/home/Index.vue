<template>
<div class="home">
	<div class="word animated fadeIn" v-for="(item,index) in wordArr" :key="index">{{item}}</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      wordArr: []
    };
  },
  created() {},
  mounted() {
    let wordStr = `2017年12月26日，平安科技传来AI捷报人脸识别调用量累计突破1000000000数字的背后隐藏着怎样神秘的黑科技？`;
    // 添加打字效果
    for (let i = 0; i < wordStr.length; i++) {
      setTimeout(() => {
        this.wordArr.push(wordStr[i]);
      }, 160 * i);
    }
  },
  methods: {}
};
</script>

<style scoped>
.word {
  display: inline-block;
  font-size: 40px;
}
</style>