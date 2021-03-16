/*
 * @功能描述: #479 交易管理-售电侧申报管理-前端开发
 * @detail: 交易管理-售电侧申报管理 相关接口 api
 * @作者: chenf
 * @Date: 2019-11-11 14:44:25
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:10:49
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 售电侧申报管理创建页   -   start  -----------------*/

// 申报方案创建  新增
export function getaddDeclarePlan(obj) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/add',
    method: 'post',
    data: obj
  });
}

// 申报方案 查询
export function getSellDeclaCreatPage(query) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/getSellDeclaCreatPage',
    method: 'get',
    params: query
  });
}

// 申报方案 删除单个
export function deleteONE(obj) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/delete',
    method: 'post',
    data: obj
  });
}

// 申报方案 删除多个
export function deleteMuch(obj) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/deleteList',
    method: 'post',
    data: obj
  });
}

// 申报按钮
export function updateParam(obj) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/updateByParam',
    method: 'post',
    data: obj
  });
}


//历史申报 动态表头 动态数据
export function getHistoryTabletitle(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getHistoryParamMap',
    method: 'get',
    params: query
  });
}
// 20200608 阿彪 #1084 历史申报优化 表格内数据获取
export function getHistoryDeclaCreat(query) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/getHistoryDeclaCreat',
    method: 'get',
    params: query
  });
}

//历史申报 表格内数据获取
export function getHistoryDataList(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getHistoryDataList',
    method: 'get',
    params: query
  });
}




// 批量调整弹窗
export function getParamArea(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getParamByArea',
    method: 'get',
    params: query
  });
}

// 批量调整保存
export function updateDataByValue(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/updateDataByValue',
    method: 'post',
    data: query
  })
}


// 根据区域公司获取 动态表头 动态数据
export function getTableList(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getListByCreatId',
    method: 'get',
    params: query
  });
}


//模板下载 根据区域公司动态生成  smTradeSellDeclaCreatId
export function downloadTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smTradeSellDeclaData/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}


//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/checkTheFile',
    method: 'get',
    params: query
  })
}


// 导入
export function importFile(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/importTheFile',
    method: 'post',
    data: query
  })
}

// 具体的错误信息查看
export function getDetailCwlist(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/cwList',
    method: 'post',
    data: query
  })
}


//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smTradeSellDeclaData/exportCwList?token=" + token + "&fileId=" + data.fileId + "&areaCompanyCode=" + data.areaCompanyCode
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/tran/smTradeSellDeclaData/exportExcel?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}


//////////////////////////// 二次开发接口 //////////////////////////////////
// Tab参数传递
export function getTabList(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getTabList',
    method: 'get',
    params: query
  })
}
// 获取指标
export function getParamList(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getParamList',
    method: 'get',
    params: query
  })
}
// 查询
export function getDataByParam(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/getDataByParam',
    method: 'get',
    params: query
  })
}
// 导出
export function exportElectricity(data) {
  let token = getToken()
  let url = "@common/api/tran/smTradeSellDeclaData/exportElectricity?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

//真* 异常Excel 导出
export function exportCwList2(data) {
  let token = getToken()
  let url = "@common/api/tran/smTradeSellDeclaData/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

export function startProcess(query) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/startProcess',
    method: 'post',
    data: query
  })
}


export function updateDataByParam(query) {
  return fetch({
    url: '/api/tran/smTradeSellDeclaData/updateDataByParam',
    method: 'post',
    data: query
  })
}

export function changeOperate(query) {
  return fetch({
    url: '/api/tran/smtradeselldeclacreat/changeOperate',
    method: 'post',
    data: query
  })
}
