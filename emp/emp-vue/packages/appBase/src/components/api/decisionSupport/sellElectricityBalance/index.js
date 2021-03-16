import fetch from '@common/utils/fetch';
export function getSdBalanceLine(query) {
  return fetch({
    url: '/api/home/sdbalance/getSdBalanceLine',
    method: 'get',
    params: query
  });
}
export function getSdBalanceSquare(query) {
  return fetch({
    url: '/api/home/sdbalance/getSdBalanceSquare',
    method: 'get',
    params: query
  });
}
// export function getSdContractRectangleChart(query) {
//   return fetch({
//     url: '/api/home/sdContractAnalysis/getSdContractRectangleChart',
//     method: 'get',
//     params: query
//   });
// }