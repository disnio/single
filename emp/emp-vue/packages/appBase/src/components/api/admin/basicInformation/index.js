import fetch from '@common/utils/fetch';

export function getTree(query) {
  return fetch({
    url: '/api/admin/dim/tree',
    method: 'get',
    params: query
  });
}

export function fetchAll() {
  return fetch({
    url: '/api/admin/dim/all',
    method: 'get'
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/dim',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/dim/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/dim/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/dim/' + id,
    method: 'put',
    data: obj
  })
}

export function checkOnlyOne( obj) {
  return fetch({
    url: '/api/admin/dim/checkUniqueness',
    method: 'post',
    data: obj
  })
}
