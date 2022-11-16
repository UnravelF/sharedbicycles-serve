const jwt = require('jsonwebtoken')

const errorTypes = require('../contants/error-types')
const userService = require('../service/user.service')

const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')

// 登录验证
const verifyLogin = async (ctx, next) => {
  const {name, password} = ctx.request.body

  // 判断用户名和密码是否为空
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  } 

  // 判断用户是否存在
  const result = await userService.getUserByName(name)
  const user = result[0]
  
  if(!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码是否正确
  if(md5password(password) !== user.password) {
    const err = new Error(errorTypes.PASSWORD_IS_INCORRENT)
    return ctx.app.emit('error', err, ctx)
  }

  ctx.user = user
  await next()
}

// 验证用户是否登录授权
const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if(!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', "")

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    // 验证成功 保存用户信息
    ctx.user = result
    await next()
  } catch (error) {
    const err = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth
}