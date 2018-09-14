const config = {
  TOKEN_NAME: 'token',
  LOGIN_URL: '/login',
  BASE_URL: ['/login', '/404', '/500'],
  HOME_PATH: '/',
  MIN_BODY_WIDTH: 1024,
  STATUS: {
    SUCCESS: 200,
    NOT_LOGIN: 10000,
    UNAUTHENTICATED: 10001
  }
}

export default config
