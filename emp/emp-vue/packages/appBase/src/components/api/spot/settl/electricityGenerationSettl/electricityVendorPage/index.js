import fetch from '@common/utils/fetch';

// 发电侧 日清初步结果查询 日数据
export function getElecgenResultDay(query) {
  return fetch({
    url: '/api/settl/elecgenresultday/getResult',
    method: 'get',
    params: query
  })
}

// 发电侧 日清初步结果查询 小时数据
export function getElecgenResultHour(query) {
  return fetch({
    url: '/api/settl/elecgenresulthour/getResult',
    method: 'get',
    params: query
  })
}
