const formService = require('../service/form.service')
const errorTypes = require('../contants/error-types')

class FormController {
  // 获取投放表单数据
  async getInvestFormData(ctx, next) {
    let {offset, size} = ctx.query
    offset = offset * size

    const result = await formService.getInvestForm(offset, size)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取投放表单总数
  async getInvestCount(ctx, next) {
    const result = await formService.getInvestCount()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 条件获取投放工单数据
  async queryInvestData(ctx, next) {
    let {status, area, brand} = ctx.request.body
    let {currentPage, pageSize} = ctx.query
    console.log(ctx.request.body)
    console.log(ctx.query)
    const offset = (currentPage - 1) * pageSize
    const size = pageSize
    console.log(offset, size)

    const result = await formService.queryInvestData(status, area, brand, offset, size)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取条件获取投放工单数据总数
  async getQueryInvestDataCount(ctx, next) {
    let {status, area, brand} = ctx.request.body

    const result = await formService.getQueryInvestDataCount(status, area, brand)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }


  // 根据工单id修改投放工单状态
  async updateInvestStatus(ctx, next) {
    const {investId} = ctx.params
    console.log(investId)
    const {area, put_amount, status, brand} = ctx.request.body
    console.log(ctx.request.body)

    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await formService.updateInvestStatus(area, put_amount, status, brand, investId)
    ctx.body = {
      statusCode: 200,
      message: "数据更新成功~",
      data: result
    }
  }
  // 新增投放工单数据
  async addInvestFormData(ctx, next) {
    const {area, put_amount, status, brand} = ctx.request.body

    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await formService.addInvestFormData(area, put_amount, status, brand)
    ctx.body = {
      statusCode: 200,
      message: "数据新增成功~",
      data: result
    }
  }
  // 根据id删除投放工单数据
  async deleteInvestData(ctx, next) {
    const {investId} = ctx.params

    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await formService.deleteInvestData(investId)
    ctx.body = {
      statusCode: 200,
      message: "数据删除成功~",
      data: result
    }
  }

  // 获取维修表单数据
  async getRepairFormData(ctx, next) {
    let {offset, size} = ctx.query
    offset = offset * size
    console.log(offset, size)

    const result = await formService.getRepairForm(offset, size)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取维修表单总数
  async getRepairCount(ctx, next) {
    const result = await formService.getRepairCount()

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 根据维修工单状态获取工单数据
  async queryRepairData(ctx, next) {
    let {status, area, brand} = ctx.request.body
    let {currentPage, pageSize} = ctx.query
    console.log(ctx.request.body)
    console.log(ctx.query)
    const offset = (currentPage - 1) * pageSize
    const size = pageSize
    console.log(offset, size)

    const result = await formService.queryRepairData(status, area, brand, offset, size)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 获取条件获取维修工单数据总数
  async getQueryRepairDataCount(ctx, next) {
    let {status, area, brand} = ctx.request.body
    const result = await formService.getQueryRepairDataCount(status, area, brand)

    ctx.body = {
      statusCode: 200,
      message: "数据请求成功~",
      data: result
    }
  }
  // 根据工单id修改维修工单状态
  async updateRepairStatus(ctx, next) {
    const {repairId} = ctx.params
    const {status} = ctx.request.body

    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await formService.updateRepairStatus(status, repairId)
    ctx.body = {
      statusCode: 200,
      message: "数据更新成功~",
      data: result
    }
  }
  // 新增维修工单数据
  async addRepairFormData(ctx, next) {
    const {area, amount, status, brand} = ctx.request.body

    // 获取角色id
    const {role_id} = ctx.user
    // 判断登录用户的角色操作权限
    if (role_id !== 1) {
      const error = new Error(errorTypes.NOPERMISSION)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await formService.addRepairFormData(area, amount, status, brand)
    ctx.body = {
      statusCode: 200,
      message: "数据新增成功~",
      data: result
    }
  }
    // 根据id删除投放工单数据
    async deleteRepairData(ctx, next) {
      const {repairId} = ctx.params

      // 获取角色id
      const {role_id} = ctx.user
      // 判断登录用户的角色操作权限
      if (role_id !== 1) {
        const error = new Error(errorTypes.NOPERMISSION)
        return ctx.app.emit('error', error, ctx)
      }
      
      const result = await formService.deleteRepairData(repairId)
      ctx.body = {
        statusCode: 200,
        message: "数据删除成功~",
        data: result
      }
    }
}

module.exports = new FormController()