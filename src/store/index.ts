/**
 * Created by 61576 on 2018/5/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import m1 from './module/m1'
import m2 from './module/m2'
import m3 from './module/m3'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a: m1,
    b: m2,
    c: m3
  }
})
