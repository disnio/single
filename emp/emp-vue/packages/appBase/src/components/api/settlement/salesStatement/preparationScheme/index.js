/*
 * @Author: liz
 * @Date: 2020-12-16 13:34:22
 * @version: 
 * @Descripttion: 结算方案
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * @description:校验期次是否唯一
 * @param {*} query
 * @return {*}
 */
export function checkUniqueness(query) {
  return fetch({
    url: '/api/balance/jsPlanDraftMain/checkUniqueness',
    method: 'get',
    params: query
  });
}


// 提交
export function save(query,id) {
  return fetch({
    url: `/api/balance/jsPlanDraftMain/save`,
    method: 'post',
    data: query
  });
}


// 查询详情
export function getInfo(query) {
  return fetch({
    url: `/api/balance/jsPlanDraftMain/getInfoByPid`,
    method: 'get',
    params: query
  });
}

// 删除
export function deletePower(query) {
  return fetch({
    url: `/api/balance/jsPlanDraftMain/deleteJsPlanDraftMain`,
    method: 'post',
    data:query
  });
}


/**
 * @方法名称: getUnitByOrgCode
 * @功能描述: 机组查询
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月9日12:47:09
 * @最新修改内容: 
 * @LastEditTime: 2020-12-22 15:22:49
 */
export function getUnitByOrgCode(query) {
  return fetch({
    url: `/api/balance/powerGeneration/getUnitInforInfoByOrgCode`,
    method: 'get',
    params: query
  });
}

/**
 * @方法名称: getCutomer
 * @功能描述: 客户查询
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月9日12:47:09
 * @最新修改内容: 
 * @LastEditTime: 2020-12-22 15:21:50
 */
export function getCutomer(query) {
  return fetch({
    url: `/api/balance/jsPlanDraftDetailTemp/getCutomer`,
    method: 'get',
    params: query
  });
}
/**
 * @方法名称: getUnitByOrgCode
 * @功能描述: 导出
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月9日12:47:09
 * @最新修改内容: 
 * @LastEditTime: 2020-12-09 14:46:32
 */
export function exportFile(params){
  let token = getToken()
  let url = "/api/balance/jsPlanDraftMain/exportpowerGenernation?token=" + token
  for(let key in params){
      if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
      }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

/**
 * @description: 导入-- 是否有未导入的数据存在
 * @param {*} query
 * @return {*}
 */
export function isDataExit(query) {
  return fetch({
    url: '/api//balance/jsPlanDraftDetailTemp/isDataExit',
    method: 'get',
    params: query
  })
}


//导出错误数据
export function exportDataErrData(data) {
  let token = getToken();
  let url = '/api/balance/jsPlanDraftDetailTemp/exportErrorData?token=' + token + "&description=" + data.description + "&mainId=" + data.mainId + "&settlementDate=" + data.settlementDate + "&ModelCode="+sessionStorage.getItem("modelCode");
  window.location.href = url + "&ModelCode=" + window.mdcode;
}


export function saveFile(query) {
  return fetch({
    url: '/api/balance/jsPlanDraftDetailTemp/importData',
    method: 'get',
    params: query
  })
}




export function uploadFile(query) {
  return fetch({
      url: '/api/balance/jsPlanDraftDetailTemp/importDetailFile',
      method: 'post',
      data: query
  });
}


//解析查询
export function page(query) {
  return fetch({
      url: '/api/balance/jsPlanDraftDetailTemp/getJsPlanDraftDetailTempByPage',
      method: 'post',
      data: query
  });
}



/**
 * @description: 审核
 * @param {*}
 * @return {*} 
 */
export function approve(query) {
  return fetch({
      url: '/api/balance/jsPlanDraftMain/approve',
      method: 'post',
      params: query
  });
}

/**
 * @description: 驳回
 * @param {*}
 * @return {*} 
 */
export function reject(query) {
  return fetch({
      url: '/api/balance/jsPlanDraftMain/reject',
      method: 'post',
      params: query
  });
}

