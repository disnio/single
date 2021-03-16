import fetch from '@common/utils/fetch';

export function getDayPower(query) {
  return fetch({
    url: '/api/home/daypower/getDayPower',
    method: 'get',
    params: query
  });
}
export function getDayPowerList(query) {
  return fetch({
    url: '/api/home/daypower/getDayPowerList',
    method: 'get',
    params: query
  });
}