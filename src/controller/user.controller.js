const userService = require('../service/user.service')

class UserController {
  // 注册用户
  async registerUser(ctx, next) {
    const user = ctx.request.body
    
    const result = await userService.registerUser(user)
    
    ctx.body = result
  }
  // 获取用户列表
  async getUserList(ctx, next) {
    const result = await userService.getUserListData()
    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
}

module.exports = new UserController()
