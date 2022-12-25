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
  async getUserListData(offset, size) {
    const statement = `
    SELECT users.id, users.name, role.rolename, users.role_id, users.createAt, users.updateAt
      FROM users
      LEFT JOIN role ON users.role_id = role.id
    LIMIT ?, ?;`;
    const result = await connection.execute(statement, [offset, size])
    return result[0]
  }
  // 获取用户列表总数
  async getUserListCount() {
    const statement = `SELECT COUNT(users.id) 'count' FROM users;`;
    const [result] = await connection.execute(statement)
    return result
  }
  // 条件查询用户列表
  async queryUserListData(id, name) {
    const statement = `
    SELECT  * FROM users
    WHERE users.name LIKE ? AND users.id LIKE ?;
    `;
    const result = await connection.execute(statement, [`%${name}%`, `%${id}%`])
    return result[0]
  }
  // 获取条件查询用户列表总数
  async getQueryUserListDataCount(id, name) {
    const statement = `
    SELECT  COUNT(users.id) count FROM users
    WHERE users.name LIKE ? AND users.id LIKE ?;
    `;
    const result = await connection.execute(statement, [`%${name}%`, `%${id}%`])
    return result[0]
  }
  // 根据用户id更新用户信息
  async updateUserInfo(name, role, userId) {
    const statement = `
    UPDATE users SET name = ?, role_id = ? WHERE users.id = ?;
    `;
    const result = await connection.execute(statement, [name, role, userId])
    return result[0]
  }
  // 根据用户id删除用户信息
  async deleteUserInfo(userId) {
    const statement = `
    DELETE FROM users WHERE users.id = ?;
    `;
    const result = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new UserService()
