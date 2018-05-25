import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  headers: {accessTocken:"123213wewqweqe"}
})
const host = (window as Mywindow).config.host
//const host='http://10.5.8.227:3000'
//axios.defaults.headers.accessTocken = "12313213dfaca6213";
export const getSystemName = function(name:string){
  return instance.request({
      url:`${host}/:1233`,
      method:'post',
      data:{ system_name: name}
  })
}


