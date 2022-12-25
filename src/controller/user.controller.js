const userService = require('../service/user.service')

class UserController {
  // 注册用户
  async registerUser(ctx, next) {
    const user = ctx.request.body
    
    const result = await userService.registerUser(user)
    
    ctx.body = {
      statusCode: 200,
      message: "新增用户成功~",
      data: result
    }
  }
  // 获取用户列表
  async getUserList(ctx, next) {
    let {offset, size} = ctx.query
    offset = offset * size

    const result = await userService.getUserListData(offset, size)
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取用户列表总数
  async getUserListCount(ctx, next) {
    const result = await userService.getUserListCount()
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 条件查询用户列表
  async queryUserList(ctx, next) {
    const {id, name} = ctx.request.body
    const result = await userService.queryUserListData(id, name)
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取条件查询用户列表总数
  async getQueryUserListCount(ctx, next) {
    const {id, name} = ctx.request.body
    const result = await userService.getQueryUserListDataCount(id, name)
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 根据用户id更新用户信息
  async updateUserInfo(ctx, next) {
    const {userId} = ctx.params
    const {name, role} = ctx.request.body

    const result = await userService.updateUserInfo(name, role, userId)
    ctx.body = {
      statusCode: 200,
      message: "用户信息更新成功~",
      data: result
    }
  }
  // 根据用户id删除用户信息
  async deleteUserInfo(ctx, next) {
    const {userId} = ctx.params
    const result = await userService.deleteUserInfo(userId)
    ctx.body = {
      statusCode: 200,
      message: "用户信息删除成功~",
      data: result
    }
  }
}

module.exports = new UserController()
