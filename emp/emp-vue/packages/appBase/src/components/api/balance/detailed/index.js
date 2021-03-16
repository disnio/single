/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 13:56:32
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function addObj(obj) {
  return fetch({
    url: '/api/balance/customerActualPowerUse/insertOrUpdate',
    method: 'post',
    data: obj
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/balance/customerActualPowerUseDetail/' + id,
    method: 'delete'
  })
}

export function ResultExportObj(id) {
  let token = getToken()
  let url = "/api/balance/customerActualPowerUseDetail/exportDetailList?token=" + token + "&useId=" + id
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

export function importInfo(data) {
  return fetch({
    url: "/api/balance/customerActualPowerUse/importMainData",
    method: "post",
    data: data
  });
}

export function getAlreadyPage(query) {
  return fetch({
  url: '/api/customer/tMdataCustomer/getCustomerListByName', 
  method: 'get',
  params: query
  });
}
//新增修改前验证
export function checkActualPowerUseDetail(obj) {
  return fetch({
    url: "/api/balance/customerActualPowerUse/checkActualPowerUseDetail",
    method: "post",
    data: obj
  });
}
