/*
 * @Author: fengzp
 * @Date: 2021-03-05 10:47:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:07:36
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//校验期次
export function calibrationPeriod(params) {
  return fetch({
      url: '/api/balance/jsSdcSdgsGd/checkPeriodAndOrg',
      method: 'get',
      params: params
  })
}
// 分页查询列表
export function page(query) {
    return fetch({
        url: '/api/balance/jsSdcSdgsGd/getJsSdcSdgsGdByPage',
        method: 'post',
        data: query
    });
}
//新增
export function addObj(params) {
  return fetch({
      url: '/api/balance//jsSdcSdgsGd/addJsSdcSdgsGd',
      method: 'post',
      data:params
  })
}

//修改
export function update(params) {
  return fetch({
      url: '/api/balance/jsSdcSdgsGd/updateJsSdcSdgsGd',
      method: 'put',
      data:params
  })
}
// 删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/jsSdcSdgsGd/deleteJsSdcSdgsGd',
    method: 'delete',
    params: id
  })
}
//查询电厂接口
export function getCustomer(params) {
  return fetch({
      url: '/api/customer/tMdataCustomer/getCustomerByCustomerName',
      // url: '/api/customer/khCustomerRelation/page/getAlreadyPage',
      method: 'get',
      params: params
  })
}
// 子页面详情
export function getDeatil(params) {
    return fetch({
        url: '/api/balance/jsSdcSdgsGd/getDeatilsByJsdId',
        method: 'get',
        params: params
    })
}
// 导出
export function exportFile(params){
  let token = getToken()
  let url = "/api/balance/jsSdcSdgsGdDetail/exportJsSdcSdgsGdDetailExcel?token=" + token
  if (params !== undefined && params !== "" && params !== null) {
    url += "&jsdIds=" + params
}
 window.location.href = url + "&ModelCode=" + window.mdcode;
  // let token = getToken()
  // let url = "/api/business/jyMarketTransactions/export/" + ids + "?token=" + token
  // window.location.href = url
}