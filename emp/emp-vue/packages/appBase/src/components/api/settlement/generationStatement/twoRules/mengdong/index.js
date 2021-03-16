/*
 * @Author: liz
 * @Date: 2020年12月10日15:47:18
 * @version: 1.0
 * @Descripttion: DLYX-558 结算管理-发电侧-两个细则-两个细则（蒙东）
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
    url: '/api/balance/jsTwoRulesMdMain/checkUniqueness',
    method: 'get',
    params: query
  });
}

/**
 * @description: 新增
 * @param {*} query
 * @return {*}
 */
export function add(query) {
  return fetch({
    url: `/api/balance/jsTwoRulesMdMain/addJsTwoRulesMdMain`,
    method: 'post',
    data: query
  });
}

/**
 * @description: 更新
 * @param {*} query
 * @return {*}
 */
export function commitData(query) {
  return fetch({
    url: `/api/balance/jsTwoRulesMdMain/updateJsTwoRulesMdMain`,
    method: 'post',
    data: query
  });
}


// 查询详情
export function getInfo(id) {
  return fetch({
    url: `/api/balance/jsTwoRulesMdMain/getOneById`,
    method: 'get',
    params: id
  });
}

/**
 * @方法名称: deleteJsTwo
 * @功能描述: 删除两个细则方法
 * @参数: 
 * @返回值: 
 * @作者: 李志佳
 * @Date: 2020年12月14日11:13:08
 * @最新修改内容: 
 * @LastEditTime: 2020-12-14 14:39:41
 */
export function deleteJsTwo(id) {
  return fetch({
    url: `/api/balance/jsTwoRulesMdMain/deleteJsTwoRulesMdMain`,
    method: 'post',
    data: id
  });
}

/**
 * @方法名称: exportFile
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
  let url = "/api/balance/jsTwoRulesMdMain/exportExcel?token=" + token
  for(let key in params){
      if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
      }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}