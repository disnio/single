
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smMarketTab/listTab
// 页签列表
export function listTab(query) {
  return fetch({
    url: '/api/tran/smMarketTab/listTab',
    method: 'get',
    params: query
  })
}

//  ==================-设备检修信息 begin ==================-

// /smMarketDeviceMaintenance/import-excel
// 导入  POST

// /smMarketDeviceMaintenance/list
// 查询  GET
export function list(query) {
  return fetch({
    url: '/api/tran/smMarketDeviceMaintenance/list',
    method: 'get',
    params: query
  })
}
// /smMarketDeviceMaintenance/export-template
// 模板下载 GET
export function deviceExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketDeviceMaintenance/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

export function deviceImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketDeviceMaintenance/import-excel-check',
    method: 'get',
    params: query
  });
}
//  ==================-设备检修信息 end ==================-


//  ==================-必开必停机组 begin ==================-

// /smMarketMustOpenOrStopUnit/export-template
// 模板下载
export function openStopExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketMustOpenOrStopUnit/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// /smMarketMustOpenOrStopUnit/import-excel
// 导入

// /smMarketMustOpenOrStopUnit/list
// 查询
export function openStoplist(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnit/list',
    method: 'get',
    params: query
  })
}

export function beginStopImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnit/import-excel-check',
    method: 'get',
    params: query
  });
}

// ==================- 必开必停机组 end ==================-


// ===================机组检修信息 begin ==================-
// /smMarketUnitMaintenance/export-template
// 模板下载
export function unitExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketUnitMaintenance/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// /smMarketUnitMaintenance/import-excel
// 导入

// /smMarketUnitMaintenance/list
// 查询
export function unitlist(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenance/list',
    method: 'get',
    params: query
  })
}

export function unitImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenance/import-excel-check',
    method: 'get',
    params: query
  });
}

//  ==================-机组检修信息 end ==================-


//  ==================- 电网约束信息 begin ==================-
// /smMarketGridLimit/export-template
// 模板下载
export function gridExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketGridLimit/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// /smMarketGridLimit/import-excel
// 导入

// /smMarketGridLimit/list
// 查询
export function gridlist(query) {
  return fetch({
    url: '/api/tran/smMarketGridLimit/list',
    method: 'get',
    params: query
  })
}

export function gridImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketGridLimit/import-excel-check',
    method: 'get',
    params: query
  });
}


//  ==================- 电网约束信息end ==================-


// ==================- 负荷信息、备用信息 begin ==================-
// /smMarketTab/export-template
// 模板下载
export function exportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketTab/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smMarketTab/list
// 查询
export function smMarketTablist(query) {
  return fetch({
    url: '/api/tran/smMarketTab/list',
    method: 'get',
    params: query
  })
}

// /smMarketTab/import-excel-check
// 导入-检验是否已存在
export function spareImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketTab/import-excel-check',
    method: 'get',
    params: query
  });
}


// // 具体的错误信息查看  smNodalPriceRealElecgen/cwList
export function sparecwList(query) {
  return fetch({
    url: '/api/tran/smMarketTab/cwList',
    method: 'post',
    data: query
  })
}


//20200615 阿彪 #1132 必开必停机组信息（预测） 具体的错误信息查看
export function smMarketMustOpenOrStopUnit(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnit/cwList',
    method: 'post',
    data: query
  })
}

//20200615 阿彪 #1132 必开必停机组信息（预测） 具体的错误信息导出
export function exportCwListBKBT(data) {
  let token = getToken()
  let url = "/api/tran/smMarketMustOpenOrStopUnit/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

export function exportCwList(data) {
  let token = getToken()
  let url = "/api/tran/smMarketTab/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// ==================- 负荷信息、备用信息 end ==================-

// /smMarketTab/paramList
// 查询参数（不带时点，只用于查询导入页面的参数）
export function paramList(query) {
  return fetch({
    url: '/api/tran/smMarketTab/paramList',
    method: 'get',
    params: query
  });
}

// /api/tran/smMarketMustOpenOrStopUnit/import-excel
export function insertData(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnit/insertData',
    method: 'post',
    data: query
  })
}

// smMarketUnitMaintenance/insertData

export function jzjxinsertData(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenance/insertData',
    method: 'post',
    data: query
  })
}
