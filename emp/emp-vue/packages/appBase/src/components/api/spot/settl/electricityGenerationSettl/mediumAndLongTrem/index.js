import fetch from '@common/utils/fetch';

/* 中长期市场化 */

//列表查询  日数据
export function resultLongtermDay(query) {
  return fetch({
    url: '/api/settl/elecgenresultday/getResultMlt',
    method: 'get',
    params: query

  })
}

//列表查询  小时数据
export function resultLongtermHour(query) {
  return fetch({
    url: '/api/settl/elecgenresulthour/getResultMlt',
    method: 'get',
    params: query

  })
}
