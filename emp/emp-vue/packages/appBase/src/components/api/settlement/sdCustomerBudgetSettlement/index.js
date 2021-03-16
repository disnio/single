import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/getPageList',
    method: 'get',
    params: query
  });
}
 
//修改数据状态 /jsSdkhdfyjs/cancelCommit 
export function changeStatus(query) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/cancelCommit',
    method: 'get',
    params: query
  });
}

// 详情页列表信息
export function getDetailsList(query) {
  return fetch({
    url: '/api/contract/htContract/extractHtContractFJ',
    method: 'get',
    params: query
  });
}
//新增客户电费预结算
export function addObj(obj) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/insertjsSdkhdfyjs',
    method: 'post',
    data: obj
  });
}

// 明细修改 /jsSdkhdfyjsDetail/{ id }
export function putObj(id, obj) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjsDetail/' + id,
    method: 'put',
    data: obj
  })
}

// 明细 查看 /jsSdkhdfyjsDetail/{id} 
export function getDetailById(id) {
  return fetch({
    url: '/api/contract/htAgentProtocol/' + id,
    method: 'get'
  })
}

// 调整记录 
export function getAdjustmentRecord(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  })
}

 //判断日期选择完 数据是否保存======================
export function checkInsertFlag(query) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/checkInsertFlag',
    method: 'get',
    params: query
  })
}

// 获取结算库里的 明细 数据
export function getBalancePage(query) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjsDetail/page',
    method: 'get',
    params: query
  })
}

// /preSettement/l{id}
export function delObj(id) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/' + id,
    method: 'delete'
  })
}
export function delAll(id) {
  return fetch({
    url: '/api/balance//jsSdkhdfyjs/deleteJs/' + id,
    method: 'delete'
  })
}


// /删除详情列表数据
export function deleteProcess(id) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/' + id,
    method: 'delete'
  })
}
//重置数据
export function reInitData(query) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjsDetail/resetJsDetailData',
    method: 'post',
    data: query
  })
}
//保存主数据
export function saveMainData(obj) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjs/insertSdjs',
    method: 'post',
    data: obj
  })
}
//计算
export function countSdyjs(obj) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjsDetail/countSdyjs',
    method: 'post',
    data: obj
  })
}
//修改详情状态
export function changeListStatus(obj) {
  return fetch({
    url: '/api/balance/jsSdkhdfyjsDetail/changeListStatus',
    method: 'get',
    params: obj
  })
}

export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/jsSdkhdfyjsDetail/exportData?token=" + token
  let sdkhdfyjsId = parm.sdkhdfyjsId

  if (sdkhdfyjsId !== undefined && sdkhdfyjsId !== "" && sdkhdfyjsId !== null) {
    url += "&sdkhdfyjsId=" + sdkhdfyjsId
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;
}

