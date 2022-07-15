/* eslint-disable */
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

//  跳转路由
/* import router from '@/router' */
const service = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1',
  timeout: 5000
})

//  请求拦截器
service.interceptors.request.use((config) => {
  config.headers['Authorization'] = `${getToken()}`
  return config
})

//  响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, meta } = response.data
    if (meta.status === 200 || meta.status === 201 || meta.status === 204) {
      Message.success(meta.msg)
      return data
    } else {
      Message.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)
//  导出实例
export default service
