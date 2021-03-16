/*
 * @功能描述: 算管理--售电公司结算单（东北辽宁） #2867 工单没有原型 都是截图
 * @版本: 
 * @作者: wuzhicaho
 * @Date: 2019-12-05 13:07:50
 * @最新修改内容: 
 * @LastEditTime: 2019-12-05 13:32:31
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /hbPreSettlement/page
// 主表 分页查询
export function mainPage(query) {
  return fetch({
    url: '/api/balance/hbPreSettlement/page',
    method: 'get',
    params: query
  });
}

