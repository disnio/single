import fetch from '@common/utils/fetch';

export function getEleAnalysis(query) {
  return fetch({
    url: '/api/home/electricityAnalysis/getEleAnalysis',
    method: 'get',
    params: query
  });
}
export function getEleAnalysisList(query) {
  return fetch({
    url: '/api/home/electricityAnalysis/getEleAnalysisList',
    method: 'get',
    params: query
  });
}