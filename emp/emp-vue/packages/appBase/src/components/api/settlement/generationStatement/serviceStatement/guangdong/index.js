/*
 * @Author: liz
 * @Date: 2020-12-11 20:02:04
 * @version: 
 * @Descripttion: 
 */
/*
 * @Author: liz
 * @Date: 2020年12月10日15:47:18
 * @version: 1.0
 * @Descripttion: DLYX-557 辅助服务结算单（蒙东）
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * @description: 新增
 * @param {*} query
 * @return {*}
 */
export function checkUniqueness(query) {
  return fetch({
    url: '/api/balance/jsAncillaryStatementGdMain/checkUniqueness',
    method: 'get',
    params: query
  });
}

//查询页面
export function getPage(query) {
  return fetch({
    url: '/api/balance/jsAncillaryStatementGdMain/getInfoByPid',
    method: 'get',
    params: query
  });
}

// 更新
export function commitData(query) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementGdDetail/commit`,
    method: 'post',
    data: query
  });
}


// 查询详情
export function getInfo(query) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementGdMain/getInfoByPid`,
    method: 'get',
    params:query
  });
}

/**
 * @方法名称: deleteAh
 * @功能描述: 删除
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月11日00:59:02
 * @最新修改内容: 
 * @LastEditTime: 2020-12-18 15:07:19
 */
export function deleteAh(data) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementGdMain/deleteJsAncillaryStatementGdMain`,
    method: 'post',
    data:data
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
  let url = "/api/balance/jsAncillaryStatementGdMain/exportpowerGenernation?token=" + token
  for(let key in params){
      if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
      }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}