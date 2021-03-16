import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/contract/htTemplateApproval/approvalQuery',
    method: 'get',
    params: query
  });
}

// 合同类型 下拉数据
export function htlx_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=contract_type',
    method: 'get'
  })
}

// 审批状态 
export function spzt_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get'
  })
}

// 审批历史
export function approvalHistoryObj(query) {
  return fetch({
    url: '/api/admin/processApproval/getApprovalHis',
    method: 'get',
    params: query
  })
}

// 所属交易中心 下拉数据
export function jyorgId_select_Obj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=trading_center',
    method: 'get'
  })
}
