import fetch from '@common/utils/fetch';
 /* 交易管理--报价方案管理 */

 // 报价方案创建列表
 export function getAllSchemePage(query) {
    return fetch({
      url: '/api/tran/smtranschemeAudit/getAllSchemePage',
      method:'get',
      params: query
    });
  }

   //组合报价方案列表
 export function getAllSchemeList(query) {
  return fetch({
    url: '/api/tran/smtranschemeAudit/getAllSchemeList',
    method:'get',
    params: query
  });
}
  