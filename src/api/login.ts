
import {beforeLogin, afterLogin} from './apiBase'
import Cache from "../utils/cache"
import { Message} from "element-ui"

const errorCodes = require("../locale/ch-code.json");

const host = (window as Mywindow).config.host
//const host='http://10.5.8.227:3000'

export const login = function(userInfo){
  return beforeLogin.request({
      url:`${host}/bsp/login`,
      method:'post',
      data:userInfo
  })
} 
export const checkTocken = function(){
  return afterLogin.request({
      url:`${host}/bsp/validate`,
      method:'post',
      data: {}
  })
} 




