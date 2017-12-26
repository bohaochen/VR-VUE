//import Index from './views/home/Index.vue'
//import Vr from './views/home/Vr.vue'
//import Eyes from './views/home/Eyes.vue'
//import AIStory from './views/home/AIStory.vue'
//import ImageRecognition from './views/home/ImageRecognition.vue'
//import UserInfo from './views/home/UserInfo.vue'
//
//export default [{
//		path: '/',
//		name: '首页',
//		component: Index
//	},
//	{
//		path: '/vr',
//		name: '全景图',
//		component:Vr
//	}, {
//		path: '/eyes',
//		name: '黑科技就在眼前',
//		component:Eyes
//	}, {
//		path: '/ai',
//		name: '查看AI故事',
//		component:AIStory
//	},
//	{
//		path: '/imagerecognition',
//		name: '图像识别',
//		component:ImageRecognition
//	},
//	{
//		path: '/userinfo',
//		name: '录入用户信息',
//		component:UserInfo
//	},
//	{
//		path: '*',
//		redirect: '/'
//	}
//]

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
	//	{
	//		path: '/luckdraw',
	//		name: '抽奖页面',
	//		component: (resolve) => {
	//			require(['./views/home/LuckDraw.vue'], resolve);
	//		}
	//	},
	//	{
	//		path: '/demo',
	//		name: 'demo',
	//		component: (resolve) => {
	//			require(['./views/home/Demo.vue'], resolve);
	//		}
	//	},
	{
		path: '*',
		redirect: '/'
	}
]