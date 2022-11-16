const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

// 跨域
const cors = require('koa2-cors')

const useRoutes = require('../router')

const errorHandler = require('./error-handle')

const app = new Koa()

app.use(bodyParser())
app.use(cors())
useRoutes(app)

app.on('error', errorHandler)

module.exports = app
