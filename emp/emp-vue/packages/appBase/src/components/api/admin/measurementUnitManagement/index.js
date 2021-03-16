import fetch from '@common/utils/fetch';

export function getlistAll(query) {
  return fetch({
    url: '/api/admin/unitConfig/unitIndex',
    method: 'get',
    params: query
  });
}
//获取容量单位下拉信息
export function capacityUnit(query) {
  return fetch({
    url: '/api/admin/unitConfig/capacityUnit',
    method: 'get',
    params: query
  });
}
//获取电费单位下拉信息
export function chargeUnit(query) {
  return fetch({
    url: '/api/admin/unitConfig/chargeUnit',
    method: 'get',
    params: query
  });
}
//获取电量单位下拉信息
export function electricityUnit(query) {
  return fetch({
    url: '/api/admin/unitConfig/electricityUnit',
    method: 'get',
    params: query
  });
}
//获取电价单位下拉信息
export function priceUnit(query) {
  return fetch({
    url: '/api/admin/unitConfig/priceUnit',
    method: 'get',
    params: query
  });
}
// //新增方法
// export function UnitIndexAdd(query) {
//   return fetch({
//     url: '/api/admin/unitConfig/unitIndex',
//     method: 'pust',
//     params: query
//   });
// }
//新增方法
export function UnitIndexAdd(obj) {
  return fetch({
    url: '/api/admin/unitConfig/unitIndex',
    method: 'post',
    data: obj
  });
}
export function unitIndexObj(obj) {
  return fetch({
    url: '/api/admin/unitConfig/unitIndex',
    method: 'put',
    data: obj
  })
}
//删除
export function unitIndexDeleta(obj) {
  return fetch({
    url: '/api/admin/unitConfig/unitIndex',
    method: 'delete',
    data: obj
  })
}
//