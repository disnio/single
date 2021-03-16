/*
 * @功能描述: 
 * @版本: 
 * @作者: wangc
 * @Date: 2019-11-04 09:28:18
 * @最新修改内容: 
 * @LastEditTime: 2020-09-03 09:51:33
 */
import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/element/list',
    method: 'get',
    params: query
  });
}
// #3281 wangc 新查询列表接口带按钮禁用状态值
export function elementLPage(query) {
  return fetch({
    url: '/api/admin/element/elementList',
    method: 'get',
    params: query
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/admin/element',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'put',
    data: obj
  })
}


// 数据权限树  #2850 wangc  20191209
export function dataLimitTree(data) {
  return fetch({
    url: "/api/admin/dim/dataLimitTree",
    method: "get",
    params: data
  });
}

// 保存选中数据权限树 #2850 wangc  20191209
export function setDataLimitByIds(obj) {
  return fetch({
    url: "/api/admin/baseelementdatadim/setDataLimitByIds",
    method: "post",
    data:obj
  });
}

// 回显选中数据权限树 #2850 wangc  20191209
export function getDimsByElementId(obj) {
  return fetch({
    url: "/api/admin/baseelementdatadim/getDimsByElementId",
    method: "get",
    params:obj
  });
}

// 第二次树 #2850 wangc  20191209
export function selectedDataLimitTree(obj) {
  return fetch({
    url: "/api/admin/dim/selectedDataLimitTree",
    method: "get",
    params:obj
  });
}

// 第二次树 #2850 wangc  20191209
export function saveRoleResourceDimRelation(obj) {
  return fetch({
    url: "/api/admin/baseauthorityresourcedim/saveRoleResourceDimRelation",
    method: "post",
    data:obj
  });
}

// 第二次树选中回显 #2850 wangc  20191209
export function getDimsByRoleResource(obj) {
  return fetch({
    url: "/api/admin/baseauthorityresourcedim/getDimsByRoleResource",
    method: "get",
    params:obj
  });
}


// 报表权限
// 更改选择信息
export function elementChangeByMenuId(menuId,codes) {
  return fetch({
    url: `/api/admin/element/elementChangeByMenuId?menuId=${menuId}&codes=${codes}`,
    method: "post",
  });
}
// 获取选择信息
export function elementListByMenuId(id) {
  return fetch({
    url: `/api/admin/element/elementListByMenuId?menuId=${id}`,
    method: "get",
  });
}
