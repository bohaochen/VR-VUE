<template>
	<div id="app">
		<transition name="bounce">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'app',
		components: {}
	}
</script>

<style>
	@import "../node_modules/font-awesome/css/font-awesome.min.css";
	@import "../node_modules/flex.css/dist/flex.css";
	@import "./common/css/animate.css";
	@import "./common/css/common.css";
	
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
	
	@keyframes bounce-out {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(0);
		}
	}
	#app {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
	}
</style>