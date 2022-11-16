const Router = require('koa-router')

const authRouter = new Router()

const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  login,
  success,
  getRoleByUserId,
  getMenus,
  getMenusByRoleId,
  getRoleList,
  queryRoleList
} = require('../controller/auth.controller')

// 用户登录接口
authRouter.post('/login', verifyLogin, login)

// 验证用户是否登录授权
authRouter.get('/auth', verifyAuth, success)

// 根据用户id获取用户角色
authRouter.get('/role', verifyAuth, getRoleByUserId)

// 获取菜单
authRouter.get('/menus', verifyAuth, getMenus)

// 根据角色id获取角色菜单
authRouter.get('/roleMenus/:roleId', verifyAuth, getMenusByRoleId)

// 获取角色列表
authRouter.get('/role/list', verifyAuth, getRoleList)

// 根据条件查询角色列表
authRouter.post('/role/querylist', verifyAuth, queryRoleList)

module.exports = authRouter
