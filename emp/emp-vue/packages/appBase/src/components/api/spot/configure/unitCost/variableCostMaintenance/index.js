import fetch from '@common/utils/fetch';

// 供电标准煤耗表-新增查询
export function getCoalAddListt(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getCoalAddList',
    method: 'get',
    params: query
  });
}

// 入炉标煤单价表-新增查询
export function getCoalPriceAddList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getCoalPriceAddList',
    method: 'get',
    params: query
  });
}

// 脱硫脱硝材料费-新增/复用查询
export function getDesulAddList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getDesulAddList',
    method: 'get',
    params: query
  });
}

// 其他变动成本-新增/复用查询
export function getAddOtherList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getAddOtherList',
    method: 'get',
    params: query
  });
}

// 供电标准煤耗表-新增
export function addCoal(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/addCoal',
    method: 'post',
    data: query
  });
}

// 入炉标煤单价表-新增
export function addCoalPrice(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/addCoalPrice',
    method: 'post',
    data: query
  });
}

// 脱硫脱硝材料费-新增
export function addDesulDeni(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/addDesulDeni',
    method: 'post',
    data: query
  });
}

// 其他变动成本-新增
export function addOther(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/addOther',
    method: 'post',
    data: query
  });
}

// 供电标准煤耗表-多选删除
export function deleteCoalList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/deleteCoalList',
    method: 'post',
    data: query
  });
}

// 入炉标煤单价表-多选删除
export function deleteCoalPriceList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/deleteCoalPriceList',
    method: 'post',
    data: query
  });
}

// 脱硫脱硝材料费-多选删除
export function deleteDesulDeniList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/deleteDesulDeniList',
    method: 'post',
    data: query
  });
}

// 其他变动成本-多选删除
export function deleteOtherList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/deleteOtherList',
    method: 'post',
    data: query
  });
}

// 供电标准煤耗表-分页查询
export function getCoalPage(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getCoalPage',
    method: 'get',
    params: query
  });
}

// 入炉标煤单价表-分页查询
export function getCoalPricePage(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getCoalPricePage',
    method: 'get',
    params: query
  });
}

// 脱硫脱硝材料费-分页查询
export function getDesulDeniPage(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getDesulDeniPage',
    method: 'get',
    params: query
  });
}

// 其他变动成本-分页查询
export function getOtherPage(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getOtherPage',
    method: 'get',
    params: query
  });
}

// 供电煤耗-编辑保存
export function updateCoal(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/updateCoal',
    method: 'post',
    data: query
  });
}

// 入炉标煤-编辑保存
export function updateCoalPrice(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/updateCoalPrice',
    method: 'post',
    data: query
  });
}

// 脱硫脱硝-编辑保存
export function updateDesulDeni(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/updateDesulDeni',
    method: 'post',
    data: query
  });
}

// 其他-编辑保存
export function updateOther(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/updateOther',
    method: 'post',
    data: query
  });
}

// 编辑查询   供电煤耗
export function getCoalDataList(query) {
  return fetch({
    url: '/api/tran/smunitvariablecosts/getCoalDataList',
    method: 'get',
    params: query
  });
}
