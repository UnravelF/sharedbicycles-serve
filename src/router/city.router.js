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
  getSuppliersCount,
  querySuppliersData,
  getQuerySuppliersDataCount,
  addSuppliersData,
  deleteSupplierData
} = require('../controller/city.controller')

// 请求城市点位数据
cityRouter.get('/city/list', verifyAuth, getCityData)

// 添加城市点位
cityRouter.post('/city', verifyAuth, addCityData)

// 根据id删除城市点位
cityRouter.delete('/city/:cityId', verifyAuth, deleteCityData)

// 请求供应商数据
cityRouter.get('/suppliers/list', verifyAuth, getSuppliersData)
// 获取供应商列表总数
cityRouter.get('/suppliers/listCount', verifyAuth, getSuppliersCount)
// 条件查询供应商
cityRouter.post('/suppliers/querylist', verifyAuth, querySuppliersData)
// 获取条件查询供应商列表总数
cityRouter.post('/suppliers/querylistCount', verifyAuth, getQuerySuppliersDataCount)
// 新增供应商
cityRouter.post('/suppliers', verifyAuth, addSuppliersData)
// 删除供应商
cityRouter.delete('/suppliers/:supplierId', verifyAuth, deleteSupplierData)
module.exports = cityRouter
