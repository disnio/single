import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 获取主列表
export function page(query) {
  return fetch({
    url: '/api/balance/preSettlement/page',
    method: 'get',
    params: query
  });
}
//提交
// export function ModifyDataStatus(obj,state) {
//   return fetch({
//     url: '/api/balance/preSettlementDetail/batchUpdate/'+state,
//     method: 'post',
//     data: obj
//   });
// }
export function ModifyDataStatus(obj, id) {
  return fetch({
    url: '/api/balance/jsPreSettlement/' + id,
    method: 'put',
    data: obj
  })
}

// 新增客户电费结算
export function addObj(query) {
  return fetch({
    url: '/api/balance/preSettlement/insertSettlement',
    method: 'get',
    params: query
  });
}

// 明细修改保存 /preSettlementDetail/{ id }
export function putObj(obj, id) {
  return fetch({
    url: '/api/balance/jsPreSettlementDetail/' + id,
    method: 'put',
    data: obj
  })
}

// 从表批量的确认
export function detailBatchUpdateStatusObj(id) {
  return fetch({
    url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
    method: 'get'
  })
}

//判断日期选择完 数据是否保存
export function checkInsertFlag(query) {
  return fetch({
    url: '/api/balance/preSettlement/insertSettlementInfo',
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

//主列表删除方法
export function delObj(id) {
  return fetch({
    url: '/api/balance/preSettlement/' + id,
    method: 'delete'
  })
}

//从表计算
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/balance/jsPreSettlement/calcData',
    method: 'post',
    data: obj
  })
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

// 调整记录 
export function getadjustmentRecord(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  })
}


// 明细 查看 /preSettlementDetail/{id} 
export function getDetailById(id) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'get'
  })
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

//山西客户批次
export function getDimsByParentCodeAndValue(query) {
  return fetch({
    url: "/api/admin/dim/getDimsByParentCodeAndValue",
    method: "get",
    params: query
  });
}