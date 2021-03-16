/*
 * @功能描述: 结算管理-（河北）客户电费结算 工单 #2776 工单没有原型 都是截图
 * @作者:  wuzhichao 
 * @Date: 2019-11-25 14:39:10
 * @LastEditTime: 2021-03-13 14:06:03
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /hbPreSettlement/page
// 主表 分页查询
export function mainPage(query) {
  return fetch({
    url: '/api/balance/hbPreSettlement/page',
    method: 'get',
    params: query
  });
}

//批量删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/hbPreSettlement/' + id,
    method: 'delete'
  })
}
// 根据id删除信息
export function hbPreSettlement(id) {//
  return fetch({
    url: '/api/balance/hbPreSettlement/' + id,
    method: 'delete'
  })
}

// /hbPreSettlement/checkInsertFlag
// 校验当前用户所选期次可否新增
export function checkInsertFlag(query) {
  return fetch({
    url: '/api/balance/hbPreSettlement/checkInsertFlag',
    method: 'get',
    params: query
  });
}

// /hbPreSettlement/insertHbPreSettlementDetail
// 新增河北客户电费预结算
export function insertHbPreSettlementDetail(obj) {
  return fetch({
    url: '/api/balance/hbPreSettlement/insertHbPreSettlementDetail',
    method: 'post',
    data: obj
  });
}

// /hbPreSettlementDetail/page
// 明细 分页查询
export function page(query) {
  return fetch({
    url: '/api/balance/hbPreSettlementDetail/page',
    method: 'get',
    params: query
  });
}

// /hbPreSettlementDetail/{ id }
// 根据id修改信息
export function hbPreSettlementDetail(obj, id) {
  return fetch({
    url: '/api/balance/hbPreSettlementDetail/' + id,
    method: 'put',
    data: obj
  })
}

//  /hbPreSettlement/cancelCommit
//  修改数据状态  主表明细表同时修改
export function cancelCommit(query) {
  return fetch({
    url: '/api/balance/hbPreSettlement/cancelCommit',
    method: 'get',
    params: query
  });
}

// 从表批量的确认
export function detailBatchUpdateStatusObj(id) {
  return fetch({
    url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
    method: 'get'
  })
}

// /hbPreSettlementDetail/exportDetailList
// 导出详情页
export function exportDetailList(parm) {
  let token = getToken()
  let url = "/api/balance/hbPreSettlementDetail/exportDetailList?token=" + token
  let preSettlementId = parm.preSettlementId
  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;

}