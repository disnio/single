import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/user/list',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/user',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id,
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
//根据地区名称查询地区基础信息接口
export function selectRegionCodeByName(query) {
  return fetch({
    url: '/api/admin/dim/selectRegionCodeByName',
    method: 'get',
    params: query
  });
}
export function getPageList(query) {
  return fetch({
      url: '/api/home/customeranalyze/getCityName',
      method: 'get',
      params: query
  });
}
// export function getPageList(query) {
//   return fetch({
//       url: '/api/customer/tMdataCustomer/getPageList',
//       method: 'get',
//       params: query
//   });
// }

export function getMapData(query) {
  return fetch({
      url: '/api/home/customeranalyze/getCityMap',
      method: 'get',
      params: query
  });
}

export function getBarData(query) {
  return fetch({
      url: '/api/home/customeranalyze/getBarGraph',
      method: 'get',
      params: query
  });
}
