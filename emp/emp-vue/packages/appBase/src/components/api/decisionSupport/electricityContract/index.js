import fetch from '@common/utils/fetch';

export function getChartData(query) {
  return fetch({
    url: '/api/home/fdcontracat/getFdContracat',
    method: 'get',
    params: query
  });
}

export function getFdContracatSquareData(query) {
  return fetch({
    url: '/api/home/fdcontracat/getFdContracatSquare',
    method: 'get',
    params: query
  });
}
