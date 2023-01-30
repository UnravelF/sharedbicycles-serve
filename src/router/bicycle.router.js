const Router = require('koa-router')
const bikeRouter = new Router()

// 控制器
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  addBicycleData,
  getBicycleData,
  getBicycleDataCount
} = require('../controller/bicycle.controller')

// 添加单车设备数据
bikeRouter.post('/bicycle', verifyAuth, addBicycleData)
// 请求单车设备数据
bikeRouter.get('/bicycle/list', verifyAuth, getBicycleData)
// 请求单车设备总数
bikeRouter.get('/bicycle/listCount', verifyAuth, getBicycleDataCount) 

module.exports = bikeRouter
