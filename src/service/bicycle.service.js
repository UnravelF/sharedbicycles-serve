const connection = require('../app/database')

class BicycleService {
  // 添加单车设备数据
  async addBicycleData(bike_id, lock_status, break_status, brand_name, put_city) {
    const statement = `
    INSERT INTO bicycles (bike_id, lock_status, break_status, brand_name, put_city) VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await connection.execute(statement, [bike_id, lock_status, break_status, brand_name, put_city])
    return result
  }
  // 获取单车设备数据
  async getBicycleData() {
    const statement = `
    SELECT bicycles.id, bike_id, suppliers.brand '品牌', city.area '开锁点位', lock_status '开锁状态', break_status '是否损坏'
    FROM bicycles
    LEFT JOIN suppliers ON suppliers.id = bicycles.brand_name
    LEFT JOIN city ON city.id = bicycles.put_city
    GROUP BY bicycles.id ASC;
    `;

    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new BicycleService()