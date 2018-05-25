/**
 * Created by 61576 on 2018/5/10.
 */

interface m1state{
  name:string;
  count:number
}
let state:m1state
export default {
  state: {
    name:"m1",
    count:0
  },
  mutations:{
    changeSystemName(state:m1state,name:string){
      state.name = name
    }
  },
  actions: {
  },
  getters: {}
}

