/*
 * @功能描述: 
 * @版本: 
 * @作者: 阿彪
 * @Date: 2019-11-26 15:23:53
 * @最新修改内容: 
 * @LastEditTime: 2019-12-04 17:45:13
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//状态
export function getStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}
export function page(query) {
  return fetch({
    url: '/api/balance/xjSdgsJs/page',
    method: 'get',
    params: query
  });
}
//详情
export function selectFinanceById(query) {
  return fetch({
    url: '/api/balance/xjSdgsJsDetail/getAll',
    method: 'get',
    params: query
  });
}

//验证期次的唯一性
export function checkPeriod(query) {
  //新增判断
  return fetch({
    url: "/api/balance/xjSdgsJs/checkPeriod",
    method: "get",
    params: query
  });
}
//抽取数据
export function getCalData(query) {
  return fetch({
    url: '/api/balance/xjSdgsJs/extractDataXJ',
    method: 'get',
    params: query
  });
}
//计算
export function calculateCQ(obj) {
  return fetch({
    url: '/api/balance/xjSdgsJsDetail/calculateXJ',
    method: 'put',
    data: obj
  })
}
// 删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/xjSdgsJs/' + id,
    method: 'delete'
  })
}

//添加保存
export function addObj(query) {
  return fetch({
    url: '/api/balance/xjSdgsJsDetail/saveOrUpdate',
    method: 'post',
    data: query
  });
}