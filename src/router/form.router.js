const Router = require('koa-router')

const formRouter = new Router({prefix: '/form'})

// 中间件
const {
  verifyAuth
} = require('../middleware/auth.middleware')

// 控制器
const {
  getInvestFormData,
  getInvestCount,
  getStatusInvest,
  updateInvestStatus,
  addInvestFormData,
  deleteInvestData,
  
  getRepairFormData,
  getRepairCount,
  getStatusRepair,
  updateRepairStatus,
  addRepairFormData,
  deleteRepairData
} = require('../controller/form.controller')

// 请求投放表单数据
formRouter.get('/invest', verifyAuth, getInvestFormData)
// 请求投放表单总数
formRouter.get('/investCount', verifyAuth, getInvestCount)
// 请求投放工单未完成状态数据
formRouter.get('/invest/unfinished', verifyAuth, getStatusInvest)
// 请求投放工单已完成状态数据
formRouter.get('/invest/finished', verifyAuth, getStatusInvest)
// 更新投放工单状态
formRouter.patch('/invest/update/:investId', verifyAuth, updateInvestStatus)
// 新增投放工单
formRouter.post('/invest', verifyAuth, addInvestFormData)
// 根据id删除投放工单数据
formRouter.delete('/invest/:investId', verifyAuth, deleteInvestData)

// 请求维修表单数据
formRouter.get('/repair', verifyAuth, getRepairFormData)
// 请求维修表单总数
formRouter.get('/repairCount', verifyAuth, getRepairCount)
// 请求维修工单未完成状态数据
formRouter.get('/repair/unfinished', verifyAuth, getStatusRepair)
// 请求维修工单未完成状态数据
formRouter.get('/repair/finished', verifyAuth, getStatusRepair)
// 更新维修工单状态
formRouter.patch('/repair/update/:repairId', verifyAuth, updateRepairStatus)
// 新增维修工单
formRouter.post('/repair', verifyAuth, addRepairFormData)
// 根据id删除维修表单数据
formRouter.delete('/repair/:repairId', verifyAuth, deleteRepairData)

module.exports = formRouter
