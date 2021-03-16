/*
 * @Author: Wang Qiang
 * @Date: 2019-11-07 12:58:38
 * @LastEditTime: 2019-11-07 15:04:17
 * @LastEditors: Please set LastEditors
 * @Description: 交易公告-负荷数据导入
 * @FilePath: \front-ui\src\api\spot\tran\notice\loadImport\index.js
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 查询
export function getAllDataList(data) {
  return fetch({
      url: '/api/tran/smloadfore/getAllDataList',
      method: 'get',
      params: data
  });
}

// 查询 死表头
export function getItemArrByTradCenterCode(data) {
  return fetch({
      url: '/api/tran/smloadfore/getItemArrByTradCenterCode',
      method: 'get',
      params: data
  });
}

// 获取 table title
export function getItemTitle(data) {
  return fetch({
      url: '/api/tran/smloadfore/getItemTitle',
      method: 'get',
      params: data
  });
}

// 验证是否已导入
export function checkAlreadyExists(data) {
  return fetch({
      url: '/api/tran/smloadfore/checkAlreadyExists',
      method: 'get',
      params: data
  });
}

// 下载模板
export function downloadContractTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smloadfore/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 导出错误数据
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smloadfore/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 新增
export function addData(data) {
  return fetch({
      url: '/api/tran/smloadfore/addData',
      method: 'post',
      data: data
  });
}
