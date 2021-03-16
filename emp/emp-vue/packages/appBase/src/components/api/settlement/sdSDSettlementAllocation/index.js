import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/balance/sdSettlementConfig/getPageList',
    method: 'get',
    params: query
  });
}
//删除 /sdSettlementConfig/{id}
export function delObj(id) {
  return fetch({
    url: "/api/balance/sdSettlementConfig/" + id,
    method: "delete"
  });
}
//删除数组
export function deleteList(obj) {
  return fetch({
    url: "/api/balance/sdSettlementConfigDetail/deleteOne",
    method: "post",
    data: obj
  });
}
// 批量删除  /sdSettlementConfig/deleteSdSettlementConfigInfos   configIds
export function delById(query) {
  return fetch({
    url: "/api/balance/sdSettlementConfig/deleteSdSettlementConfigInfos",
    method: "get",
    params: query
  });
}
// 新增 
export function addObj(obj) {
  return fetch({
    url: '/api/balance/sdSettlementConfig',
    method: 'post',
    data: obj
  });
}
// 修改
export function putObj(id, obj) {
  return fetch({
    url: "/api/balance/sdSettlementConfig/" + id,
    method: "put",
    data: obj
  });
}
// 修改状态 
export function updateStateById(query) {
  return fetch({
    url: '/api/balance/sdSettlementConfig/updateStateById',
    method: 'get',
    params: query
  });
}
//联络通道 
export function getTMdataTieLin() {
  return fetch({
    url: '/api/basicData/tMdataTieLin/getAllLinList',
    method: 'get'
  });
}

// 日期选择唯一性验证 /sdSettlementConfig/checkPeriod
export function getCurrentDateVerification(query) {
  return fetch({
    url: '/api/balance/sdSettlementConfig/checkPeriod',
    method: 'get',
    params: query
  });
}

// 客户双边维护模糊查询
export function getAlreadyPage(query) {
  return fetch({
  url: '/api/customer/tMdataCustomer/getCustomerListByName',  
  method: 'get',
  params: query
  });
}


// 双边客户维护分页查询
export function getCustomerPage(query) {
  return fetch({
    url:'/api/balance/sdSettlementConfigDetail/page',
    method:'get',
    params: query
  })
}
