/**
  二次封装AXIOS,利用其请求拦截和响应功能
*/  
import axios from 'axios'
import nProgress from 'nprogress'
import "nprogress/nprogress.css"
//创建axios实例并进行基本配置
const reqt = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

//请求拦截器: 在请求发出之前进行拦截,并处理一些业务
reqt.interceptors.request.use((config) => {
  //config配置对象里面包含一个重要属性----headers请求头
  nProgress.start()
  return config
})
//响应拦截器
reqt.interceptors.response.use((res) => {
  //成功的回调: 服务器响应数据回来后,响应拦截器可以检测到,处理一些业务逻辑
  nProgress.done()
  return res.data
}, (err) => {
  //响应失败的回调函数
  return Promise.reject(new Error('No response !!!'))
})

//导出reqt
export default reqt