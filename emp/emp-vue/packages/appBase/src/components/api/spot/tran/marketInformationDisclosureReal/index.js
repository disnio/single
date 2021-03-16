
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smMarketTabReal/listTab
// 页签列表
export function listTab(query) {
  return fetch({
    url: '/api/tran/smMarketTabReal/listTab',
    method: 'get',
    params: query
  })
}

//  ==================-设备检修信息 begin ==================-

// /smMarketDeviceMaintenanceReal/import-excel
// 导入  POST

// /smMarketDeviceMaintenanceReal/list
// 查询  GET
export function list(query) {
  return fetch({
    url: '/api/tran/smMarketDeviceMaintenanceReal/list',
    method: 'get',
    params: query
  })
}
// /smMarketDeviceMaintenanceReal/export-template
// 模板下载 GET
export function deviceExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketDeviceMaintenanceReal/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

export function deviceImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketDeviceMaintenanceReal/import-excel-check',
    method: 'get',
    params: query
  });
}
//  ==================-设备检修信息 end ==================-


//  ==================-必开必停机组 begin ==================-

// /smMarketMustOpenOrStopUnitReal/export-template
// 模板下载
export function openStopExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketMustOpenOrStopUnitReal/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// /smMarketMustOpenOrStopUnitReal/import-excel
// 导入

// /smMarketMustOpenOrStopUnitReal/list
// 查询
export function openStoplist(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnitReal/list',
    method: 'get',
    params: query
  })
}

export function beginStopImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnitReal/import-excel-check',
    method: 'get',
    params: query
  });
}

// ==================- 必开必停机组 end ==================-


// ===================机组检修信息 begin ==================-
// /smMarketUnitMaintenanceReal/export-template
// 模板下载
export function unitExportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smMarketUnitMaintenanceReal/export-template/?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// /smMarketUnitMaintenanceReal/import-excel
// 导入

// /smMarketUnitMaintenanceReal/list
// 查询
export function unitlist(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenanceReal/list',
    method: 'get',
    params: query
  })
}

export function unitImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenanceReal/import-excel-check',
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
  let url = "/api/tran/smMarketGridLimitReal/export-template/?token=" + token
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
    url: '/api/tran/smMarketGridLimitReal/list',
    method: 'get',
    params: query
  })
}

export function gridImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketGridLimitReal/import-excel-check',
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
  let url = "/api/tran/smMarketTabReal/export-template/?token=" + token
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
    url: '/api/tran/smMarketTabReal/list',
    method: 'get',
    params: query
  })
}

// /smMarketTabReal/import-excel-check
// 导入-检验是否已存在
export function spareImportExcelCheck(query) {
  return fetch({
    url: '/api/tran/smMarketTabReal/import-excel-check',
    method: 'get',
    params: query
  });
}




// // 具体的错误信息查看  smNodalPriceRealElecgen/cwList
export function sparecwList(query) {
  return fetch({
    url: '/api/tran/smMarketTabReal/cwList',
    method: 'post',
    data: query
  })
}

//20200615 阿彪 #1132 必开必停机组信息（实际） 具体的错误信息查看
export function smMarketMustOpenOrStopUnitReal(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnitReal/cwList',
    method: 'post',
    data: query
  })
}

//20200615 阿彪 #1132 必开必停机组信息（实际） 具体的错误信息导出
export function exportCwListBKBT(data) {
  let token = getToken()
  let url = "/api/tran/smMarketMustOpenOrStopUnitReal/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
export function exportCwList(data) {
  let token = getToken()
  let url = "/api/tran/smMarketTabReal/exportCwList?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
// ==================- 负荷信息、备用信息 end ==================-



// /smMarketMustOpenOrStopUnitReal/insertData
export function insertData(query) {
  return fetch({
    url: '/api/tran/smMarketMustOpenOrStopUnitReal/insertData',
    method: 'post',
    data: query
  })
}

// smMarketUnitMaintenanceReal/insertDataReal
export function insertDataReal(query) {
  return fetch({
    url: '/api/tran/smMarketUnitMaintenanceReal/insertDataReal',
    method: 'post',
    data: query
  })
}


