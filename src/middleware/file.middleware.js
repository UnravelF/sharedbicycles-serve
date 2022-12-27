const path = require('path')
const Multer = require('koa-multer')
const {IMG_PATH}  = require('../contants/file-path')

const imgUpload = Multer({
  dest: IMG_PATH
})
const imgHandler = imgUpload.single('img')

module.exports = {
  imgHandler
}