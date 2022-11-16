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
  getUserList
} = require('../controller/user.controller')


const userRouter = new Router({prefix: '/users'})

// 用户注册接口
userRouter.post('/', verifyUser, handlePassword, registerUser)

// 获取用户列表接口
userRouter.get('/list', verifyAuth, getUserList)

module.exports = userRouter;