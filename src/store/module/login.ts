/**
 * Created by 61576 on 2018/5/10.
 */
interface login{
  isLogin:boolean;
};
let state:login

export const MODULE_PATH = "login"

export default {
  namespaced: true,
  state:{
    isLogin:false,
  },
  mutations:{
    changeLoginStatus(state:login, status:boolean){
      state.isLogin = status;
    },
  },
  actions: {
  },
  getters: {}
}
