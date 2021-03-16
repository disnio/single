/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:03:52
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 指标范围
export function getSearchIndexRange(query) {
  return fetch({
    url: '/api/dataplatform/dim/getSearchIndexRange',
    method: 'POST',
    params: query
  });
}
// 发电类型
export function getDimPowerType(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimPowerType',
    method: 'POST',
    params: query
  });
}
// 发电细类
export function getDimDetailedType(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimDetailedType',
    method: 'POST',
    params: query
  });
}
// 地区
export function getDimRegion(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimRegion',
    method: 'POST',
    params: query
  });
}
// 省网
export function getDimProvincialNetwork(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimProvincialNetwork',
    method: 'POST',
    params: query
  });
}
// 省份
export function getDimProvincial(query) {
  return fetch({
    url: '/api/dataplatform/dim/getProvinceType',
    method: 'POST',
    params: query
  });
}
// 区域公司
export function getDimRegionalCompany(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimRegionalCompany',
    method: 'POST',
    params: query
  });
}
// 电厂指标
export function getDimPowerPlant(query) {
  return fetch({
    url: '/api/dataplatform/dim/getDimPowerPlant',
    method: 'POST',
    params: query
  });
}

// 表格数据
export function getSearchResult(query) {
  return fetch({
    url: '/api/dataplatform/getSearchResult',
    method: 'POST',
    params: query
  });
}
export function downloadExcelFileNew(params) {
  // console.log(params,77)
  let token = getToken()
  let url = "/api/dataplatform/exportSearchResult?token=" + token
  for(let key in params){
    url += "&"+key+"=" + params[key];
  }
  url+="&ModelCode="+sessionStorage.getItem("modelCode");
  //window.open(url + "&ModelCode=" + window.mdcode);
  window.location.href = url + "&ModelCode=" + window.mdcode;

}
