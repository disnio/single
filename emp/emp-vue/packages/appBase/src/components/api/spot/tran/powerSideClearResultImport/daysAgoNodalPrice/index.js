/*
 * @功能描述: #717 现货竞报价系统-交易管理-发电侧-日前出清结果导入
 * @detail: 交易管理-实时出清结果导入 相关接口 api
 * @作者: chenf
 * @Date: 2020-1-9 14:44:25
 * @最新修改内容:
 * @LastEditTime: 2020-1-9 14:44:25
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 实时出清结果导入   -   start  -----------------*/

//模板下载 动态生成
export function downloadTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smnodalpricedaysagoelecgen/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}


//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smnodalpricedaysagoelecgen/checkTheFile',
    method: 'get',
    params: query
  })
}


// 具体的错误信息查看
export function getDetailCwlist(query) {
  return fetch({
    url: '/api/tran/smnodalpricedaysagoelecgen/cwList',
    method: 'post',
    data: query
  })
}


//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smnodalpricedaysagoelecgen/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/tran/smnodalpricedaysagoelecgen/exportFile?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 查 询
export function getSearchData(query) {
  return fetch({
    url: '/api/tran/smnodalpricedaysagoelecgen/getDataList',
    method: 'get',
    params: query
  });
}
