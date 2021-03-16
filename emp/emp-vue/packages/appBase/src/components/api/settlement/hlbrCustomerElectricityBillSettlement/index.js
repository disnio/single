/*
 * @功能描述: 结算模块-售电侧（呼伦贝尔）客户电费结算 #2909
 * @作者: 郑文杰
 * @Date: 2019-12-01 15:04:18
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:06:21
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 主表 分页查询
export function getPageList(query) {
  return fetch({
    url: '/api/balance/preSettlement/page',
    method: 'get',
    params: query
  });
}
export function selectById(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/' + query.detailId,
    method: 'get',
  });
}

//查询从表数据
export function getDetailList(query) {
  return fetch({
    url: '/api/balance/customerElePreSettlementDetailHulunBuir/getDetailInfo',
    method: 'get',
    params: query
  });
}
export function preSettlementDetail(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/page',
    method: 'get',
    params: query
  });
}

// 根据id删除信息
export function delObj(obj) {
  return fetch({
    url: '/api/balance/preSettlement/' + obj.id,
    method: 'delete',
    data: obj
  })
}

// 校验当前用户所选期次可否新增
export function checkObj(query) {
  return fetch({
    url: '/api/balance/customerelepresettlementHulunBuir/checkSettlementDate',
    method: 'get',
    params: query
  });
}

// 新增
export function insertSettlementInfo(obj) {
  return fetch({
    url: '/api/balance/preSettlement/insertSettlementInfo',
    method: 'get',
    params: obj
  });
}

// 
export function update(obj, id) {
  return fetch({
    url: '/api/balance/preSettlement/updateStatus',
    method: 'put',
    params: obj
  });
}
//客户结算详情页导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/preSettlementDetail/exportSettlementDetail?token=" + token
  let preSettlementId = parm.preSettlementId
  let provinceName = parm.provinceName
  let columns = parm.columns
  let titles = parm.titles

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }
  if (provinceName !== undefined && provinceName !== "" && provinceName !== null) {
    url += "&provinceName=" + provinceName
  }
  if (columns !== undefined && columns !== "" && columns !== null) {
    url += columns
  }

  if (titles !== undefined && titles !== "" && titles !== null) {
    url += titles
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;

}

export function getValueByOrgIdAndCode(query) {
  return fetch({
    url: "/api/admin/api/parameter/getValueByOrgIdAndCode",
    method: "get",
    params: query
  });
}

export function calcHLBEData(query) {
  return fetch({
    url: "/api/balance/preSettlementDetail/calcHLBEData",
    method: "post",
    data: query
  });
}
