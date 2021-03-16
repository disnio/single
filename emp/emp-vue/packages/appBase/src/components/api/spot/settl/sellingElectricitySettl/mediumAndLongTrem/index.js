import fetch from '@common/utils/fetch';

 /* 中长期（售电侧） */

 // 列表查询 日数据
 export function getResultDay(query) {
  return fetch({
    url: '/api/settl/electmltdate/getDate',
    method:'get',
    params: query
  });
}

 // 列表查询 小时数据
export function getResultHour(query) {
  return fetch({
    url: '/api/settl/electmlthours/getHours',
    method:'get',
    params: query
  });
}
