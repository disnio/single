import fetch from "@common/utils/fetch";

export function page(query) {
  return fetch({
    url: '/api/customer/khCustomerLabel/page',
    method: 'get',
    params: query
  });
}
export function allPage(query) {
  return fetch({
    url: '/api/customer/khCustomerLabel/allPage',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/customer/khCustomerLabel',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/customer/khCustomerLabel/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/customer/khCustomerLabel/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/customer/khCustomerLabel/' + id,
    method: 'put',
    data: obj
  })
}
// 标签分类
export function taggingObj() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=khbqfl',
    method: 'get'
  })
}