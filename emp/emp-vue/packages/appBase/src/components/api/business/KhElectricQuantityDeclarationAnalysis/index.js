import fetch from '@common/utils/fetch';

// 主表列表显示
export function analysis(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationDetail/analysis',
    method: 'get',
    params: query
  });
}
// 根据orgid查找客户
export function getCustomersByOrgId(query) {
  return fetch({
    url: '/api/customer/khCustomerRelation/page/getAlreadyPage',
    method: 'get',
    params: query
  });
}
// 根据orgid查找客户
export function getChart(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationDetail/chart',
    method: 'get',
    params: query
  });
}