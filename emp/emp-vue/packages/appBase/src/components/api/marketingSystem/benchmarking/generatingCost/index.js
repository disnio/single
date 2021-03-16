import fetch from '@common/utils/fetch';

export function getChartData(query) {
  return fetch({
    url: '/api/home/fdcbzbdb/getData',
    method: 'get',
    params: query
  });
}
export function getLastMonths(query) {
  return fetch({
    url: '/api/home/fdcbzbdb/getLast12Months',
    method: 'get',
    params: query
  });
}
