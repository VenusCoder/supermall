import axios from 'axios'

export default function request(config) {
    // 创建实例对象
  const instance = axios.create({
    // baseURL : "http://123.207.32.32:8000/api/vip",
    baseURL : "http://123.207.32.32:8000/api/wh",
    timeout: 5000
  })
  //axios的请求拦截器
  instance.interceptors.request.use( config => {
    return config
  }, err => {

  })
  //响应的拦截
  instance.interceptors.response.use( res => {
    return res.data
  }, err => {
    console.log(err)
  })
  //发送真正的网络请求
  return instance(config)
}