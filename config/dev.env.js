'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"https://testnew.appscomm.cn/"',
    FACE_API: '"https://testjs.appscomm.cn/fitness/"',
})