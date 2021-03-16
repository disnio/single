/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-04 09:28:34
 * @最新修改内容: 
 * @LastEditTime: 2019-12-09 20:30:01
 */
import fetch from '@common/utils/fetch';

//修改了主界面查询接口
export function page(query) {
  return fetch({
    url: "/api/balance/customerActualPowerUse/getCustomerActualPowerUseInfo",
    method: "get",
    params: query
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/balance/customerActualPowerUse/' + id,
    method: 'delete'
  })
}

export function getObj(query) {
  return fetch({
    url: '/api/balance/customerActualPowerUseDetail/getDetailListByUseId',
    method: 'get',
    params: query
  })
}

export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/customerActualPowerUse/checkPeriod",
    method: "get",
    params: query
  });
}
export function cancelCommit(query) {
  //新增判断
  return fetch({
    url: "/api/balance/customerActualPowerUse/cancelCommit",
    method: "get",
    params: query
  });
}


//#4253 gaoaining 2020-06-13添加判断结算周期是否置灰的接口
export function getValueByOrgIdAndCodeNoDefaultValue(query) {
  //新增判断
  return fetch({
    url: "/api/admin/parameter/getValueByOrgIdAndCodeNoDefaultValue",
    method: "get",
    params: query
  });
}