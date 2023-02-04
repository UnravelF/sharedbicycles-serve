const connection = require('../app/database')

class OrderService {
  // 获取进行中订单数据
  async getProcessOderData(offset, size) {
    const statement = `
      SELECT proceed_order.id, bicycles.bike_id, city.area, unlock_time, proceed_order.createAt, proceed_order.updateAt
      FROM proceed_order
      LEFT JOIN bicycles ON proceed_order.bike_id = bicycles.bike_id
      LEFT JOIN city ON proceed_order.unlock_address = city.id
      GROUP BY proceed_order.id ASC
      LIMIT ?, ?;
    `;

    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 获取已完成单数据
  async getFinishOderData(offset, size) {
    const statement = `
      SELECT finish_order.id, finish_order.bike_id, city.area, lock_time, profit, finish_order.createAt, finish_order.updateAt
      FROM finish_order
      LEFT JOIN bicycles ON finish_order.bike_id = bicycles.bike_id
      LEFT JOIN city ON finish_order.lock_address = city.id
      GROUP BY finish_order.id ASC
      LIMIT ?, ?;
    `;

    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  
  // 获取进行中订单数据总数
  async getProcessOderDataCount() {
    const statement = `SELECT COUNT(proceed_order.id) 'count' FROM proceed_order;`;
    const [result] = await connection.execute(statement)
    return result
  }
  // 获取已完成订单数据总数
  async getFinishOderDataCount() {
    const statement = `SELECT COUNT(finish_order.id) 'count' FROM finish_order;`;
    const [result] = await connection.execute(statement)
    return result
  }

}


module.exports = new OrderService()