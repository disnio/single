/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2020-03-18 11:01:40
 * @最新修改内容: 
 * @LastEditTime: 2020-03-18 11:02:55
 */

import fetch from '@common/utils/fetch';

// /smsettlinvpaydaygather/selectDayGatherListByQuery 日结算汇总表-查询

export function selectDayGatherListByQuery(query) {
  return fetch({
    url: '/api/settl/smsettlinvpaydaygather/selectDayGatherListByQuery',
    method: 'get',
    params: query

  })
};
