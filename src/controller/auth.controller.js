const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')

const authService = require('../service/auth.service')

class AuthController {
  // 用户登录
  async login(ctx, next) {
    const {id, name, role_id} = ctx.user

    const token = jwt.sign({id, name, role_id}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      name,
      role_id,
      token
    }
  }
  // 授权成功
  async success(ctx, next) {
    ctx.body = "授权成功~"
  }
  // 根据用户id获取用户角色
  async getRoleByUserId(ctx, next) {
    // 获取登录用户id
    const {id} = ctx.user

    const result = await authService.getRoleByUserId(id)
    ctx.body = {
      statusCode: 200,
      message: "数据获取成功~",
      roleId: result
    }
  }
  // 获取菜单
  async getMenus(ctx, next) {
    const result = await authService.getMenusData()
    
    ctx.body = {
      statusCode: 200,
      message: "数据获取成功~",
      data: result
    }
  }
  // 根据角色id获取角色菜单
  async getMenusByRoleId(ctx, next) {
    const {roleId} = ctx.params
    
    const result = await authService.getMenusByRoleId(roleId)
  
    ctx.body = {
      statusCode: 200,
      message: "数据获取成功~",
      data: result
    }
  }
  // 获取角色列表
  async getRoleList(ctx, next) {
    const result = await authService.getRoleListData()

    ctx.body = {
      statusCode: 200,
      message: "数据获取成功~",
      data: result
    }
  }
  // 根据条件查询角色列表
  async queryRoleList(ctx, next) {
    const {id, rolename} = ctx.request.body

    const result = await authService.queryRoleListData(id, rolename)

    ctx.body = {
      statusCode: 200,
      message: "数据获取成功~",
      data: result
    }
  }
}

module.exports = new AuthController()
