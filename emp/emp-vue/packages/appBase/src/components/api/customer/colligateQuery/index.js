import fetch from '@common/utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/customer/tMdataCustomer/getPageList',
    method: 'get',
    params: query
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/customer/tMdataCustomer/' + id,
    method: 'get'
  })
}

export function getkhbfObj(query) {
  return fetch({
    url: '/api/customer/khCustomerVisit/page',
    method: 'get',
    params: query
  })
}
//根据customerName查询客户关系
export function getNamePageList(query) {
  return fetch({
    url: '/api/customer/khCustomerVisit/pageList',
    method: 'get',
    params: query
  })
}

export function selectqyzt() {//获取联签约状态
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=contract_status',
    method: 'get'
  })
}

export function selectLevel(query) {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=customer_rate',
    method: 'get',
    params: query
  });
}

export function selectKhlb(query) {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=customer_type',
    method: 'get',
    params: query
  });
}


export function selectSex() {//获取性别
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=sex',
    method: 'get'
  })

}

export function selectIndustry() {//获取所属行业
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=customer_profession',
    method: 'get'
  })
}

export function selectProvince(params) {//获取省市区
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
    method: 'get'
  })
}

export function selectSsdw(params) {//获取所属电网
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=power_grid',
    method: 'get'
  })
}

// export function selectRate() {//获取联客户等级
//   return fetch({
//     url: '/api/admin/dim/getDimByPropCode?propCode=customer_rate',
//     method: 'get'
//   })
// }

export function selectObj(params) {//获取下拉框
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=' + params,
    method: 'get'
  })
}
// 获取签约状态列表
export function getCustomerStatus(query) {
  return fetch({
    url: '/api/contract/htContract/PageList',
    method: 'get',
    params: query
  });
}

// 获取实际用电量列表
export function getPowerInfor(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/getJsdPageList',
    method: 'get',
    params: query
  });
}
// 获取结算信息列表
export function getAccountsInfor(query) {
  return fetch({
    url: '/api/balance/preSettlementDetail/getJsdPageList',
    method: 'get',
    params: query
  });
}

// 获取申报电量列表
export function getDeclaredElecs(query) {
  return fetch({
    url: '/api/business/jyPowerDeclarationDetail/getDeatilPageById',
    method: 'get',
    params: query
  });
}
// 获取客户标签信息
export function getCustomerTags(query) {
  return fetch({
    url: '/api/customer/khCustomerLabelRelation/getListByCustomerId',
    method: 'get',
    params: query
  });
}

//查看联系人详情接口

export function getcontactsObj(id) {
  return fetch({
    url: '/api/customer/tMdataCustomerContacts/' + id,
    method: 'get'
  })
}

// #3284 2020-01-08 gaoaianing 历史用电量接口 
export function getHistoryPower(query) { //初始化获取历史用电量数据列表
  return fetch({
      url: '/api/customer/tMdataCustomer/getcustomerHisUseElecInfo',
      method: 'get',
      params:query
  })
}


