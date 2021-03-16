/*
 * @功能描述: #717 现货竞报价系统-交易管理-发电侧-日前出清结果导入
 * @detail: 交易管理-实时出清结果导入 相关接口 api
 * @作者: chenf
 * @Date: 2020-1-9 14:44:25
 * @最新修改内容:
 * @LastEditTime: 2020-06-02 20:12:17
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/*------------ 实时出清结果导入   -   start  -----------------*/

// 主页 Tabs 获取参数 动态显示
export function getTabs(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/getTabList',
    method: 'get',
    params: query
  });
}
//2020521 阿彪 #1045 获取 动态导入错误的table 表头
export function getParamListForError(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/getParamListForError',
    method: 'post',
    data: query
  });
}

// 获取 动态 table 表头
export function getTableHeader(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/getParamList',
    method: 'get',
    params: query
  });
}

//模板下载 动态生成
export function downloadTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportdemo/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

//导入之前，校验历史数据之前，先查询smid
export function selectExportParam(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/selectExportParam',
    method: 'get',
    params: query
  })
}

//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/checkTheFile',
    method: 'post',
    data: query
  })
}


// 具体的错误信息查看
export function getDetailCwlist(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/cwList',
    method: 'post',
    data: query
  })
}


//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportdemo/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 主页面导出
export function exportMainObj(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportdemo/exportElectricity?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 查 询
export function getSearchData(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/getDataByParam',
    method: 'get',
    params: query
  });
}


// /api/tran/smclearingresultimportdemo/getNum
export function getNum(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportdemo/getNum',
    method: 'get',
    params: query
  });
}



// /api/org/getOrgById
export function getOrgById(id) {
  return fetch({
    url: '/api/admin/api/org/getOrgById',
    method: 'get',
    params: id
  });
}
