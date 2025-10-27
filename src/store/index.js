import Vue from 'vue'
import Vuex from 'vuex'
import base from './modules/base'
Vue.use(Vuex)

// env里去获取当前的环境是否需要开启严格模式
// 在发布环境开启严格模式会造成性能上不必要的损失
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    base
  },
  // 是否开启严格模式
  strict: debug
})
