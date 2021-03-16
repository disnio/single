import fetch from '@common/utils/fetch';

// /smunitbasicinfo/getBasicParamPage
// 机组物理基础参数信息 - 分页查询
export function getBasicParamPage(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getBasicParamPage',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/getAllBasicParamDataList
// 机组物理基础参数信息 - 全部查询
export function getAllBasicParamDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllBasicParamDataList',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/addBasicParam
// 机组基础信息 - 新增
export function addBasicParam(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/addBasicParam',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/addBasicParamFy
// 机组物理基础参数信息 - 新增 - 复用信息
export function addBasicParamFy(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/addBasicParamFy',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/deleteBasicParamList
// 机组物理基础参数信息 - 多选删除
export function deleteBasicParamList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/deleteBasicParamList',
    method: 'post',
    data: query
  });
}




// get
// /smunitbasicinfo/getAllBasicDataList
// 机组基础信息 - 全部查询

export function getAllBasicDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllBasicDataList',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/getAllUnitPowerDataList
// 机组发电能力 - 全部查询
export function getAllUnitPowerDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllUnitPowerDataList',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/getAllOnoffInfoDataList
// 机组启停信息 - 全部查询
export function getAllOnoffInfoDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllOnoffInfoDataList',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/getAllApprovedParamDataList
// 机组核定参数 - 全部查询
export function getAllApprovedParamDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllApprovedParamDataList',
    method: 'get',
    params: query
  });
}

// /smunitbasicinfo/getAllDefaultQuoteDataList
// 机组缺省报价 - 全部查询
export function getAllDefaultQuoteDataList(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/getAllDefaultQuoteDataList',
    method: 'get',
    params: query
  });
}





// post
// /smunitbasicinfo/updateBasic
// 机组基础信息 - 更新
export function updateBasic(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/updateBasic',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/updateUnitPower
// 机组发电能力 - 更新
export function updateUnitPower(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/updateUnitPower',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/updateOnoffInfo
// 机组启停信息 - 更新
export function updateOnoffInfo(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/updateOnoffInfo',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/updateApprovedParam
// 机组核定参数 - 更新
export function updateApprovedParam(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/updateApprovedParam',
    method: 'post',
    data: query
  });
}

// /smunitbasicinfo/updateDefaultQuote
// 机组缺省报价 - 更新
export function updateDefaultQuote(query) {
  return fetch({
    url: '/api/tran/smunitbasicinfo/updateDefaultQuote',
    method: 'post',
    data: query
  });
}
