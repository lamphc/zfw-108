import { Toast } from 'antd-mobile'
import axios from 'axios'
// 导入轻提示


// 创建自己的axios实例
const BASE_URL = 'http://api-haoke-dev.itheima.net'
const MyAxios = axios.create({
  baseURL: BASE_URL
})

// 配置拦截器
// 请求拦截器
// Add a request interceptor
MyAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 显示loading
  Toast.loading('加载中...', 0)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
MyAxios.interceptors.response.use(function ({ data: { body, status, description } }) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('获取到后台数据了：', response)
  // 请求成功了
  Toast.hide()
  return {
    status, data: body, description
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export { BASE_URL }
export default MyAxios