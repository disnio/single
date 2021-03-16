import fetch from '@common/utils/fetch';

/* 首页 即 售电初步结果查询（售电侧） */

// 列表查询 获取日
export function getDate(query) {
  return fetch({
    url: '/api/settl/electnissindate/getDate',
    method: 'get',
    params: query
  });
}

// 列表查询 获取时
export function getHours(query) {
  return fetch({
    url: '/api/settl/electnissinhours/getHours',
    method: 'get',
    params: query
  });
}