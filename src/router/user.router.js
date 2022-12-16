const Router = require('koa-router')

// 中间件
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')
const {
  verifyAuth
} = require('../middleware/auth.middleware')


// 控制器
const {
  registerUser,
  getUserList,
  getUserListCount,
  queryUserList,
  getQueryUserListCount
} = require('../controller/user.controller')


const userRouter = new Router({prefix: '/users'})

// 用户注册接口
userRouter.post('/', verifyUser, handlePassword, registerUser)

// 获取用户列表接口
userRouter.get('/list', verifyAuth, getUserList)
// 获取用户列表总数接口
userRouter.get('/listCount', verifyAuth, getUserListCount)
// 根据条件查询用户列表
userRouter.post('/querylist', verifyAuth, queryUserList)
// 获取根据条件查询用户数据总数
userRouter.post('/querylistCount', verifyAuth, getQueryUserListCount)

module.exports = userRouter;