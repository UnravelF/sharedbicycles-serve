const Router = require('koa-router')

const {
  imgHandler
} = require('../middleware/file.middleware')

const {saveImgInfo, getImgInfo }  = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/image', imgHandler, saveImgInfo)
fileRouter.get('/image/:filename', getImgInfo)

module.exports = fileRouter