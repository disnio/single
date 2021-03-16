import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/getPageList',
    method: 'get',
    params: query
  });
}
export function pageRecord(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  });
}

//删除
export function delObj(query) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/deleteDfjsInfos',
    method: 'get',
    params:query
  })
}


//状态
export function getStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}

//抽取
export function extract(query) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/getBillInfoList',
    method: 'get',
    params:query
  });
}
// export function extract(query) {
//   let data={}
//   data.jsDate  = query;
//   return fetch({
//     url: '/api/balance/fjsdgsDfjs/getBillData',
//     method: 'get',
//     params: data
//   });
// }

//取消提交
export function cancelCommit(query) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/updateStateById',
    method: 'get',
    params: query
  });
}

// export function getIdBytradingCycle(query) {
//   //新增判断
//   return fetch({
//     url: "/api/balance/customerActualPowerUse/checkPeriod",
//     method: "get",
//     params: query
//   });
// }

//验证期次的唯一性
export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/fjsdgsDfjs/checkPeriod",
    method: "get",
    params: query
  });
}

//保存和修改
export function addDate(body) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/saveOrUpdate',
    method: 'post',
    data: body
  });
}

//根据id详情查询
export function selectById(query) {
  //新增判断
  return fetch({
    url: "/api/balance/fjsdgsDfjs/selectFJSdgsDfjsById",
    method: "get",
    params: query
  });
}


