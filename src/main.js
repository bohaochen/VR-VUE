import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import routeConfig from './router'
import * as APIS from './api.js'
import qs from 'qs'; //使用qs模块转换payload参数为formdata请求参数

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	config.data = qs.stringify(config.data);
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	// 对响应数据做点什么
	return response;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

import {
	MA,
	toast,
	timeToNow,
	jsonFormat,
	dateFormat,
	numberinteger,
} from './filters';

Vue.use(VueRouter);

Vue.filter('timeToNow', timeToNow);
Vue.filter('dateFormat', dateFormat);
Vue.filter('numberinteger', numberinteger);

//动画回调
Vue.prototype.MA = MA;
Vue.prototype.toast = toast();

Vue.prototype.API = APIS;
Vue.prototype.$http = axios;

const router = new VueRouter({
	mode: 'history',
	routes: routeConfig,
})
router.beforeEach((to, from, next) => {
	//路由请求前做些什么
	if(isLoadAllImgs) {
		next();
	} else {
		let interval = setInterval(() => {
			if(isLoadAllImgs) {
				next();
				clearInterval(interval);
			}
		}, 50)
		loader.start();
	}
})

router.afterEach(transition => {
	//路由请求完做些什么
});

new Vue({
	el: '#app',
	template: '<App/>',
	router,
	components: {
		App
	}
}).$mount('#app');