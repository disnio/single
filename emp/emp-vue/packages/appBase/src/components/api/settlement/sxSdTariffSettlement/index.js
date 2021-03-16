/*
 * @功能描述: 
 * @版本: 
 * @作者: 
 * @Date: 2019-12-09 14:05:14
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:08:40
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/page',
    method: 'get',
    params: query
  });
}
export function getOneById(dfjsId) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/'+dfjsId,
    method: 'get',
  });
}
// 保存、提交 亮 
export function addSdgsDfjsInfo(query,id) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/'+id,
    method: 'put',
    data: query
  });
}
// 导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/sxsdgsDfjs/exportExcel?token=" + token
  let preSettlementId = parm.preSettlementId

  if (preSettlementId !== undefined && preSettlementId !== "" && preSettlementId !== null) {
    url += "&preSettlementId=" + preSettlementId
  }

  window.location.href = url + "&ModelCode=" + window.mdcode;
}
export function modifySdgsDfjsInfo(query) {
  return fetch({
    url: '/api/balance/gdsdgsDfjs/modifySdgsDfjsInfo',
    method: 'post',
    data: query
  });
}

//提交
export function updateSatus(query) {
  return fetch({
    url: '/api/balance/gdsdgsDfjs/updateSatus',
    method: 'get',
    params:query
  })
}


//删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/'+id,
    method: 'delete',
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

//抽取-liang
export function extract(data) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/addJsData',
    method: 'post',
    data: data
  });
}
// 模糊查询-liang
export function searchPage(query) {
  return fetch({
    url: '/api/balance/sxsdgsDfjs/getPageList',
    method: 'get',
    params: query
  });
}
//根据orgId获取名称
export function getOrgNameByOrgId(id) {
  return fetch({
      url: '/api/admin/org/' + id,
      method: 'get',
  });
}

//验证期次的唯一性
export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/gdsdgsDfjs/checkPeriod",
    method: "get",
    params: query
  });
}

export function all(query) {
  return fetch({
    url: '/api/balance/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query

  });
}

//添加保存
export function addDate(body) {
  return fetch({
    url: '/api/balance/fjsdgsDfjs/saveOrUpdate',
    method: 'post',
    data: body
  });
}

