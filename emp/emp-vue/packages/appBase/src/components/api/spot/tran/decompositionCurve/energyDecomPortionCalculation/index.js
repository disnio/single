/*
 * @功能描述: 交易管理-中长期分解曲线-中长期合同电量分解比例计算 - 前端开发  #831
 * @作者: wuzhichao
 * @Date: 2020-02-24 14:07:19
 * @最新修改内容:
 * @LastEditTime: 2020-02-26 15:40:53
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smLongTermContractDecomRatioCalc/page
// 分页查询
export function page(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomRatioCalc/page',
    method: 'get',
    params: query
  })
}

// /smLongTermContractDecomRatioCalc/import-excel
// 导入
// /smLongTermContractDecomRatioCalc
// /smLongTermContractDecomRatioCalc/import-excel-check
// 导入-检验是否已存在
export function importExcelCheck(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomRatioCalc/import-excel-check',
    method: 'post',
    data: query
  })
}
// 保存 冯志平
export function save(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomRatioCalc/import-excel',
    method: 'post',
    data: query
  })
}





// /smLongTermContractDecomRatioCalc/export-template
// 模板下载
export function exportTemplate(data) {
  let token = getToken()
  let url = "/api/tran/smLongTermContractDecomRatioCalc/export-template?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smLongTermContractDecomRatioCalcPower/list
// 查询  中长期合同电量查看   calcId
export function midddleLengthList(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomRatioCalcPower/list',
    method: 'get',
    params: query
  })
}


// /smLongTermContractDecomMonthRatio/list
// 查询 年分月
export function yearMonthList(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomMonthRatio/list',
    method: 'get',
    params: query
  })
}


// /smLongTermContractDecomDayRatio/list
// 查询 月分日
export function monthDayList(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomDayRatio/list',
    method: 'get',
    params: query
  })
}

// /smLongTermContractDecomHourRatio/list
// 查询
export function dayTimeList(query) {
  return fetch({
    url: '/api/tran/smLongTermContractDecomHourRatio/list',
    method: 'get',
    params: query
  })
}
