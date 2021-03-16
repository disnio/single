import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//列表新增接口
export function addObj(obj) {
  return fetch({
      url: '/api/business/jyAncillaryTradingResultsPeak/add',
      method: 'post',
      data: obj
  });
}
// 修改
export function update(query){
  return fetch({
      url:'/api/business/jyAncillaryTradingResultsPeak/modify',
      method:'put',
      data:query
  })
}
//根据方案id删除方案
export function delObj(id) {
  return fetch({
    url: '/api/business/jyAncillaryTradingResultsPeak/delete',
    method: 'delete',
    params:{id:id}
  });
}
//数据校验
export function validation(query) {
  //列表接口
  return fetch({
    url: "/api/business/jyAncillaryTradingResultsPeak/check",
    method: "post",
    data: query
  });
}
// 导出
export function exportFile(ids){
  let token = getToken()
  let url = "/api/business/jyAncillaryTradingResultsPeak/export/" + ids + "?token=" + token
  // for(let key in params){
  //     if (typeof params[key] != 'undefined') {
  //     url += "&"+key+"=" + params[key];
  //     }
  // }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}