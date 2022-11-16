const Router = require('koa-router')

const cityRouter = new Router({prefix: '/city'})

// 控制器
const {
  verifyAuth
} = require('../middleware/auth.middleware')
const {
  getCityData,
  addCityData,
  deleteCityData
} = require('../controller/city.controller')

// 请求城市点位数据
cityRouter.get('/', verifyAuth, getCityData)

// 添加城市点位
cityRouter.post('/', verifyAuth, addCityData)

// 根据id删除城市点位
cityRouter.delete('/:cityId', verifyAuth, deleteCityData)

module.exports = cityRouter
