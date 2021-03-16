import fetch from '@common/utils/fetch';
export function getSdContractBarChart(query) {
  return fetch({
    url: '/api/home/sdContractAnalysis/getSdContractBarChart',
    method: 'get',
    params: query
  });
}
export function getSdContractPieChart(query) {
  return fetch({
    url: '/api/home/sdContractAnalysis/getSdContractPieChart',
    method: 'get',
    params: query
  });
}
export function getSdContractRectangleChart(query) {
  return fetch({
    url: '/api/home/sdContractAnalysis/getSdContractRectangleChart',
    method: 'get',
    params: query
  });
}