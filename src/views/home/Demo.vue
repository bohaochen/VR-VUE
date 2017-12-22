<template>
	<div class="home" id="home">
		<div class="text_box">
			<div class="text animated fadeIn" v-for="(item,index) in wordArr" :key="index">{{item}}</div>
		</div>

		<img src="../../../static/img/wzh3j_01.png" width="100%" alt="">
		<button @click="jieping()">点我截屏</button>
		<img class="html_img" :src="htmlImg" :style="{display:htmlImg ? 'block' : 'none'}">
	</div>
</template>

<script>
	import html2canvas from 'html2canvas'
	export default {
		data() {
			return {
				wordArr: [],
				htmlImg: ""
			};
		},
		created() {},
		mounted() {
			let wordStr = `平安科技传来AI捷报：
			人脸识别调用量累计突破10亿，
			数字的背后究竟隐藏着怎样的黑科技？`;
			// 添加打字效果
			for(let i = 0; i < wordStr.length; i++) {
				setTimeout(() => {
					this.wordArr.push(wordStr[i]);
				}, 160 * i);
			}
		},
		methods: {
			jieping() {
				html2canvas(document.querySelector("#home")).then(canvas => {
					let url;
					// canvas.width = window.innerWidth;
					// canvas.height = window.innerHeight;
					document.body.appendChild(canvas);
					url = canvas.toDataURL();
					this.htmlImg = url;
				});

				// html2canvas(document.getElementById("home"), {
				// 	scale: 1,
				// 	backgroundColor: "#fff"
				// }).then(canvas => {
				// 	console.log(canvas);
				// 	canvas.width = window.innerWidth;
				// 	canvas.height = window.innerHeight;
				// 	let url = canvas.toDataURL();
				// 	this.htmlImg = url;
				// 	alert("截屏成功，可以长按分享啦");
				// });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.text_box {
		height: 300px;
		.text {
			display: inline-block;
			font-size: 20px;
		}
	}
	
	.html_img {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: none;
	}
</style>