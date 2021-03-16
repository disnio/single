/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:06:12
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /jssdgsdfjshb/checkPeriod
// 检查当前用户所属组织，结算日期唯一性
export function checkPeriod(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshb/checkPeriod',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshb/getDfjsData
// 抽取数据
export function getDfjsData(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshb/getDfjsData',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshb/getMainPage
// 售电公司电费结算主表_河北 - 分页查询
export function getMainPage(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshb/getMainPage',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshb/deleteList
// 售电公司电费结算主表_河北 - 多选删除
export function deleteList(obj) {
  return fetch({
    url: '/api/balance/jssdgsdfjshb/deleteList',
    method: 'post',
    data: obj
  });
}

// /jssdgsdfjshbdetail/getAllDataList
// 售电公司电费结算详情_河北 - 全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshbdetail/getAllDataList',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshbdetail/dataJs
// 售电公司电费结算详情_河北 - 计算
// mainId
// jsDate 
// zjjyGwdlDf
// zjjySyzpcDl
// zjjySyzpcDf
// zjjySyfpcDl
// zjjySyfpcDf
// tbdf
export function dataJs(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshbdetail/dataJs',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshbdetail/updateSatus
// 更新状态 / 提交 / 取消提交
// jsId  dfjsId 广东售电公司电费结算id  status 状态
export function updateSatus(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjshbdetail/updateSatus',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjshbdetail/exportDetailList
// 导出详情页
// mainId  preSettlementId
export function exportDetailList(parm) {
  let token = getToken()
  let url = "/api/balance/jssdgsdfjshbdetail/exportDetailList?token=" + token
  let mainId = parm.mainId
  // let preSettlementId = parm.preSettlementId
  if (mainId !== undefined && mainId !== "" && mainId !== null) {
    url += "&mainId=" + mainId
  }
  // if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
  //   url += "&preSettlementId=" + preSettlementId
  // }
  window.location.href = url + "&ModelCode=" + window.mdcode;

}