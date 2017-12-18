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
	},
]