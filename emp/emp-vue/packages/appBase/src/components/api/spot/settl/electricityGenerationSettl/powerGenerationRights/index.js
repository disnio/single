import fetch from '@common/utils/fetch';

 /* 发电权转让 */

 // 列表查询 日数据
export function getResultGenrightDay(query) {
  return fetch({
    url: '/api/settl/elecgenresultday/getResultGenright',
    method:'get',
    params: query
  });
}

 // 列表查询 小时数据
export function getResultGenrightHour(query) {
  return fetch({
    url: '/api/settl/elecgenresulthour/getResultGenright',
    method:'get',
    params: query
  });
}
