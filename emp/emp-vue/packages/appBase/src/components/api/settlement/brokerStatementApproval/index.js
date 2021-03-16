/*
 * @Author: liz
 * @Date: 2021-01-28 17:29:28
 * @version: 
 * @Descripttion: 江苏居间商审批
 */
import fetch from '@common/utils/fetch';

// 提交
export function jsCommit(data) {
  return fetch({
    url: `/api/balance/jsMiddlemanStatementJsMain/approval`,
    method: 'post',
    data: data
  });
}


// 提交
export function csCommit(data) {
  return fetch({
    url: `/api/balance/jsElectricitySellingSideIntermediaryCs/approveSellingSideIntermediaryCs`,
    method: 'post',
    data: data
  });
}

// 提交
export function whCommit(data) {
  return fetch({
    url: `/api/balance/jsElectricitySellingSideIntermediaryWh/approval`,
    method: 'post',
    data: data
  });
}