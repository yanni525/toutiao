/**
 * 封装 axios 请求模块
 */
 import axios from "axios"
 import store from "@/store";
 // 克隆一个
 const request = axios.create({
   baseURL: "http://toutiao.itheima.net", // 基础路径
   timeout: 3000
 })

 // 添加请求拦截器
 request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.tokenobj.token
   if (token) {
    config.headers.Authorization = `Bearer `+ token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
 
 export default request