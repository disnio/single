import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: "/api/admin/parameter/list",
    method: "get",
    params: query
  });
}

//点击编辑获取数据
export function getObj(id) {
  return fetch({
    url: "/api/admin/parameter/selectParameterById/" + id,
    method: "get"
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/contract/htTemplate/addHtTemplate',
    method: 'post',
    data: obj
  });
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/parameter/' + id,
    method: 'put',
    data: obj
  })
}

//=========组织结构树=========/api/admin/org/tree
export function getUnitNameTreeObj() {
  return fetch({
    url: '/api/admin/org/tree',
    method: 'get'
  })
}

// // 刷新状态
export function parameterRefreshObj(query) {
  return fetch({
    url: '/api/admin/parameter/parameterRefresh',
    method: 'get',
    params: query
  })
}

