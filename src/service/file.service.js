const connection = require('../app/database')

class FileService {
  // 上传图片信息保存到数据库
  async createImg(filename, mimetype, size) {
    const statement = `INSERT INTO image (filename, mimetype, size) VALUES (?, ?, ?);`;
    await connection.execute(statement, [filename, mimetype, size])
    const res = await this.getImgInfo(filename)
    const result = `http://localhost:8088/upload/image/${res.filename}`
    return result
  }
  // 从数据库读取图片信息
  async getImgInfo(filename) {
    const statement = `SELECT * FROM image WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename])
    // return result.pop();
    return result[0]
  }
}

module.exports = new FileService()