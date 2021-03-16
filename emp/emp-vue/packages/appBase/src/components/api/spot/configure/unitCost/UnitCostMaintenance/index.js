/*
 * @功能描述: 单位变动成本维护 单位发电成本维护  页面接口api
 * @版本: 1.0.0
 * @作者: 吴志超
 * @Date: 2019-11-07 16:28:05
 * @最新修改内容: 
 * @LastEditTime: 2019-11-08 09:58:31
 */
import fetch from '@common/utils/fetch';

// 初始化查询数据
// /smunitvariablecomcosts/getAllDataList
// 单位发电成本表 - 全部查询
export function getPowerAllDataList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecomcosts/getAllDataList',
    method: 'get',
    params: query
  });
}
// 点击计算时调取接口
// /smunitvariablecomcosts/add
// 单位发电成本表 - 新增
export function addPower(query) {
  return fetch({
    url: '/api/tran/smunitvariablecomcosts/add',
    method: 'post',
    data: query
  });
}

// /smunitvariablecosts/add
// 机组变动成本表 - 新增
export function addChange(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/add',
    method: 'post',
    data: query
  });
}
// /smunitvariablecosts/getAllDataList
// 机组变动成本表 - 全部查询
export function getChangeAllDataList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getAllDataList',
    method: 'get',
    params: query
  });
}