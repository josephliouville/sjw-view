import axios from 'axios'
import store from '../store'
import session from './session'
import config from '../config'

const { TOKEN_NAME } = config

const ajax = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  withCredentials: true,
  timeout: 5000
})

ajax.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers[TOKEN_NAME] = session.get()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// // response 拦截器
// ajax.interceptors.response.use(
//   response => {
//     /**
//      * code为非20000是抛错 可结合自己业务进行修改
//      */
//     const res = response.data
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm(
//           '你已被登出，可以取消继续留在该页面，或者重新登录',
//           '确定登出',
//           {
//             confirmButtonText: '重新登录',
//             cancelButtonText: '取消',
//             type: 'warning'
//           }
//         ).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload() // 为了重新实例化vue-router对象 避免bug
//           })
//         })
//       }
//       return Promise.reject('error')
//     } else {
//       return response.data
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

const $get = function(url, params) {
  return ajax({
    method: 'get',
    url,
    params: params
  })
}

const $delete = function(url, params) {
  return ajax({
    method: 'delete',
    url,
    data: params
  })
}

const $put = function(url, params) {
  return ajax({
    method: 'put',
    url,
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (const key in data) {
        ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
      }
      return ret.replace(/&$/, '')
    }]
  })
}

const $post = function(url, params) {
  return ajax({
    method: 'post',
    url,
    data: params,
    transformRequest: [function(data) {
      let ret = ''
      for (const key in data) {
        ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
      }
      return ret.replace(/&$/, '')
    }]
  })
}

export { $get, $delete, $post, $put }

export default ajax
