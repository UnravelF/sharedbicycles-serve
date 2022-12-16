const Router = require('koa-router')

const cityRouter = new Router()

// 控制器
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  getCityData,
  addCityData,
  deleteCityData,

  getSuppliersData,
  getSuppliersCount
} = require('../controller/city.controller')

// 请求城市点位数据
cityRouter.get('/city/list', verifyAuth, getCityData)

// 添加城市点位
cityRouter.post('/', verifyAuth, addCityData)

// 根据id删除城市点位
cityRouter.delete('/:cityId', verifyAuth, deleteCityData)

// 请求供应商数据
cityRouter.get('/suppliers/list', verifyAuth, getSuppliersData)
// 获取供应商列表总数
cityRouter.get('/suppliers/listCount', verifyAuth, getSuppliersCount)

module.exports = cityRouter
