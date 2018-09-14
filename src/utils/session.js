import config from '../config'

const { TOKEN_NAME } = config

function get(key) {
  key = key || TOKEN_NAME
  return sessionStorage.getItem(key)
}

function set(key, value) {
  if (arguments.length === 0) {
    throw new Error('At least one parameter')
  }

  let args
  if (arguments.length === 1) {
    args = [].slice.call(arguments)
    args.unshift(TOKEN_NAME)
  }
  sessionStorage.setItem(...args)
}

function remove(key) {
  key = key || TOKEN_NAME
  sessionStorage.removeItem(key)
}

function clear() {
  sessionStorage.clear()
}

const session = {
  get,
  set,
  remove,
  clear
}

export default session
