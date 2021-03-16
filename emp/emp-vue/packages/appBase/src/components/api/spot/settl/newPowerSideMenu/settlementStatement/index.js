/*
 * @功能描述: #248 结算管理-发电侧-结算对账单
 * @detail: 结算管理-发电侧-结算对账单 相关接口 api
 * @作者: chenf
 * @Date: 2020-2-12
 * @最新修改内容:
 * @LastEditTime: 2020-2-12
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 实时出清结果导入   -   start  -----------------*/

// 主页 Table 获取数据
export function getInfoByHalfOfHour(query) {
  return fetch({
    url: '/api/settl/smSettlByHalfOfHourController/getInfoByHalfOfHour',
    method: 'get',
    params: query
  });
}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/settl/smSettlByHalfOfHourController/exportFileByHalfOfHour?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
