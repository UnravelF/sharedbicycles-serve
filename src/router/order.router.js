const Router = require('koa-router')
const orderRouter = new Router()

// 控制器
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  getProOrderData,
  getProOrderDataCount,
  getFinOrderData,
  getFinOrderDataCount
} = require('../controller/order.controller')

// 请求进行中订单数据
orderRouter.get('/order/list', verifyAuth, getProOrderData)
// 请求进行中订单数据总数
orderRouter.get('/order/listCount', verifyAuth, getProOrderDataCount)

// 请求已完成订单数据
orderRouter.get('/finish/list', verifyAuth, getFinOrderData)
// 请求已完成订单数据总数
orderRouter.get('/finish/listCount', verifyAuth, getFinOrderDataCount)


module.exports = orderRouter