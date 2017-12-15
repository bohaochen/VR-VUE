import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routeConfig from './router'
import VueResource from 'vue-resource'
import * as APIS from './api.js' 
//import store from './vuex/store'
//import Vuex from 'vuex'


import {
	timeToNow,
	jsonFormat,
	dateFormat,
	numberinteger,
} from './filters';

Vue.use(VueRouter)
Vue.use(VueResource)
//Vue.use(Vuex)

Vue.filter('timeToNow', timeToNow);
Vue.filter('dateFormat', dateFormat);
Vue.filter('numberinteger', numberinteger);

Vue.http.options.emulateJSON = true;

Vue.prototype.API = APIS;

const router = new VueRouter({
	routes: routeConfig,
})
router.beforeEach((to, from, next) => {
	next();
})

router.afterEach(transition => {
	
});

new Vue({
	el: '#app',
	template: '<App/>',
	router,
//	store,
	components: {
		App
	}
	//render: h => h(Login)
}).$mount('#app');