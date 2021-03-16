/**
 * @说明：日清结果录入（浙江）
 * @作者：Wang Qiang
 * @Date：2019-10-30 16:55
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 优化 20200311 #251
// 查询
export function getAllDataListAll(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/getDetailInfoNew',
    method: 'get',
    params: data
  })
}
// 新增
export function updateAndAddNew(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/updateAndAddNew',
    method: 'post',
    data
  })
}
// 导入前校验
export function checkTheFile(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/checkTheFile',
    method: 'post',
    data
  })
}

// 导出
export function exportData(data) {
  let token = getToken()
  let url = "/api/settl/smsettlelecgenimportzj/exportList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 模板下载
export function downLoadTemplate(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportzj/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 导出错误表格数据/api/settl/smsettlelecgenimportzj/export-zjcw-list
export function exportCwList(data) {
  let token = getToken()
  let url = "/api/settl/smsettlelecgenimportzj/export-zjcw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}


// 新增
export function settlAdd(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/add',
    method: 'post',
    data
  })
}

// 删除
export function settlDelete(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/delete',
    method: 'post',
    data
  })
}

// 多选删除
export function deleteList(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/deleteList',
    method: 'post',
    data
  })
}


// 更新
export function updateAndAdd(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/updateAndAdd',
    method: 'post',
    data
  })
}

// 全部查询
export function getAllDataList(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/getAllDataList',
    method: 'get',
    params: data
  })
}

// 通过id查询
export function getOneById(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/getOneById',
    method: 'get',
    params: data
  })
}

// 分页查询
export function getPage(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/getPage',
    method: 'get',
    params: data
  })
}


// 回显
export function showInfo(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/showInfo',
    method: 'get',
    params: data
  })
}

// 获取科目
export function getBasiceIndexInfo(data) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportzj/getBasiceIndexInfo',
    method: 'get',
    params: data
  })
}
