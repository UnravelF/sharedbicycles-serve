const connection = require('../app/database')

class UserService {
  // 注册用户
  async registerUser(user) {
    const { name, password, role } = user;
    const statement = `INSERT INTO users (name, password, role_id) VALUES (?, ?, ?);`;

    const result = await connection.execute(statement, [name, password, role]);
    // 将user存储到数据库中
    return result[0];
  }
  // 判断用户是否存在
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;

    const result = await connection.execute(statement, [name]);
    
    return result[0];
  }
  // 获取用户列表
  async getUserListData() {
    const statement = `SELECT * from users;`;
    const result = await connection.execute(statement)
    return result[0]
  }
}

module.exports = new UserService()
