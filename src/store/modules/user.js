import session from '@/utils/session'
import { parseRoutes } from '@/utils'
import * as types from '../mutation-types'
import NotFound from '@/views/404'

const state = {
  token: session.get(),
  name: null,
  menus: [],
  buttons: [],
  routes: [],
  authorized: false // 采用cookie机制需要判断shiro失效
}

const getters = {
  menus: state => state.menus,
  buttons: state => state.buttons,
  routes: state => state.routes,
  authorized: state => state.authorized
}

const mutations = {
  [types.SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [types.SET_NAME]: (state, name) => {
    state.name = name
  },
  [types.SET_BUTTONS](state, buttons) {
    state.buttons = buttons
  },
  [types.SET_MENUS](state, menus) {
    state.menus = menus
  },
  [types.SET_AUTH](state, auth) {
    state.authorized = auth
  },
  [types.SET_ROUTES](state, routes) {
    for (let i = 0; i < routes.length; ++i) {
      parseRoutes(routes[i], routes, state.routes)
    }
    state.routes = state.routes
      .concat([
        {
          path: '/404',
          name: '404',
          hidden: true,
          component: NotFound
        },
        {
          path: '*',
          hidden: true,
          redirect: '/404'
        }
      ])

    // 必须在此处动态添加404，否则刷新任何页面会直接进入404
    // 若存在多个children(>1)则跳转到第一个children
    // state.routes.forEach((item) => {
    //   if (item.children) {
    //     if (item.children.length > 1) item.path = item.children[0].path
    //     else if (item.children.length === 1) item.redirect = 'no'
    //   }
    // })
  }
}

const actions = {
  setPermissions({ commit }, { menus, buttons }) {
    commit(types.SET_BUTTONS, buttons)
    commit(types.SET_MENUS, menus)
    commit(types.SET_AUTH, true)
    commit(types.SET_ROUTES, menus)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
