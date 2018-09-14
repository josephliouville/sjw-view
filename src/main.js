import Vue from 'vue'

import 'normalize.css/normalize.css'
import './shared/styles/index.scss'
import '../theme/index.css'
import App from './App'
import router from './router'
import store from './store'
import './utils/ui' // 注册EL组件

import './utils/prototype'
import '@/icons'
import '@/permission'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
