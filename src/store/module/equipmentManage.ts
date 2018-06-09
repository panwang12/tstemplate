/**
 * Created by 61576 on 2018/5/10.
 */
interface equipment{
  vidicon: {
    groupTotal:number;
    vidiconTotal:number;
    treeData:tree[];
  };
  keeper:{
    groupTotal:number;
    keeperTotal:number;
    treeData:tree[];
  }
};
interface tree{
  label:string;
  children:tree[];
}
let state:equipment

export const MODULE_PATH = "equipment"

export default {
  namespaced: true,
  state:{
    vidiconData: {
      groupTotal:3,
      vidiconTotal:5,
      treeData:[
        {label:"group1",children:[{label:"door1"},{label:"door2"}]},
        {label:"group2",children:[{label:"door1"},{label:"door2"}]},
        {label:"group3",children:[{label:"door1"}]},
      ],
    },
    keeperData: {
      groupTotal:2,
      keeperTotal:3,
      treeData:[
        {label:"group1",children:[{label:"door1"},{label:"door2"}]},
        {label:"group2",children:[{label:"door1"}]},
      ],
    }
  },
  mutations:{
    
  },
  actions: {
  },
  getters: {}
}
