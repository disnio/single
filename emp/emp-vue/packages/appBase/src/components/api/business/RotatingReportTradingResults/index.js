/*
 * @Author: fengzp
 * @Date: 2021-03-05 10:47:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:00:24
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//列表新增接口
export function addObj(obj) {
  return fetch({
      url: '/api/business/jyAncillaryTradingResultsSpinning/add',
      method: 'post',
      data: obj
  });
}
// 修改
export function update(query){
  return fetch({
      url:'/api/business/jyAncillaryTradingResultsSpinning/modify',
      method:'put',
      data:query
  })
}
//根据方案id删除方案
export function delObj(id) {
  return fetch({
    url: '/api/business/jyAncillaryTradingResultsSpinning/delete',
    method: 'delete',
    params:{id:id}
  });
}
//数据校验
export function validation(query) {
  //列表接口
  return fetch({
    url: "/api/business/jyAncillaryTradingResultsSpinning/check",
    method: "post",
    data: query
  });
}
// 导出
export function exportFile(ids){
  let token = getToken()
  let url = "/api/business/jyAncillaryTradingResultsSpinning/export/" + ids + "?token=" + token
  // for(let key in params){
  //     if (typeof params[key] != 'undefined') {
  //     url += "&"+key+"=" + params[key];
  //     }
  // }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}