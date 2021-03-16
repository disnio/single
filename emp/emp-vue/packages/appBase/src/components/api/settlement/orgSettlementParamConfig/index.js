import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/jsJygzConfig/page',
    method: 'get',
    params: query
  });
}
 
//新增
export function addObj(obj) {
  return fetch({
    url: '/api/balance/jsJygzConfig',
    method: 'post',
    data: obj
  });
}

// 修改
export function putObj(id, obj) {
  return fetch({
    url: '/api/balance/jsJygzConfig/' + id,
    method: 'put',
    data: obj
  })
}
//明细
export function delObj(id) {
  return fetch({
    url: '/api/balance/jsJygzConfig/' + id,
    method: 'delete'
  })
}
