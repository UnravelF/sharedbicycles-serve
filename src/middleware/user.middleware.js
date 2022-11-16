const errorType = require('../contants/error-types')

const userService = require('../service/user.service')

const md5password = require('../utils/password-handle')


const verifyUser = async (ctx, next) => {
    const {name, password} = ctx.request.body

    if(!name || !password) {
      const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await userService.getUserByName(name)
    console.log(result);
    if(result.length) {
      const error = new Error(errorType.USER_ALREADY_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    await next()
}

// 密码加密中间件
const handlePassword = async (ctx, next) => {
  const {password} = ctx.request.body

  ctx.request.body.password = md5password(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}
