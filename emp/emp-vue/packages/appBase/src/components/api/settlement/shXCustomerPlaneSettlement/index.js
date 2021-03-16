/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2020-02-18 21:17:20
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:08:32
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function addObj(obj) {
  return fetch({
    url: '/api/balance/preSettlement/insertSxInfo',
    method: 'post',
    data: obj
  })
}

// 山西-从表计算 
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementDetail/countSxDetail',
    method: 'post',
    data: obj
  })
}
//#3860修改保存接口 gaoaining 2020-04-02
export function ModifyData(query) {
  return fetch({
    url: '/api/balance/preSettlement/updateShanxi',
    method: 'get',
    params: query
  });
}

//山西客户结算详情页导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/preSettlementDetail/exportSxDetailList?token=" + token
  let preSettlementId = parm.preSettlementId

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;
}