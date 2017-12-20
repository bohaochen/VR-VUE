<template>
	<div class="content">
		<div class="bg"></div>
		<img src="../../../static/img/pn_logo_03.png" class="logo" />

		<div class="album">
			<img class="waikuang" src="../../../static/img/renlianshibiekuangdeng.png" />
			<div class="album-content">
				<div class="title">点击上传个人正面自拍照</div>
				<div>
					<input type="file" name="upload" accept="image/*">
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
				wordArr: [],
			};
		},
		mounted() {

		},
		methods: {
			mashangtansuo() {
				//马上探索
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
				.title{
					color: #7EF9FF;
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