import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 获取主列表-亮
export function page(query) {
  return fetch({
    url: '/api/balance/preSettlementHn/page',
    method: 'get',
    params: query
  });
}
//提交-亮
export function ModifyDataStatus(query) {
  return fetch({
    url: '/api/balance/preSettlement/cancelCommit',
    method: 'get',
    params: query
  });
}

// 新增客户电费预结算-亮
export function addObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementHn/addSettleMentInfo',
    method: 'post',
    data: obj
  });
}

// 明细修改保存-亮 /preSettlementDetail/{ id }
export function putObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementHn/save',
    method: 'post',
    data: obj
  })
}

// 从表批量的确认-亮
export function detailBatchUpdateStatusObj(id) {
  return fetch({
    url: '/api/balance/preSettlementDetail/batchUpdateStatus/' + id,
    method: 'get'
  })
}

//判断日期选择完 数据是否保存-亮
export function checkInsertFlag(query) {
  return fetch({
    url: '/api/balance/preSettlement/checkInsertFlag',
    method: 'get',
    params: query
  })
}

// 获取结算库里的 明细 数据-亮
export function getBalancePage(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/page',
    method: 'get',
    params: query
  })
}

// 湖南-主列表删除方法-亮
export function delObj(id) {
  return fetch({
    url: '/api/balance/preSettlement/' + id,
    method: 'delete'
  })
}

// 湖南-从表计算-亮 
export function countKhyjsDataObj(obj) {
  return fetch({
    url: '/api/balance/preSettlementHn/calcData',
    method: 'post',
    data: obj
  })
}

//湖南-客户结算详情页导出-亮
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/preSettlementHn/exportExcel?token=" + token
  let preSettlementId = parm.preSettlementId

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
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