import fetch from '@common/utils/fetch';
//获取列表
export function page(query) {
  return fetch({
    url: '/api/admin/relationSystem/page',
    method: 'get',
    params: query
  });
}
//新增用户对应关系
export function addObj(obj) {
  return fetch({
    url: '/api/admin/relationSystem',
    method: 'post',
    data: obj
  });
}
//根据当前用户名及第三方系统code查询对应用户
export function getObj(query) {
  return fetch({
    url: '/api/admin/relationSystem/page',
    method: 'get',
    params: query
  });
}
//删除对应关系
export function delObj(id) {
  return fetch({
    url: '/api/admin/relationSystem/' + id,
    method: 'delete'
  })
}
//修改用户对应关系
export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/relationSystem/' + id,
    method: 'put',
    data: obj
  })
}
//获取报表期次
export function getReportIssue(query) {
  return fetch({
    url: '/api/admin/relationSystem/getPeriod',
    method: 'get',
    params: query
  })
}
     
