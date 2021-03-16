/*
 * @功能描述: 分厂统计详情接口
 * @版本:
 * @作者: wangqiang
 * @Date:
 * @最新修改内容:
 * @LastEditTime: 2020-05-26 18:25:07
 */
import fetch from '@common/utils/fetchUnits';
import { getToken } from "@common/utils/auth";

// 查询
export function byFactory(params) {
  return fetch({
      url: '/api/business/jiangsu-report/byFactory',
      method: 'get',
      params: params
  });
}

// 导出
export function exportByFactory(data) {
  let token = getToken()
  let url = "@common/api/business/jiangsu-report/exportByFactory?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}



