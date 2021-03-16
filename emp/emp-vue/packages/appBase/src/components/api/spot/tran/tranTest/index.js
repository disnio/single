import fetch from '@common/utils/fetch';

 /* 交易管理--典型报价方案管理--方案审核 */

 // 审核方案列表
 export function getPageList(query) {
    return fetch({
      url: '/api/settl/electmltdate/getDate',
      method:'get',
      params: query
    }); 
  } 