import fetch from '@common/utils/fetch';

// /smunitheughtprice/add
// -新增
export function add(query) {
  return fetch({
    url: '/api/tran/smunitheughtprice/add',
    method: 'post',
    data: query
  });
}

// /smunitheughtprice/getPage
// -分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smunitheughtprice/getPage',
    method: 'get',
    params: query
  });
}

// /smunitheughtprice/update
// -更新
export function update(query) {
  return fetch({
    url: '/api/tran/smunitheughtprice/update',
    method: 'post',
    data: query
  });
}

// /smunitheughtprice/deleteList
// -多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smunitheughtprice/deleteList',
    method: 'post',
    data: query
  });
}
