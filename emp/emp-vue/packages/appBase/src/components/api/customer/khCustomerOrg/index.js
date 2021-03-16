import fetch from '@common/utils/fetch';

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/org/tree',
    method: 'get',
    params: query
  });
}

export function fetchAll() {
  return fetch({
    url: '/api/admin/org/all',
    method: 'get'
  });
}
export function addObj(obj) {
  return fetch({
    url: '/api/admin/org',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/org/' + id,
    method: 'put',
    data: obj
  })
}

export function page(query) {
  return fetch({
    url: '/api/customer/khCustomerRelation/page/getPage',
    method: 'get',
    params: query
  });
}

export function allot(obj) {//分配
  return fetch({
    url: '/api/customer/khCustomerRelation',
    method: 'post',
    data: obj
  });
}

export function remove(id) {
  return fetch({
    url: '/api/customer/khCustomerRelation/' + id,
    method: 'delete'
  })
}
