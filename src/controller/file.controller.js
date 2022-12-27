const fs = require('fs')
const { IMG_PATH} = require('../contants/file-path')

const fileService = require('../service/file.service')

class FileController {
  // 上传图片
  async saveImgInfo(ctx, next) {
    // 获取图片信息
    const {filename, mimetype, size} = ctx.req.file
    console.log(ctx.req.file)
    // 图片信息保存到数据库
    const result = await fileService.createImg(filename, mimetype, size)

    ctx.body = {
      statusCode: 200,
      message: "上传图片成功~",
      data: result
    }
  }
  // 获取图片
  async getImgInfo(ctx, next) {
    let {filename} = ctx.params;
    const imgInfo = await fileService.getImgInfo(filename)
    console.log(imgInfo)

    ctx.response.set('content-type', imgInfo.mimetype)
    ctx.body = fs.createReadStream(`${IMG_PATH}/${imgInfo.filename}`);
  }
}

module.exports = new FileController()