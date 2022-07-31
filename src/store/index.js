import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)
// vuex
// vuex的数据是响应式的，是一个本地仓库，存放数据
// vuex的数据必须在vuex里修改 自产自销
// mutations定义方法去修改，在外接调用这个方法
// mutations方法 建议大写
// mutations方法可以接受2个参数，一个是state,第二个是：payload
// $store.commit('方法名')用于触发mutations里的方法
export default new Vuex.Store({
  state: {
    // num:0
    tokenobj: getToken() || {}
  },
  getters: {},
  mutations: {
    // SET_NUM(state,payload){
    //   console.log(payload);//10,可以拿到SET_NUM，所在页面定义的的参数
    //   state.num+=payload
    // }
    SET_TOKEN(state, payload) {
      state.tokenobj = payload
      // token存入本地存储
      // 本地存储 操作是JSON格式字符串
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
