/*
 * @功能描述: 
 * @版本: 
 * @作者: frj
 * @Date: 2020-02-13 14:16:11
 * @最新修改内容: 
 * @LastEditTime: 2020-06-01 16:01:01
 */ 
import fetch from '@common/utils/fetch';

// 发电侧结算的公共接口 api

export function getCrewInforList(query) {
  return fetch({
    url: '/api/settl/unitInfor/getCrewInforList',
    method: 'get',
    params: query

  })
};
//机组接口
export function getListAll(query) {
  return fetch({
    url: '/api/admin/unitInforTable/getListAll',
    method: 'get',
    params: query

  })
}
export function getTradingUnitbyTradingUnitName(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
    method: 'get',
    params: query

  })
}
