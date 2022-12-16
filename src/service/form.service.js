const connection = require('../app/database')

const cityService = require('./city.service')

const investSqlFragment = `
FROM invest_form
    LEFT JOIN city ON invest_form.put_city = city.id
    LEFT JOIN suppliers ON invest_form.brand_name = suppliers.id
    WHERE status LIKE ? AND city.area LIKE ? AND suppliers.brand LIKE ?
`;

const repairSqlFragment = `
FROM repair_form
    LEFT JOIN city ON repair_form.repair_city = city.id
    LEFT JOIN suppliers ON repair_form.brand_name = suppliers.id
    WHERE status LIKE ? AND city.area LIKE ? AND suppliers.brand LIKE ?
`;

class FormService {
  // 查询投放表单数据
  async getInvestForm(offset, size) {
    const statement = `
    SELECT invest_form.id, city.id 'cityid', suppliers.id 'brandid', city.area, suppliers.brand, put_amount, put_time, status
    FROM invest_form
    LEFT JOIN city ON city.id = invest_form.put_city
    LEFT JOIN suppliers ON  suppliers.id = invest_form.brand_name
    GROUP BY invest_form.id DESC
    LIMIT ?, ?;  
    `;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 查询投放表单总数
  async getInvestCount() {
    const statement = `
    SELECT COUNT(invest_form.id) 'count'
    FROM invest_form;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 根据条件查询投放工单数据
  async queryInvestData(status, area, brand, offset, size) {
    const statement = `
    SELECT invest_form.id, city.area, suppliers.brand, put_amount, put_time, status
    ${investSqlFragment}
    GROUP BY invest_form.id DESC
    LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [`%${status}%`, `%${area}%`, `%${brand}%`, offset, size])
    return result
  }
  // 获取根据条件查询投放工单数据总数
  async getQueryInvestDataCount(status, area, brand) {
    const statement = `
    SELECT COUNT(invest_form.id) count
    ${investSqlFragment}
    `;
    const [result] = await connection.execute(statement, [`%${status}%`, `%${area}%`, `%${brand}%`])
    return result
  }

  // 根据id更新投放工单状态
  async updateInvestStatus(area, put_amount, status, brand, investId) {
    const statement = `
    UPDATE invest_form SET invest_form.status = ?, put_city = ?, put_amount = ?, brand_name = ? WHERE invest_form.id = ?;
    `;
    const [result] = await connection.execute(statement, [status, area, put_amount, brand, investId])
    // 更新状态后对应更新城市点位的投放数量
    await cityService.updateCityData()
    return result
  }
  // 新增投放表单数据
  async addInvestFormData(area, amount, status, brand) {
    const statement = `
      INSERT INTO invest_form (put_city, put_amount, status, brand_name) VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.execute(statement, [area, amount, status, brand])
    // 添加新投放工单后更新点位投放数据
    await cityService.updateCityData()
    return result
  }
  // 根据id删除投放表单数据
  async deleteInvestData(investId) {
    const statement = `
    DELETE FROM invest_form WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [investId])
    // 删除投放工单后更新点位投放数据
    await cityService.updateCityData()
    return result
  }

  // 查询维修表单数据
  async getRepairForm(offset, size) {
    const statement = `
    SELECT repair_form.id, city.area, suppliers.brand, repair_amount, apply_time, status
    FROM repair_form
    LEFT JOIN city ON repair_form.repair_city = city.id
    LEFT JOIN suppliers ON repair_form.brand_name = suppliers.id
    GROUP BY repair_form.id
    LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 查询维修表单总数
  async getRepairCount() {
    const statement = `
      SELECT COUNT(repair_form.id) 'count'
      FROM repair_form;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 根据维修工单状态查询工单数据
  async queryRepairData(status, area, brand, offset, size) {
    const statement = `
    SELECT repair_form.id, city.area, suppliers.brand, repair_amount, apply_time, status
    ${repairSqlFragment}
    GROUP BY repair_form.id
    LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [`%${status}%`, `%${area}%`, `%${brand}%`, offset, size])
    return result
  }
  // 获取根据维修工单状态查询工单数据总数
  async getQueryRepairDataCount(status, area, brand) {
    const statement = `
    SELECT COUNT(repair_form.id) 'count'
    ${repairSqlFragment}
    ;`;
    const [result] = await connection.execute(statement, [`%${status}%`, `%${area}%`, `%${brand}%`])
    return result
  }
  // 根据id更新维修工单状态
  async updateRepairStatus(status, repairId) {
    const statement = `
    UPDATE repair_form SET status = ? WHERE id = ?;
    `;
    const [result] = await connection.execute(statement, [status, repairId])
    return result
  }
  // 新增维修工单数据
  async addRepairFormData(area, amount, status, brand) {
    const statement = `
    INSERT INTO repair_form (repair_city, repair_amount, status, brand_name) VALUES (?, ?, ?, ?);
    `;
    const [result] = await connection.execute(statement, [area, amount, status, brand])
    return result
  }
    // 根据id删除维修表单数据
    async deleteRepairData(repairId) {
      const statement = `
      DELETE FROM repair_form WHERE id = ?;
      `;
      const [result] = await connection.execute(statement, [repairId])
      return result
    }
}

module.exports = new FormService()
