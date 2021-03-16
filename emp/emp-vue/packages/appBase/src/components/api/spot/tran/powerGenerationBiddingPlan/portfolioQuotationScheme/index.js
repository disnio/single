import fetch from '@common/utils/fetch';

/* 2020-01-09  #767  qinhz   交易管理--发电侧报价方案管理-组合报价方案-前端开发 */

// 组合报价方案主表查询展示
export function getcombinationQuotationScheme(query) {
  return fetch({
    url: '/api/tran/smcombquotschemenew/getMainPage',
    method: 'get',
    params: query
  });
}

// 组合报价方案编辑列表
export function getQuotationSchemePage(query) {
  return fetch({
    url: '/api/tran/smcombquotschemenew/getDetailByCombQuotSchemeNewId',
    method: 'get',
    params: query
  });
}

//查询方案列表
export function getMainPage(query) {
  return fetch({
    url: '/api/tran/smtrancomposescheme/getAllHeadList',
    method: 'get',
    params: query
  });
}

//组合报价方案创建批量删除
export function delObj(ids) {
  return fetch({
    url: '/api/tran/smcombquotschemenew/deleteList',
    method: 'get',
    params: ids
  });
}


//组合报价方案创建新增
export function addObj(obj) {
  return fetch({
    url: '/api/tran/smcombquotschemenew/add',
    method: 'post',
    data: obj
  });
}

//编辑保存
export function saveObj(obj) {
  return fetch({
    url: '/api/tran/smcombquotschemenewdetail/save',
    method: 'post',
    data: obj
  });
}

// ------------------------- 工作流相关方法 start-----------------------//

/**
 * 提交流程
 * 参数:combQuotSchemeNewId 主键id-必填
 */
export function submitReview(query) {
  return fetch({
    url: '/api/tran/smcombquotschemenew/submitVerify',
    method: 'get',
    params: query
  });
}

/**
 * 获取代办审核列表
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域
 * 参数:areaCompanyCode 区域公司
 * 参数:tradingCenterCode 交易中心
 * 参数:date 交易日期
 * 参数:schemeName 交易单元
 */
export function getPageCombAudit(query) {
  return fetch({
      url: '/api/tran/smunitschemeAudit/getPageCombAudit',
      method: 'get',
      params: query
  });
}

/**
 * 通过/驳回操作
 * 参数:businessIds 业务数据主键集合-必填
 * 参数:isPass 是否审核通过(true 通过 false 驳回)-必填
 * 参数:approvalComments 审批意见-必填
 */
export function opertion(params) {
  return fetch({
      url: '/api/tran/smunitschemeAudit/opertion',
      method: 'POST',
      data: params
  });
}

/**
 * 审核查询方法
 * 参数:page分页--必填
 * 参数:limit 几页--必填
 * 参数:areaCode 区域
 * 参数:areaCompanyCode 区域公司
 * 参数:tradingCenterCode 交易中心
 * 参数:date 交易日期
 * 参数:schemeName 交易单元
 * 参数:proessState 状态
 */
export function getPageCombSearch(query) {
  return fetch({
      url: '/api/tran/smunitschemeAudit/getPageCombSearch',
      method: 'get',
      params: query
  });
}

// 审批历史
export function getApprovalHis(query) {
  return fetch({
    url: '/api/admin/processApproval/getApprovalHis',
    method: 'get',
    params: query
  })
}

// 流程
export function getActiviImage(query) {
  return fetch({
    url: '/api/admin/processApproval/getActiviImage',
    method: 'get',
    params: query
  })
}

// ------------------------- 工作流相关方法 end-----------------------//