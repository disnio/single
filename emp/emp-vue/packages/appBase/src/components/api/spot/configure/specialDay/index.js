import fetch from '@common/utils/fetch';
// 查询
export function getAllList(query) {
    return fetch({
      url: '/api/tran/smtypicaldaytype/getAllList',
      method: 'get',
      params: query
    });
  }
  // 新增
export function addObj(body) {
    return fetch({
        url: '/api/tran/smtypicaldaytype/insertByRepe',
        method: 'post',
        data: body
    });
}
// 修改
export function updateObj(body) {
    return fetch({
        url: '/api/tran/smtypicaldaytype/updateByRepe',
        method: 'post',
        data: body
    })
}
// 删除
export function delObj(query) {
    return fetch({
        url: '/api/tran/smtypicaldaytype/deleteList',
        method: 'post',
        data: query
    })
}
// 根据ID获取对象
export function getObj(query) {
    return fetch({
        url: '/api/tran/smtypicaldaytype/getOneById',
        method: 'get',
        params: query
    })
}

export function getQuarterList(query) {
    return fetch({
        url: '/api/tran/smtypicaldaytype/getQuarterList',
        method: 'get',
        params: query
    })
}


// /smtypicaldaytype/initialization
export function initialization(query) {
  return fetch({
    url: '/api/tran/smtypicaldaytype/initialization',
    method: 'get',
    params: query
  })
}

