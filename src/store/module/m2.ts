/**
 * Created by 61576 on 2018/5/10.
 */

 interface m2state{
   name:string;
   count:number
 }
 let state:m2state
export default {
  state: {
    name:"m2",
    count:0
  },
  mutations:{
    changeSystemName(state:m2state,name:string){
      state.name = name
    }
},
actions: {
},
getters: {}
}
