import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    userInfo: {},
}

// 定义所需的 mutations
const mutations = {
	SETUSERINFO(state, userInfo) {
		state.userInfo = userInfo
	}
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})