// 对 axios 进行简单的二次封装
import axios from 'axios'
import config from '../../config'

const baseURL = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro

class HttpRequest {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  // 获取 axios 相关配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseURL,
      header: {}
    }
    return config
  }
  // 拦截器
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      // console.log(response, 'response')
      return response;
    }, function (error) {
      // 对响应错误做点什么
      console.log(error, 'error')
      return Promise.reject(error);
    });
  }
  // 发起请求时调用
  request(options) {
    // 创建 axios 实例
    const instance = axios.create()
    // 获取 axios 配置参数
    options = {...this.getInsideConfig, ...options}
    // 为 axios 实例添加拦截器
    this.interceptors(instance)
    return instance(options)
  }

}

export default new HttpRequest(baseURL)