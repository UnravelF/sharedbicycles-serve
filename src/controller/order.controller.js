const orderService = require('../service/order.service')
const errorTypes = require('../contants/error-types')

class OrderController {
  // 获取进行中订单数据
  async getProOrderData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    let {offset, size} = ctx.query
    offset = offset * size
    const result = await orderService.getProcessOderData(offset, size)
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取已完成订单数据
  async getFinOrderData(ctx, next) {
    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    let {offset, size} = ctx.query
    offset = offset * size
    const result = await orderService.getFinishOderData(offset, size)
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }

  // 获取进行中订单数据总数
  async getProOrderDataCount(ctx, next) {
    const result = await orderService.getProcessOderDataCount()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取已完成订单数据总数
  async getFinOrderDataCount(ctx, next) {
    const result = await orderService.getFinishOderDataCount()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
}

module.exports = new OrderController()

