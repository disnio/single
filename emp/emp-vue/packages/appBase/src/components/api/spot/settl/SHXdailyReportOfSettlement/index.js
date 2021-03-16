/*
 * @文件用途说明: 发电侧-山西结算日报
 * @作者姓名: 阿彪
 * @Date: 2020-06-09 09:23:42
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 获取表格数据
export function smsettlreportbydaycontroller(query) {
  return fetch({
    url: '/api/settl/smsettlreportbydaycontroller/selectReportDayListByQuery',
    method: 'get',
    params: query
  });
}
// 20200616 阿彪 #304 添加导出按钮
export function exportMainObj(data) {
  let token = getToken()
  let url = "/api/settl/smsettlreportbydaycontroller/exportReportDayListByQuery?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
