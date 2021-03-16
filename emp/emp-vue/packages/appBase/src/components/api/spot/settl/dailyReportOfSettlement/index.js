/*
 * @功能描述: #234 结算管理-售电侧-日清结果导入
 * @detail: 结算管理-售电侧-日清结果导入 相关接口 api
 * @作者: chenf
 * @Date: 2020-2-12
 * @最新修改内容:
 * @LastEditTime: 2020-2-12
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 实时出清结果导入   -   start  -----------------*/

// 获取 动态 table 表头
export function getTableHeader(query) {
  return fetch({
    url: '/api/settl/smSettlementTrialDaily/getHeader',
    method: 'get',
    params: query
  });
}


// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "/api/settl/smSettlementTrialDaily/exportData?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 查 询
export function getSearchData(query) {
  return fetch({
    url: '/api/settl/smSettlementTrialDaily/getSettlementDetailByDay',
    method: 'get',
    params: query
  });
}
