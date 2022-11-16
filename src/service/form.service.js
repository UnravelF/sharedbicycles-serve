const connection = require('../app/database')

const cityService = require('./city.service')

const investSqlFragment = `
SELECT 
  invest_form.id, city.area '投放城市', suppliers.brand '供应商', put_amount '投放数量', put_time '投放时间', status '工单状态'
FROM invest_form
LEFT JOIN city ON invest_form.put_city = city.id
LEFT JOIN suppliers ON invest_form.brand_name = suppliers.id
`;

const repairSqlFragment = `
SELECT 
  repair_form.id, city.area '维修点位', suppliers.brand '供应商', repair_amount '维修数量', apply_time '申报时间', status '工单状态'
FROM repair_form
LEFT JOIN city ON repair_form.repair_city = city.id
LEFT JOIN suppliers ON repair_form.brand_name = suppliers.id
`;

class FormService {
  // 查询投放表单数据
  async getInvestForm(offset, size) {
    const statement = `
      ${investSqlFragment}
      LIMIT ?, ?;  
    `;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 查询投放表单总数
  async getInvestCount() {
    const statement = `
      SELECT COUNT(invest_form.id) '数据总数'
      FROM invest_form;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 根据工单状态查询投放工单数据
  async getStatusInvest(offset, size, status) {
    const statement = `
      ${investSqlFragment}
      WHERE status = ?
      LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [status, offset, size])
    return result
  }
  // 根据id更新投放工单状态
  async updateInvestStatus(status, investId) {
    const statement = `
    UPDATE invest_form SET invest_form.status = ? WHERE invest_form.id = ?;
    `;
    const [result] = await connection.execute(statement, [status, investId])
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
      ${repairSqlFragment}
      LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [offset, size])
    return result
  }
  // 查询维修表单总数
  async getRepairCount() {
    const statement = `
      SELECT COUNT(repair_form.id) '数据总数'
      FROM repair_form;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  // 根据维修工单状态查询工单数据
  async getStatusRepair(offset, size, status) {
    const statement = `
      ${repairSqlFragment}
      WHERE status = ?
      LIMIT ?, ?;
    `;
    const [result] = await connection.execute(statement, [status, offset, size])
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
