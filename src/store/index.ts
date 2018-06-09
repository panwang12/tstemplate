/**
 * Created by 61576 on 2018/5/10.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from './module/login'
import equipment from './module/equipmentManage'
Vue.use(Vuex)
let state = {
  language:"en"
}
let mutations = {
  changeLanguage (state,current){
    state.language==="en"?state.language="ch":state.language="en"
  }
}
export default new Vuex.Store({
  state,
  mutations,
  modules: {
    login,
    equipment
  }
})
