import fetch from '@common/utils/fetch';

export function getWddbData(query) {
    return fetch({
      url: '/api/home/wddb/getWddbData',
      method: 'get',
      params: query
    });
  }
  
export function getStandingList(query) {
  return fetch({
    url: '/api/home/wddb/getStandingList',
    method: 'get',
    params: query
  });
}