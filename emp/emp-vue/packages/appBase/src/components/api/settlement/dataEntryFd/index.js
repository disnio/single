/*
 * @Author: liz
 * @Date: 2020-12-09 10:00:13
 * @version: 1.0
 * @Descripttion: DLYX-707 结算管理-数据录入-发电量
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//查询页面
export function getPage(query) {
  return fetch({
    url: '/api/balance/powerGeneration/getPowerGenerationByPage',
    method: 'post',
    data: query
  });
}
//校验期次是否唯一
export function checkUniqueness(query) {
  return fetch({
    url: '/api/balance/powerGeneration/checkUniqueness',
    method: 'get',
    params: query
  });
}

// 新增
export function addDetail(query) {
  return fetch({
    url: `/api/balance/powerGenerationDetail/addPowerGenerationDetail`,
    method: 'post',
    data: query
  });
}

// 更新
export function updateDetail(query,id) {
  return fetch({
    url: `/api/balance/powerGenerationDetail/updatePowerGenerationDetail`,
    method: 'post',
    data: query
  });
}


// 查询详情
export function getInfo(query) {
  return fetch({
    url: `/api/balance/powerGeneration/getInfoByPid`,
    method: 'get',
    params: query
  });
}

// 删除
export function deletePower(query) {
  return fetch({
    url: `/api/balance/powerGeneration/deletePowerGeneration`,
    method: 'get',
    params: query
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
 * @LastEditTime: 2020-12-09 14:46:32
 */
export function getUnitByOrgCode(query) {
  return fetch({
    url: `/api/balance/powerGeneration/getUnitInforInfoByOrgCode`,
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
  let url = "/api/balance/powerGeneration/exportpowerGenernation?token=" + token
  for(let key in params){
      if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
      }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

