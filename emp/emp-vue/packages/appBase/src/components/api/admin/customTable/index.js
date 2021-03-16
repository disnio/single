/**
 * @file: index.js
 * @method getHeadList, putHeadList
 * @description: 表头定制
 * @author: wsc
 * @date: 2020-09-29
 */
import fetch from '@common/utils/fetch';
//?elementId=1439
export function getHeadList(query) {
  return fetch({
    url: '/api/admin/table-title/list',
    method: 'get',
    params: query
  });
}
//datalist
export function putHeadList(id, obj) {
  return fetch({
    url: '/api/admin/table-title/update/'+ id,
    method: 'put',
    data: obj,
    headers: { 'content-type':' application/json;charset=utf-8' },
  })
}
