const Router = require('koa-router')

const formRouter = new Router()

// 中间件
const {
  verifyAuth
} = require('../middleware/auth.middleware')

// 控制器
const {
  getInvestFormData,
  getInvestCount,
  queryInvestData,
  getQueryInvestDataCount,
  updateInvestStatus,
  addInvestFormData,
  deleteInvestData,
  
  getRepairFormData,
  getRepairCount,
  queryRepairData,
  getQueryRepairDataCount,
  updateRepairStatus,
  addRepairFormData,
  deleteRepairData
} = require('../controller/form.controller')

// 请求投放表单数据
formRouter.get('/invest/list', verifyAuth, getInvestFormData)
// 请求投放表单总数
formRouter.get('/invest/listCount', verifyAuth, getInvestCount)
// 根据条件请求投放工单数据
formRouter.post('/invest/querylist', verifyAuth, queryInvestData)
// 获取根据条件请求投放工单数据总数
formRouter.post('/invest/querylistCount', verifyAuth, getQueryInvestDataCount)
// 更新投放工单状态
formRouter.patch('/invest/:investId', verifyAuth, updateInvestStatus)
// 新增投放工单
formRouter.post('/invest', verifyAuth, addInvestFormData)
// 根据id删除投放工单数据
formRouter.delete('/invest/:investId', verifyAuth, deleteInvestData)

// 请求维修表单数据
formRouter.get('/repair/list', verifyAuth, getRepairFormData)
// 请求维修表单总数
formRouter.get('/repair/listCount', verifyAuth, getRepairCount)
// 根据条件请求维修工单数据
formRouter.post('/repair/querylist', verifyAuth, queryRepairData)
// 获取根据条件请求维修工单数据总数
formRouter.post('/repair/querylistCount', verifyAuth, getQueryRepairDataCount)
// 更新维修工单状态
formRouter.patch('/repair/:repairId', verifyAuth, updateRepairStatus)
// 新增维修工单
formRouter.post('/repair', verifyAuth, addRepairFormData)
// 根据id删除维修表单数据
formRouter.delete('/repair/:repairId', verifyAuth, deleteRepairData)

module.exports = formRouter
