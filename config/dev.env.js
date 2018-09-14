'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  // BASE_API: '"http://192.168.3.24:8080"',
  BASE_API: '"http://localhost:8080"',
  // BASE_API: '"http://10.5.27.222:8080"',
})
