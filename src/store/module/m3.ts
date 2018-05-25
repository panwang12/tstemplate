/**
 * Created by 61576 on 2018/5/10.
 */

interface m3state{
  name:string;
  count:number
};
let state:m3state
export default {
  state:{
    name:"m3",
    count:0
  },
  mutations:{
    incrementCount(state:m3state){
  state.count++
}
},
actions: {
},
getters: {}
}
