/*
 * @功能描述: 结算管理--售电侧--售电公司电费结算（甘肃）  #2901 #3042
 * @版本: 1.0.0
 * @作者: wuzhichao
 * @Date: 2019-12-06 11:28:26
 * @LastEditTime: 2019-12-09 16:25:12
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";


// /jssdgsdfjsgs/getPage
// 售电公司电费结算主表_甘肃 - 分页查询  
export function getPage(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgs/getPage',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjsgs/getDfjsData
// 抽取数据
export function getDfjsData(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgs/getDfjsData',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjsgs/deleteList
// 售电公司电费结算主表_甘肃 - 多选删除
export function deleteList(obj) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgs/deleteList',
    method: 'post',
    data: obj
  });
}


// /jssdgsdfjsgs/checkPeriod
// 检查当前用户所属组织，结算日期唯一性 sdOrgId jsDate
export function checkPeriod(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgs/checkPeriod',
    method: 'get',
    params: query
  });
}


// /jssdgsdfjsgsdetail/getAllDataList
// 售电公司电费结算详情_甘肃 - 全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgsdetail/getAllDataList',
    method: 'get',
    params: query
  });
}

// /jssdgsdfjsgsdetail/update
// 售电公司电费结算详情_甘肃 - 更新
export function update(obj) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgsdetail/update',
    method: 'post',
    data: obj
  });
}


// /jssdgsdfjsgsdetail/getYhNmae
// 售电公司电费结算详情_甘肃 - 代理用户模糊查询
export function getYhNmae(query) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgsdetail/getYhNmae',
    method: 'get',
    params: query
  });
}


// /jssdgsdfjsgsdetail/datejs
// 售电公司电费结算详情_甘肃 - 计算
export function datejs(obj) {
  return fetch({
    url: '/api/balance/jssdgsdfjsgsdetail/datejs',
    method: 'post',
    data: obj
  });
}

