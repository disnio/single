import fetch from '@common/utils/fetch';

export function getSample (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getSample',
    method:'get',
    params: query
  });
}

export function getLoad (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getLoad',
    method:'get',
    params: query
  });
}

export function getForecastResult (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getForecastResult',
    method: 'post',
    data: query
  });
}

export function saveScheme (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/saveScheme',
    method: 'post',
    data: query
  });
}

export function getPage (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getPage',
    method:'get',
    params: query
  });
}

export function deleteList (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/deleteList',
    method: 'post',
    data: query
  });
}

export function getResultPercentages (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getResultPercentages',
    method:'get',
    params: query
  });
}

export function getResultForecastedPrice (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getResultForecastedPrice',
    method:'get',
    params: query
  });
}

export function publishList (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/publishList',
    method: 'post',
    data: query
  });
}

export function getSelectedLoad (query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getSelectedLoad',
    method: 'post',
    data: query
  });
}
