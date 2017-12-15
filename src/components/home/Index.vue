<template>
	<div class="test animated bounce">
		我是{{userName}}，这是首页,测试页面
	</div>
</template>

<script>
	export default {
		data() {
			//属性
			return {
				userName: "cbh",
				tableData: [],
			}
		},
		mounted() {
			//窗口启动时回调
			let self = this
			self.search()
		},
		methods: {
			//方法
			search() {
				let self = this
				let data = {}
				data.pageIndex = 1
				data.pageSize = 10
				data.dmId = ''
				data.status = ''
				self.$http.post(self.API.pushUserList, data).then((response) => {
					// 响应成功回调
					self.tableData = data;
				}, (response) => {
					// 响应错误回调
					self.tableData = []
					console.log("出现异常，请联系后台管理员！");
				});
			}
		}
	}
</script>

<style scoped>
	.test {
		font-size: 20px;
		color: #F43838;
		text-align: center;
	}
</style>