/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:08:54
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 结算-发电测结算-日清算

// 导入解析查询
export function getImportInfo(query) {
  return fetch({
    url: '/api/settl/elecgen/import-info',
    method: 'get',
    params: query
  })
}

// 初始化查询列表
export function getDayClearList(query) {
  return fetch({
    url: '/api/settl/elecgen/day-clear-list',
    method: 'get',
    params: query
  })
}

// 模板下载
export function downloadContractTemplate() {
  let token = getToken()
  let url = "@common/api/settl/elecgen/downloadContractTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// 异常数据导出
export function exportErrObj(query) {
  let token = getToken()
  let url = "@common/api/settl/elecgen/export-error?token=" + token + "&description=" + query
  window.location.href = url + "&ModelCode=" + window.mdcode;}

//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/elecgen/export-cw-list?token=" + token + "&fileId=" + data.fileId
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/settl/elecgen/export-day-clear-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 确认入库
export function enterHouse(query) {
  return fetch({
    url: '/api/settl/elecgen/enter-house',
    method: 'get',
    params: query
  })
}

// 上传校验
export function importJy(query) {
  return fetch({
    url: '/api/settl/elecgen/import-jy',
    method: 'post',
    data: query
  })
}

