/*
 * @功能描述: #124 结算管理-日清结果数据导入（福建）
 * @detail: 日清结果数据导入 接口api
 * @作者: chenf
 * @Date: 2019-11-09 11:14:17
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:09:20
 */
import fetch from '@common/utils/fetch';
import {
  getToken
} from "@common/utils/auth";

// -------- 福建日清 导入相关  start-------

//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportfj/valInfo',
    method: 'get',
    params: query
  })
}

// 福建日清数据查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportfj/getAllDataList',
    method: 'get',
    params: query
  })
}

// 导入
export function importFile(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportfj/import-file',
    method: 'post',
    data: query
  })
}


//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportfj/export-fjcw-list?token=" + token + "&fileId=" + data.fileId
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportfj/exportList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

//模板下载
export function downloadContractTemplate(data) {
  let token = getToken()
  let url = "/api/settl/smsettlelecgenimportfj/downloadContractTemplateFJ?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// -------- 福建日清 导入相关  end-------
