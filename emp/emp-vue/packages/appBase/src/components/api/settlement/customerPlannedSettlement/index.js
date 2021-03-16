import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/preSettlement/page',
    method: 'get',
    params: query
  });
}

//修改数据状态 /preSettlement/cancelCommit 
export function ModifyDataStatus(query) {
  return fetch({
    url: '/api/balance/preSettlement/cancelCommit',
    method: 'get',
    params: query
  });
}

// 抽取福建合同信息
export function getFJList(query) {
  return fetch({
    url: '/api/contract/htContract/extractHtContractFJ',
    method: 'get',
    params: query
  });
}

// 抽取广东合同信息
export function getGDList(query) {
  return fetch({
    url: '/api/contract/htContract/extractHtContractGD',
    method: 'get',
    params: query
  });
}

//    新增客户电费预结算
export function addObj(obj) {
  return fetch({
    url: '/api/balance/preSettlement/insertPreSettlement',
    method: 'post',
    data: obj
  });
}

// 明细修改 /preSettlementDetail/{ id }
export function putObj(id, obj) {
  return fetch({
    url: '/api/balance/preSettlementDetail/' + id,
    method: 'put',
    data: obj
  })
}

// 明细 查看 /preSettlementDetail/{id} 
export function getDetailById(id) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'get'
  })
}

// 从表批量的确认
export function detailBatchUpdateStatusObj(id) {
  return fetch({
    url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
    method: 'get'
  })
}

// 调整记录 
export function getadjustmentRecord(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  })
}

//判断日期选择完 数据是否保存======================
export function checkInsertFlag(query) {
  return fetch({
    url: '/api/balance/preSettlement/checkInsertFlag',
    method: 'get',
    params: query
  })
}

// 获取结算库里的 明细 数据
export function getBalancePage(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/page',
    method: 'get',
    params: query
  })
}

// /preSettement/l{id} 
export function delObj(id) {
  return fetch({
    url: '/api/balance/preSettlement/' + id,
    method: 'delete'
  })
}

// 从表计算 FromTableCalculation
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/contract/htContract/countKhyjsDataGD',
    method: 'post',
    data: obj
  })
}
// #4223 gaoaining  添加广东二级页面计算接口 countKhyjsDataObjGd
export function countKhyjsDataObjGd(obj) {
  return fetch({
    url: '/api/balance/preSettlementDetail/countGDData',
    method: 'post',
    data: obj
  })
}
//福建客户预结算计算
export function countKhyjsDataByFj(obj) {
  return fetch({
    url: '/api/contract/htContract/countKhyjsDataFJ',
    method: 'post',
    data: obj
  })
}

//重庆客户预结算计算
export function countKhyjsDataByCq(obj) {
  return fetch({
    url: '/api/balance/preSettlement/calcCQData',
    method: 'post',
    data: obj
  })
}

//山西客户批次
export function getDimsByParentCodeAndValue(query) {
  return fetch({
    url: "/api/admin/dim/getDimsByParentCodeAndValue",
    method: "get",
    params: query
  });
}

//广东客户结算详情页导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/preSettlementDetail/exportDetailList?token=" + token
  let preSettlementId = parm.preSettlementId

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }

  window.location.href = url

}