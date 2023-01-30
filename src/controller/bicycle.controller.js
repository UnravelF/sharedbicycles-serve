const bicycleService = require('../service/bicycle.service')
const errorTypes = require('../contants/error-types')

class BicycleController {
  // 添加单车设备数据
  async addBicycleData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user

    const {bike_id, lock_status, break_status, brand_name, put_city} = ctx.request.body
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await bicycleService.addBicycleData(bike_id, lock_status, break_status, brand_name, put_city)

    ctx.body = {
      statusCode: 200,
      message: "数据添加成功~",
      data: result
    }
  }
  // 获取单车数据
  async getBicycleData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    let {offset, size} = ctx.query
    offset = offset * size
    const result = await bicycleService.getBicycleData(offset, size)
    ctx.body = {
      statusCode: 200,
      message: "数据添加成功~",
      data: result
    }
  }
  // 获取单车数据总数
  async getBicycleDataCount(ctx, next) {
    const result = await bicycleService.getBicycleDataCount()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  } 
}

module.exports = new BicycleController()