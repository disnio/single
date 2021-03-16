/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-11-22 10:36:00
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:03:45
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
export function crewStartToStopChart(query) {
  return fetch({
    url: '/api/home/unitOnOffAnalysis/getUnitListInfo',
    method: 'get',
    params: query
  });
}

export function crewNumberChartList(query) {
  return fetch({
    url: '/api/home/tPowerUnit/getUnitListRunningInfo',
    method: 'get',
    params: query
  });
}

//从ES根据父节点code和日期查询节点

// #2670 2019-11-21 张亮三 区域公司下拉接口（所有）
export function getAllAreaCompanies(query) {
    return fetch({
        url: '/api/admin/org/getOrgsByPOrgCodeAndIssueAll',
        method: 'get',
        params: query
    });
}
// #2670 2019-11-21 张亮三 区域公司下拉接口（当前）
export function getAreaCompanies(query) {
  return fetch({
      url: '/api/admin/org/getOrgsByPOrgCodeAndIssue',
      method: 'get',
      params: query
  });
}
//#2752 2019-11-24 张亮三 增加机组状态列表导出
export function exportObj(params) {
  let token = getToken()
  let url = "/api/home/unitOnOffAnalysis/exportData?token=" + token
  for (let key in params) {
      url += "&" + key + "=" + params[key];
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

