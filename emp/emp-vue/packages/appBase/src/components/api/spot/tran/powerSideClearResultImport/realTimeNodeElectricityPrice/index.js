import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smNodalPriceRealElecgen/list
// 查询
export function list(query) {
  return fetch({
    url: '/api/tran/smNodalPriceRealElecgen/list',
    method: 'get',
    params: query
  });
}

// /smNodalPriceRealElecgen/export-template
// 模板下载
export function exportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smNodalPriceRealElecgen/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smNodalPriceRealElecgen/import-excel
// 导入

// /smNodalPriceRealElecgen/export-data
// 导出
export function exportData(data) {
  let token = getToken()
  let url = "/api/tran/smNodalPriceRealElecgen/export-data/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smNodalPriceRealElecgen/import-excel-check
// 导入-检验是否已存在
export function importExcelCheck(query) {
  return fetch({
    url: '/api/tran/smNodalPriceRealElecgen/import-excel-check',
    method: 'get',
    params: query
  });
}

// // 获取 动态 table 表头
// export function getTableHeader(query) {
//   return fetch({
//     url: '/api/tran/smclearingresultimportreal/getParamList',
//     method: 'get',
//     params: query
//   });
// }

// // 具体的错误信息查看  smNodalPriceRealElecgen/cwList
export function cwList(query) {
  return fetch({
    url: '/api/tran/smNodalPriceRealElecgen/cwList',
    method: 'post',
    data: query
  })
}

// //真* 异常Excel 导出   smNodalPriceRealElecgen/exportCwList
export function exportCwList(data) {
  let token = getToken()
  let url = "/api/tran/smNodalPriceRealElecgen/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
