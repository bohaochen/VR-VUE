export default [{
	path: '/index',
	component: (resolve) => {
		require(['./components/home/Index.vue'], resolve);
	}
}, {
	path: '*',
	component: (resolve) => {
		require(['./components/home/Index.vue'], resolve);
	}
}]