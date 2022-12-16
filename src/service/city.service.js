const connection = require('../app/database')

class CityService {
  // 查询城市点位数据
  async getCityData () {
    const statement = `
    SELECT * FROM city;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 添加城市点位数据
  async addCityData(area) {
    const statement = `
    INSERT INTO city (area) VALUES (?);
    `;
    const [result] = await connection.execute(statement, [area])
    return result
  }
  // 根据id删除点位数据
  async deleteCityData(id) {
    const statement = `
    DELETE FROM city WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [id])
    return result
  }
  // 根据投放工单已投放状态数据更新城市点位投放数量
  async updateCityData() {
    const statement = `
    UPDATE city,
           (
            SELECT SUM(invest_form.put_amount) sum, put_city
              FROM invest_form WHERE invest_form.status = 1
            GROUP BY put_city
           ) city_invest
    SET
      city.amount = city_invest.sum
    WHERE city.id = city_invest.put_city;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 获取供应商列表数据
  async getSuppliersData(offset, size) {
    const statement = `SELECT * FROM suppliers  LIMIT ?, ?;;`;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 获取供应商列表数据总数
  async getSuppliersCount(){
    const statement = `SELECT COUNT(suppliers.id) 'count' FROM suppliers;`;
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new CityService()
