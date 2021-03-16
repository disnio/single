import fetch from '@common/utils/fetch';
//import { getToken } from "@common/utils/auth";

//列表接口
export function page(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/Page',
    method: 'get',
    params: query
  });
}
//报价方案列表分页查询
export function getPageList(query) {
  return fetch({
    url: '/api/balance/jsFinanceBillAudit/getPageList',
    method: 'get',
    params: query
  });
}
//根据id查看信息
export function getInfo(id) {
  return fetch({
    url: '/api/balance/jsFinanceBill/'+id,
    method: 'get'
 
  });
}
//审批操作
export function getauditOpertion(query) {
  return fetch({
    url: '/api/balance/jsFinanceBillAudit/auditOpertion',
    method: 'get',
    params: query 
  });
}
//对账单审核查询列表
export function getAuditPageList(query) {
  return fetch({
  url: '/api/balance/jsFinanceBillAudit/getAuditPageList',
  //url: '/api/balance/jsFinanceBillAudit/getPageList',
    method: 'get',
    params: query
  });
}