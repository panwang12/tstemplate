import Vue from 'vue'
import Router from 'vue-router'
import Cache from "@/utils/cache"
import {modulesTypes} from "@/utils/constants"
Vue.use(Router)
const routes = [
  {
    path: '/login',
    name: 'login',
    meta:{
      authorize:true
    },
    component: ()=> import('m/login')
  },
  {
    path: '/',
    name: 'home',
    meta:{
      authorize:false,
      type:"main",
      icon:"home"
    },
    component: ()=> import('m/home')
  },
  {
    path: '/deployTask',
    name: 'deployTask',
    meta:{
      authorize:false,
      type:"main",
      icon:"task-list-black"
    },
    component: ()=> import('m/deployTask')
  },
  {
    path: '/doorControl',
    name: 'doorControl',
    meta:{
      authorize:false,
      type:"main",
      icon:"door"
    },
    component: ()=> import('m/doorControl')
  },
  {
    path: '/historyRecord',
    name: 'historyRecord',
    meta:{
      authorize:false,
      type:"main",
      icon:"sortByTime"
    },
    component: ()=> import('m/historyRecord')
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/personalInfo')
  },
  {
    path: '/equipmentManage',
    name: 'equipmentMange',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/equipmentManage')
  },
  {
    path: '/libManage',
    name: 'libManage',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/libManage')
  },
  {
    path: '/log',
    name: 'log',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/log')
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/personalInfo')
  },
  {
    path: '/roleManage',
    name: 'roleManage',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/roleManage')
  },
  {
    path: '/systemSetting',
    name: 'systemSetting',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/systemSetting')
  },
  {
    path: '/userManage',
    name: 'userManage',
    meta:{
      authorize:false,
      type:"setting",
    },
    component: ()=> import('m/setting/userManage')
  },
]
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.authorize){
    next()
  }else{
    next(false)
  }
  
})

const registerRoutes = (router as any).options.routes
export const visibleModule:any[]=[];
export const saveloginUserInfo = (accessTocken:string, permissionCode:any):void =>{
  Cache.localSet("accessTocken",accessTocken)
  // Cache.sessionSet("permissionCode",permissionCode)
  Object.keys(permissionCode).forEach(function(v, k){
    registerRoutes.forEach(function(v1){
        if(v1.name===modulesTypes[v]){
          v1.meta.authorize=true
        }
    })
  })
}

export default router 