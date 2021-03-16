import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 主页 Tabs 获取参数 动态显示
export function getTabs(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/getTabList',
    method: 'get',
    params: query
  });
}

// 获取 动态 table 表头
export function getTableHeader(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/getParamList',
    method: 'get',
    params: query
  });
}

//模板下载 动态生成
export function downloadTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smmarketfunctiondaysagoelecgen/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

//导入之前，校验历史数据之前，先查询smid
export function selectExportParam(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/selectExportParam',
    method: 'get',
    params: query
  })
}

//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/checkTheFile',
    method: 'get',
    params: query
  })
}


// 具体的错误信息查看
export function getDetailCwlist(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/cwList',
    method: 'post',
    data: query
  })
}


//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smmarketfunctiondaysagoelecgen/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/tran/smmarketfunctiondaysagoelecgen/exportElectricity?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 查 询
export function getSearchData(query) {
  return fetch({
    url: '/api/tran/smmarketfunctiondaysagoelecgen/getDataByParam',
    method: 'get',
    params: query
  });
}
