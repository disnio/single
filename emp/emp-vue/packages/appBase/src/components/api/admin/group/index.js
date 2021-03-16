import fetch from '@common/utils/fetch';

export function getAllGroupTypes() {
  return fetch({
    url: '/api/admin/groupType/all',
    method: 'get'
  });
}

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/group/tree',
    method: 'get',
    params: query
  });
}


export function addObj(obj) {
  return fetch({
    url: '/api/admin/group',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'get'
  });
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'delete'
  });
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/group/' + id,
    method: 'put',
    data: obj
  });
}

export function getUsers(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/user',
    method: 'get'
  });
}

// #2990 wangc 20191203 关联用户接口传参修改
export function modifyUsers(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/user',
    method: 'put', 
    data: data
  });
}


export function removeElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/remove',
    method: 'post',
    params: data
  });
}

export function addElementAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/add',
    method: 'post',
    params: data
  });
}

export function removeElementAuthorityAll(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/removeAll',
    method: 'post',
    params: data
  });
}

export function addElementAuthorityAll(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element/addAll',
    method: 'post',
    params: data
  });
}

export function getElementAuthority(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/element',
    method: 'get'
  });
}

export function modifyMenuAuthority(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'post',
    params: data
  });
}


export function getMenuAuthority(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/authority/menu',
    method: 'get'
  });
}

export function getOrganize(id) {
  return fetch({
    url: '/api/admin/group/' + id + '/org',
    method: 'get'
  });
}
export function getRoleCode(data) {
  return fetch({
    url: '/api/admin/group/getRoleCode',
    method: 'get',
    params: data
  });
}

export function modifyOrganize(id, data) {
  return fetch({
    url: '/api/admin/group/' + id + '/org',
    method: 'post',
    params: data
  });
}
export function checkUniqueness(obj) {
  return fetch({
    url: '/api/admin/group/checkUniqueness',
    method: 'post',
    data: obj
  });
}


// 2019-10-31 #2406 秦侯珍  系统关联-角色权限管理-角色关联用户   获取组织树
export function getOrgtreeByGroupId(data) {
  return fetch({
    url: '/api/admin/org/getOrgtreeByGroupId',
    method: 'get',
    params: data
  });
}

// 2019-10-31 #2406 秦侯珍  系统关联-角色权限管理-角色关联用户
export function getUserListByOrgIdAndGroupId(data) {
  return fetch({
    url: '/api/admin/user/getUserListByOrgIdAndGroupId',
    method: 'get',
    params: data
  });
}

// 复制角色
export function batchMenu(data) {
  return fetch({
    url: '/api/admin/group/batchMenu',
    method: 'post',
    params: data
  });
}
