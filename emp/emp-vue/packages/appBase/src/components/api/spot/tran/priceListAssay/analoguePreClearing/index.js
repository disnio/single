import fetch from '@common/utils/fetch'

// 模拟出清结果 - 全部查询
export function getAllMainDataList(query) {
  return fetch({
    url: '/api/tran/clearingresult/getAllMainDataList',
    method: 'get',
    params: query
  })
}

//主表分页查询 
export function getMainPage(query) {
  return fetch({
    url: '/api/tran/clearingresult/getMainPage',
    method: 'get',
    params: query
  })
}


// 模拟出清结果明细 - 全部查询
export function getAllDayDetailDataList(query) {
  return fetch({
    url: '/api/tran/clearingresult/getAllDayDetailDataList',
    method: 'get',
    params: query
  })
}

// // getDayDetailDataPage 调取第二层详情弹框数据
// export function getDayDetailDataList(query) {
//   return fetch({
//     url: '/api/tran/clearingresult/getDayDetailDataList',
//     method: 'get',
//     params: query
//   })
// }

// getAllDayDataList  主表点击查看弹出框的数据
export function getAllDayDataList(query) {
  return fetch({
    url: '/api/tran/clearingresult/getAllDayDataList',
    method: 'get',
    params: query
  })
}

//典型组合报价方案
export function getAllMainList(query) {
  return fetch({
    url: '/api/tran/typcombquotscheme/getAllMainList',
    method: 'get',
    params: query
  })
}
//组合报价方案
export function getAllHeadList(query) {
  return fetch({
    url: '/api/tran/smtrancomposescheme/getAllHeadList',
    method: 'get',
    params: query
  })
}

// addMain   xinzeng
// export function addMain(query) {
//   return fetch({
//     url: '/api/tran/clearingresult/addMain',
//     method: 'post',
//     data: query
//   })
// }

//getSimulatedClearingUnit  // 点击新增按钮路由跳转野蛮的数据接口
export function getSimulatedClearingUnit(query) {
  return fetch({
    url: '/api/tran/clearingresult/getSimulatedClearingUnit',
    method: 'get',
    params: query
  })
}

//选择节点预测出清价方案
// /fclmpscheme/getPage
export function getPage(query) {
  return fetch({
    url: '/api/tran/fclmpscheme/getPage',
    method: 'get',
    params: query
  })
}

// 模拟出清结果-新增-模拟出清-预保存
export function simulatedClearing(query) {
  return fetch({
    url: '/api/tran/clearingresult/simulatedClearing',
    method: 'post',
    data: query
  })
}

// /clearingresult/deleteMainList 模拟出清结果-多选删除
export function deleteMainList(query) {
  return fetch({
    url: '/api/tran/clearingresult/deleteMainList',
    method: 'post',
    data: query
  })
}

// /clearingresult/simulatedClearingChartOrg
// 模拟出清结果 图
export function simulatedClearingChartOrg(query) {
  return fetch({
    url: '/api/tran/clearingresult/simulatedClearingChartOrg',
    method: 'get',
    params: query
  })
}

// /clearingresult/simulatedClearingChartUnit
// 模拟出清结果 图
export function simulatedClearingChartUnit(query) {
  return fetch({
    url: '/api/tran/clearingresult/simulatedClearingChartUnit',
    method: 'get',
    params: query
  })
}

// /clearingresult/updateMain
// 模拟出清结果 - 更新
export function updateMain(query) {
  return fetch({
    url: '/api/tran/clearingresult/updateMain',
    method: 'post',
    data: query
  })
}

// /clearingresult/getOrgAndUnitBySchemeId
// 通过报价方案ID，查询该报价方案中的发电公司和交易单元
// schemeStyleCode  schemeId
export function getOrgAndUnitBySchemeId(query) {
  return fetch({
    url: '/api/tran/clearingresult/getOrgAndUnitBySchemeId',
    method: 'get',
    params: query
  })
}


