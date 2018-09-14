import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import session from './utils/session'
import config from './config'
import { getPermissions } from '@/api'

const { BASE_URL, HOME_PATH, LOGIN_URL } = config

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (session.get()) {
    if (to.path === LOGIN_URL) {
      next({ path: HOME_PATH })
      NProgress.done()
    } else {
      // ### 由于采用cookie机制，故仍要判断shiro登录失效
      if (!store.getters.authorized) {
        getPermissions().then(resp => {
          if (+resp.data.code === config.STATUS.NOT_LOGIN) {
            session.remove()
            next({ path: LOGIN_URL })
          } else {
            const { buttons, menus } = resp.data.data
            store.dispatch('setPermissions', { buttons, menus })
            router.addRoutes(store.getters.routes)
            next({ ...to, replace: true })
          }
        })
      } else {
        next()
      }
      NProgress.done()
    }
  } else {
    if (~BASE_URL.indexOf(to.path)) {
      next()
    } else {
      next(`${LOGIN_URL}?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
