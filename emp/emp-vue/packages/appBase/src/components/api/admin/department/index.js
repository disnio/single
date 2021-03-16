import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/dept/getPageListByOrgId',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/dept',
    method: 'post',
    data: obj
  });
}export function checkIsDefaultReceiver(obj) {
  return fetch({
    url: '/api/admin/dept/checkIsDefaultReceiver',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'get'
  })
}
export function getStatusToDelete(params) {
  return fetch({
    url: '/api/admin/dept/getStatusToDelete',
    method: 'get',
    params:params
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/dept/' + id,
    method: 'put',
    data: obj
  })
}

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/org/tree',
    method: 'get',
    params: query
  });
}

export function getCurrentUserOrg() {//获取当前用户信息
  return fetch({
  url: '/api/admin/org/getCurrentUserOrg',
  method: 'get'
  });
}
