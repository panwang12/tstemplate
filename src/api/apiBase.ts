import axios from 'axios'
import Cache from "../utils/cache"
import { Message} from "element-ui"
const errorCodes = require("../locale/ch-code.json");

export const beforeLogin = axios.create({
  timeout:5000
})

export const afterLogin = axios.create({
    timeout:5000
  })


beforeLogin.interceptors.response.use(function(response){
    if(response.data.errorCode){
        Message({
        dangerouslyUseHTMLString:true,
        type:"error",
        message:errorCodes[response.data.errorCode],
        duration:1000,
        })
    }
    return response
    },function(error){
    Message({
        dangerouslyUseHTMLString:true,
        type:"error",
        message:"服务器错误",
        duration:1000,
    })
    return Promise.reject(error)
})


afterLogin.interceptors.response.use(function(response){
    if(response.data.errorCode){
      Message({
        dangerouslyUseHTMLString:true,
        type:"error",
        message:errorCodes[response.data.errorCode],
        duration:1000,
      })
    }
    return response
  },function(error){
    Message({
      dangerouslyUseHTMLString:true,
      type:"error",
      message:"服务器错误",
      duration:1000,
    })
    return Promise.reject(error)
})

afterLogin.interceptors.request.use(function(config){
    config.headers.accessTocken = Cache.localGet("accessTocken") || ""
    return config;
  },function(error){

    return Promise.reject(error)
})
export default axios