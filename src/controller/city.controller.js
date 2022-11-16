const cityService = require('../service/city.service')
const errorTypes = require('../contants/error-types')

class CityController {
  // 获取城市点位数据
  async getCityData(ctx, next) {
    const result = await cityService.getCityData()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 添加城市点位数据
  async addCityData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user

    const {area} = ctx.request.body
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await cityService.addCityData(area)

    ctx.body = {
      statusCode: 200,
      message: "数据添加成功~",
      data: result
    }
  }
  // 根据id删除点位数据
  async deleteCityData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user
    // 获取删除对应点位id
    const {cityId} = ctx.params
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }
    const result = await cityService.deleteCityData(cityId)
    ctx.body = {
      statusCode: 200,
      message: "数据删除成功~",
      data: result
    }
  }
}

module.exports = new CityController()
