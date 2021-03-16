import fetch from '@common/utils/fetch';

//删除签约状态
  export function delContractStatus(id) {
  return fetch({
  url: '/api/customer/khCustomerSigningStatus/' + id,
  method: 'delete'
  })
}


//根据签约ID查看签约状态
  export function getContractStatusInfoById(id) {
   return fetch({
    url: '/api/customer/khCustomerSigningStatus/'+id,
    method: 'get'
    });
}
//添加签约状态
  export function addContractStatus(params) {
   return fetch({
    url: '/api/customer/khCustomerSigningStatus',
    method: 'post',
    data: params
    });
}

//修改签约状态
  export function updateContractStatus(params,id) {
   return fetch({
    url: '/api/customer/khCustomerSigningStatus/'+id,
    method: 'put',
    data: params
    });
}
// 获取签约状态信息
  export function getContractStatus(params) {
  return fetch({
    url: '/api/customer/khCustomerSigningStatus/selectInforToQuery',
    method: 'get',
    params: params
  });
}
//记录表分页
  export function page(params) {
  return fetch({
    url: '/api/customer/tMdataCustomerVersionRecord/page',
    method: 'get',
    params: params
  });
}
// 签约状态的刷新
  export function updateSigningStatus(params) {
  return fetch({
    url: '/api/customer/khCustomerSigningStatus/updateSigningStatus',
    method: 'get',
    params: params
  });
}
// 查询所有信息
  export function getAllContractStatus(params) {
  return fetch({
    url: '/api/customer/khCustomerSigningStatus/all',
    method: 'get',
    params: params
  });
}




