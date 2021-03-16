import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 全部查询
//smmarketinforeal/getAllDataList
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smmarketinforeal/getAllDataList',
    method: 'get',
    params: query
  })
}
// 导出
//smmarketinforeal/export-data
export function exportData(data) {
  let token = getToken()
  let url = "@common/api/tran/smmarketinforeal/export-data?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
//导出日清列表错误信息
//smmarketinforeal/export-cw-list
export function exportCwList(data) {
  let token = getToken()
  let url = "/api/tran/smmarketinforeal/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
//校验导入是否存在数据
//smmarketinforeal/checkData
export function checkData(query) {
  return fetch({
    url: '/api/tran/smmarketinforeal/checkData',
    method: 'get',
    params: query
  })
}
//模板下载
//smmarketinforeal/export-template
export function exportTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smmarketinforeal/export-template?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

