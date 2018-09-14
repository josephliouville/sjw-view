import Vue from 'vue'
import ajax, { $get, $delete, $post, $put } from './request'

Vue.prototype.$http = ajax
Vue.prototype.$get = $get
Vue.prototype.$delete = $delete
Vue.prototype.$post = $post
Vue.prototype.$put = $put

Vue.prototype.request = {
  SUCCESS: 200,
  NOT_LOGIN: 10000,
  UNAUTHENTICATED: 10001
}
