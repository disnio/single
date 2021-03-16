import fetch from '@common/utils/fetch';
/* 配置管理--报价参数维护 */
// 分页查询：报价时点
export function getPage(query) {
  return fetch({
    url: '/api/tran/tacticstc/getPage',
    method: 'get',
    params: query
  });
}

//xinzeng  /tacticstc/add
export function addObj(obj) {
  return fetch({
    url: '/api/tran/tacticstc/add',
    method: 'post',
    data: obj
  });
}

export function updateObj(obj) {
  return fetch({
    url: '/api/tran/tacticstc/update',
    method: 'post',
    data: obj
  })
}

export function delObj(obj) {
  return fetch({
    url: '/api/tran/tacticstc/delete',
    method: 'post',
    data: obj

  })
}
