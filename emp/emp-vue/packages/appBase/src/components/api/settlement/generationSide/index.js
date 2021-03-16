import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//抽取
export function getPageList(query) {
  return fetch({
    url: '/api/balance/jsDeviationFadianMain/extract',
    method: 'get',
    params: query
  });
}
//详情
export function getDetails(id) {
  return fetch({
    url: '/api/balance/jsDeviationFadianMain/detail/' + id,
    method: 'get'
  });
}
//新增
export function addData(obj) {
  return fetch({
    url: '/api/balance/jsDeviationFadianMain/add',
    method: 'post',
    data: obj
  });
}
//修改
export function modify(obj) {
  return fetch({
    url: '/api/balance/jsDeviationFadianMain/modify',
    method: 'put',
    data: obj
  });
}
// 导出
export function exportFile(ids){
  let token = getToken()
  let url = "/api/balance/jsDeviationFadianMain/export/" + ids + "?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}
//校验期次重复
export function checkPeriod(query) {
  return fetch({
    url: '/api/balance/jsDeviationFadianMain/check',
    method: 'get',
    params: query
  });
}
