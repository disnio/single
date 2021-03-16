/*
 * @Author: fengzp
 * @Date: 2021-03-05 10:47:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 13:57:29
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//列表新增接口
export function addObj(obj) {
  return fetch({
      url: '/api/business/jyAncillaryTradingResultsFrequency',
      method: 'post',
      data: obj
  });
}
// 修改
export function update(query,id){
  return fetch({
      url:'/api/business/jyAncillaryTradingResultsFrequency/' + id,
      method:'put',
      data:query
  })
}
//根据方案id删除方案
export function delObj(id) {
  return fetch({
    url: '/api/business/jyAncillaryTradingResultsFrequency/' + id,
    method: 'delete'
  });
}
//数据校验
export function validation(query) {
  //列表接口
  return fetch({
    url: "/api/business/jyAncillaryTradingResultsFrequency/check",
    method: "post",
    data: query
  });
}
// 导出
export function exportFile(ids){
  let token = getToken()
  let url = "/api/business/jyAncillaryTradingResultsFrequency/export/" + ids + "?token=" + token
  // for(let key in params){
  //     if (typeof params[key] != 'undefined') {
  //     url += "&"+key+"=" + params[key];
  //     }
  // }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}