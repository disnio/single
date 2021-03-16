import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smclearingresultimport/getAllDataList
// 出清结果数据导入表-全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smclearingresultimport/getAllDataList',
    method: 'get',
    params: query
  })
}

// /smclearingresultimport/getItems
// 动态获取指标
export function getItems(query) {
  return fetch({
    url: '/api/tran/smclearingresultimport/getItems',
    method: 'get',
    params: query
  })
}

// /smclearingresultimport/addData
// 新增
export function addData(query) {
  return fetch({
    url: '/api/tran/smclearingresultimport/addData',
    method: 'post',
    data: query
  })
}

// /smclearingresultimport/export
// 出清结果数据导出
export function exportTab(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimport/export?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smclearingresultimport/checkAlreadyExists
// 校验数据是否已存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smclearingresultimport/checkAlreadyExists',
    method: 'get',
    params: query
  })
}

// /smclearingresultimport/export-cw-list
// 导出错误信息
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimport/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smclearingresultimport/getItemTab
// 动态获取页签个数、名称
export function getItemTab(query) {
  return fetch({
    url: '/api/tran/smclearingresultimport/getItemTab',
    method: 'get',
    params: query
  })
}

// /smclearingresultimport/downloadTemplate
// 模板下载
export function downloadTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimport/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
