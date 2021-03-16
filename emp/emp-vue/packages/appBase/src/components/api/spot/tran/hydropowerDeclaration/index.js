import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smhydroelectricenergy/add
// 水电日前电能量申报-新增
export function add(query) {
  return fetch({
    url: '/api/tran/smhydroelectricenergy/add',
    method: 'post',
    data: query
  })
}

// /smhydroelectricenergy/getPage
// 水电日前电能量申报-分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smhydroelectricenergy/getPage',
    method: 'get',
    params: query
  })
}

// /smhydroelectricenergy/update
// 水电日前电能量申报-更新
export function update(query) {
  return fetch({
    url: '/api/tran/smhydroelectricenergy/update',
    method: 'post',
    data: query
  })
}

// /smhydroelectricenergy/deleteList
// 水电日前电能量申报-多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smhydroelectricenergy/deleteList',
    method: 'post',
    data: query
  })
}
