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
export function add(query) {
  return fetch({
    url: '/api/balance/jsAncillaryStatementMd/add',
    method: 'post',
    data: query
  });
}

//查询页面
export function getPage(query) {
  return fetch({
    url: '/api/balance/jsAncillaryStatementMd/list',
    method: 'get',
    params: query
  });
}

//四级组织
export function getOrgId(query) {
  return fetch({
    url: '/api/balance/jsAncillaryStatementMdDetail/getOrgId',
    method: 'get',
    params: query
  });
}


// 更新
export function commitData(query) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementMdDetail/commit`,
    method: 'post',
    data: query
  });
}


// 查询详情
export function getInfo(id) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementMd/selById/${id}`,
    method: 'get',
  });
}

/**
 * @方法名称: deleteMd
 * @功能描述: 删除
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月11日00:59:02
 * @最新修改内容: 
 * @LastEditTime: 2020-12-15 17:20:58
 */
export function deleteMd(id) {
  return fetch({
    url: `/api/balance/jsAncillaryStatementMd/${id}`,
    method: 'delete',
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
  let url = "/api/balance/jsAncillaryStatementMdDetail/export?token=" + token
  for(let key in params){
      if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
      }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

