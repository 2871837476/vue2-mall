/* 二次封装axios */
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入进度条的样式
import "nprogress/nprogress.css"

const requests = axios.create({
  // 基础路径：发生请求的时候，路径中会自动出现api（无需手写）
  baseURL: "/mock",
  timeout: 5000
})

// 请求拦截器
// config：配置对象，对象里面有一个header（请求头）属性很重要
requests.interceptors.request.use((config) => {
  // 进度条开始动
  nprogress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 进度条结束
  nprogress.done()
  return res
}, (error) => {
  return Promise.reject(error)
})

// 对外暴露
export default requests
