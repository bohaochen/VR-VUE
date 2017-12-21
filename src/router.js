export default [{
		path: '/',
		name: '首页',
		component: (resolve) => {
			require(['./views/home/Index.vue'], resolve);
		}
	},
	{
		path: '/vr',
		name: '全景图',
		component: (resolve) => {
			require(['./views/home/Vr.vue'], resolve);
		}
	}, {
		path: '/eyes',
		name: '黑科技就在眼前',
		component: (resolve) => {
			require(['./views/home/Eyes.vue'], resolve);
		}
	}, {
		path: '/ai',
		name: '查看AI故事',
		component: (resolve) => {
			require(['./views/home/AIStory.vue'], resolve);
		}
	},
	{
		path: '/imagerecognition',
		name: '图像识别',
		component: (resolve) => {
			require(['./views/home/ImageRecognition.vue'], resolve);
		}
	},
	{
		path: '/userinfo',
		name: '录入用户信息',
		component: (resolve) => {
			require(['./views/home/UserInfo.vue'], resolve);
		}
	},
	{
		path: '/luckdraw',
		name: '抽奖页面',
		component: (resolve) => {
			require(['./views/home/LuckDraw.vue'], resolve);
		}
	},
	{
		path: '/demo',
		name: 'demo',
		component: (resolve) => {
			require(['./views/home/Demo.vue'], resolve);
		}
	},
	{
		path: '*',
		redirect: '/'
	}
]