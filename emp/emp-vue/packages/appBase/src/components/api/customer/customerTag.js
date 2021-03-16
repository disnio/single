import fetch from '@common/utils/fetch';
/*******
*客户标签管理
*krt
* 2019-02-02
*******/

//根据id删除信息
  export function delCustomerTag(id) {
  return fetch({
  url: '/api/customer/khCustomerLabelRelation/' + id,
  method: 'delete'
  })
}

//添加客户标签
  export function addCustomerTag(params) {
   return fetch({
    url: '/api/customer/khCustomerLabelRelation',
    method: 'post',
    data: params
    });
}

//修改客户标签
  export function updateCustomerTag(params,id) {
   return fetch({
    url: '/api/customer/khCustomerLabelRelation'+id,
    method: 'put',
    data: params
    });
}
// 根据客户ID获取客户标签信息
  export function getCustomerTagsByCustomerId(params) {
  return fetch({
    url: '/api/customer/khCustomerLabelRelation/getListByCustomerId',
    method: 'get',
    params: params
  });
}
// 获取该客户所有未选择的标签数据
  export function getAllCustomerTags(params) {
  return fetch({
    url: '/api/customer/khCustomerLabelRelation/getNotSelectDataList',
    method: 'get',
    params: params
  });
}
// 查询所有信息
  export function getAllCustomerTagsInfo(params) {
  return fetch({
    url: '/api/customer/khCustomerLabelRelation/all',
    method: 'get',
    params: params
  });
}







