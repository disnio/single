import fetch from '@common/utils/fetch';

export function getMonthPageList (query) {
  return fetch({
    url: '/api/settl/invpay/getMonthPageList',
    method: 'get',
    params: query
  })
}

export function selectDayListByQuery (query) {
  return fetch ({
    url: '/api/settl/invpay/selectDayListByQuery',
    method: 'get',
    params: query
  })
}

export function selectHourListByQuery (query) {
  return fetch ({
    url: '/api/settl/invpay/selectHourListByQuery',
    method: 'get',
    params: query
  })
}
