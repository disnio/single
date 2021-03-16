import fetch from '@common/utils/fetch';


//审核方案列表
export function getMainPage(query) {
  return fetch({
    url: '/api/tran/typquotschemeAudit/getMainPage',
    method: 'get',
    params: query
  });
}

//方案列表明细量价   /typcombquotscheme/getDetailPage
export function getDetailPage(query) {
  return fetch({
    url: '/api/tran/typcombquotscheme/getDetailPage',
    method: 'get',
    params: query
  });
}

//方案列表明细    /typcombquotscheme/getDetPage
export function getDetPage(query) {
  return fetch({
    url: '/api/tran/typcombquotscheme/getDetPage',
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

//通过驳回

export function opertion(query) {
  return fetch({
    url: '/api/tran/typquotschemeAudit/opertion',
    method: 'get',
    params: query
  })
}

//典型报价方案-查询所有审批记录
export function getAllPageList(query) {
  return fetch({
    url: '/api/tran/typquotschemeAudit/getAllPageList',
    method: 'get',
    params: query
  })
}

//测试审批流

export function completeTask(query) {
  return fetch({
    url: '/api/admin/typquotschemeAuditActiviti/completeTask',
    method: 'post',
    params: query
  })
}

// 区域公司审核列表 -- 20191025 add lifei[跨级审核接口]
export function getMainPageQY(query) {
  return fetch({
    url: '/api/tran/typquotschemeAudit/getMainPageList',
    method: 'get',
    params: query
  });
}