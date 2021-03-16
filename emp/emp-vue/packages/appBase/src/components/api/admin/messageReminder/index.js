import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/messageConfig/page',
    method: 'get',
    params: query
  });
}

export function homeMsgPage(query) {
  return fetch({
    url: '/api/admin/message/getPageList',
    method: 'get',
    params: query
  });
}
export function getCurrentUserMessageCount() {
  return fetch({
    url: '/api/admin/message/getCurrentUserMessageCount',
    method: 'get'
  });
}
export function updateSatus(ids) {
  return fetch({
    url: '/api/admin/message/updateSatus',
    method: 'get',
    params: ids
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/messageConfig',
    method: 'post',
    data: obj
  });
} export function checkUniqueness(obj) {
  return fetch({
    url: '/api/admin/messageConfig/checkUniqueness',
    method: 'post',
    data: obj
  });
}
export function pause(obj) {
  return fetch({
    url: '/api/admin/messageConfig/pause',
    method: 'post',
    data: obj
  });
}
export function remove(obj) {
  return fetch({
    url: '/api/admin/messageConfig/remove',
    method: 'post',
    data: obj
  });
}
export function start(obj) {
  return fetch({
    url: '/api/admin/messageConfig/start',
    method: 'post',
    data: obj
  });
}
export function update(obj) {
  return fetch({
    url: '/api/admin/messageConfig/update',
    method: 'post',
    data: obj
  });
}
export function resume(obj) {
  return fetch({
    url: '/api/admin/messageConfig/resume',
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
    params: params
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
export function getUserListByOrgId(data) {//获取当前用户信息
  return fetch({
    url: '/api/admin/user/getUserListByOrgId',
    method: 'get',
    params: data
  });
}
export function getDimByPropCode() {//维度
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=rwlx',
    method: 'get'
  });
}
export function getAllBusinessMenuBox() {//维度
  return fetch({
    url: '/api/admin/messageConfig/getAllBusinessMenuBox',
    method: 'get'
  });
}

//查询登陆用户待办已办事项数量
export function toDoNonDoCount() {
  return fetch({
    url: '/api/admin/toDoList/toDoNonDoCount',
    method: 'get'
  });
}

//查询登陆用户待办已办事项
export function toDoNonDoList(query) {
  return fetch({
    url: '/api/admin/toDoList/toDoNonDoList',
    method: 'get',
    params: query
  });
}



