import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// (江西)获取主页面列表数据
export function page(query) {
  return fetch({
    url: '/api/balance/preSettlement/page',
    method: 'get',
    params: query
  });
}

//（江西）修改详情table表格数据状态 
export function ModifyDataStatus(query) {
  return fetch({
    url: '/api/balance/preSettlement/cancelCommit',
    method: 'get',
    params: query
  });
}

//（江西）客户电费结算 新增抽取数据接口
export function addjxObj(obj) {
  return fetch({
    url: '/api/balance/preSettlement/insertJXInfo',
    method: 'post',
    data: obj
  });
}


// 明细修改 /preSettlementDetail/{ id }
export function putObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementDetail/udpateJXDetailById',
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
// export function detailBatchUpdateStatusObj(id) {
//   return fetch({
//     url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
//     method: 'get'
//   })
// }

// 调整记录 
export function getadjustmentRecord(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  })
}

//(江西)校验期次是否重复
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

// (江西客户)从表计算 FromTableCalculation
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementDetail/countJXDetail',
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

//(江西)客户结算详情页导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/preSettlementDetail/exportJXDetailList?token=" + token 
  let preSettlementId = parm.preSettlementId

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;

}
