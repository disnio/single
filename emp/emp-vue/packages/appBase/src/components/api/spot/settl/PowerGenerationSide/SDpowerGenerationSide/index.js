/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:09:49
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smsettlelecgenimportsd/getElecgenMonthData
// 获取发电侧月清汇总数据
export function getElecgenMonthData(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportsd/getElecgenMonthData',
    method: 'get',
    params: query
  })
}

// /smsettlelecgenimportsd/export-cw-list
// 导出日清列表错误信息
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportsd/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smsettlelecgenimportsd/export-sd-list
// 导出山东数据
export function exportSdList(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportsd/export-sd-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smsettlelecgenimportsd/downloadContractTemplate
// 模板下载
export function downloadContractTemplate() {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportsd/downloadContractTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smsettlelecgenimportsd/import-file
// 上传文件
export function importFile(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportsd/import-file',
    method: 'post',
    data: query
  })
}

// /smsettlelecgenimportsd/import-jy
// 上传校验
export function importJy(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportsd/import-jy',
    method: 'post',
    data: query
  })
}
