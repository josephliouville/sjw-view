import ajax from '../utils/request'

export function login() {
  return ajax.get('/login')
}

export function getPermissions() {
  return ajax.get('/permission/load/menu')
}
