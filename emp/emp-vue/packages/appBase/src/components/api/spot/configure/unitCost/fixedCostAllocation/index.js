/*
 * @功能描述: 机组固定成本分摊接口api
 * @版本: 
 * @作者: 吴志超
 * @Date: 2019-10-08 09:48:30
 * @最新修改内容: 
 * @LastEditTime: 2019-10-31 14:41:35
 */
import fetch from '@common/utils/fetch';

// 新增时初始化数据
// /smunitfixedcosts/initDetailList
export function initDetailList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/initDetailList',
    method: 'get',
    params: query
  });
}

// 新增点击保存
// /smunitfixedcosts/add
export function add(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/add',
    method: 'post',
    data: query
  });
}

// /smunitfixedcosts/getAllDataList
// 机组固定成本表 - 全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/getAllDataList',
    method: 'get',
    params: query
  });
}


// /smunitfixedcosts/getAllDetailDataList
// 机组固定成本明细表 根据id查询- 全部查询
export function getAllDetailDataList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/getAllDetailDataList',
    method: 'get',
    params: query
  });
}

// /smunitfixedcosts/deleteList
// 机组固定成本表 - 多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/deleteList',
    method: 'post',
    data: query
  });
}


// /smunitfixedcosts/update
// 机组固定成本表 上报- 更新
export function update(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/update',
    method: 'post',
    data: query
  });
}

// /smunitfixedcosts/updateDetailList
// 机组固定成本明细表 - 更新

export function updateDetailList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/updateDetailList',
    method: 'post',
    data: query
  });
}

// reportList 上报
export function reportList(query) {
  return fetch({
    url: '/api/tran/smunitfixedcosts/reportList',
    method: 'post',
    data: query
  });
}
