/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:10:11
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// /smUnitBoundaryCondi/page
// 分页查询
export function page(query) {
  return fetch({
    url: '/api/tran/smUnitBoundaryCondi/page',
    method: 'get',
    params: query
  })
}

// /smUnitBoundaryCondi/insert
// 新增
export function insert(query) {
  return fetch({
    url: '/api/tran/smUnitBoundaryCondi/insert',
    method: 'post',
    data: query
  })
}

// /smUnitBoundaryCondiTab/getByUnitBoundId / { unitBoundId }
// 查询Tab列表
export function getByUnitBoundId(id) {
  return fetch({
    url: '/api/tran/smUnitBoundaryCondiTab/getByUnitBoundId/' + id,
    method: 'get'
  })
}

// /smIndexDetail/getByTabId / { tabId }
// 查询指标详情列表
export function getByTabId(id) {
  return fetch({
    url: '/api/tran/smIndexDetail/getByTabId/' + id,
    method: 'get'
  })
}

// /smIndexDetail/export-template/{tabId}
// 模板下载
export function exportTemplate(id) {
  let token = getToken()
  let url = "/api/tran/smIndexDetail/export-template/" + id + "?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}


// /api/tran/smIndexDetail/import-excel/{tabId}
// 导入   tabId


// /smIndexDetail/updateIndexDetail/{tabId}
// 保存、提交  PUT
export function updateIndexDetail(id, obj) {
  return fetch({
    url: '/api/tran/smIndexDetail/updateIndexDetail/' + id,
    method: 'put',
    data: obj
  })
}



// /smUnitBoundaryCondi/{ id }
// 根据id删除信息 DELETE
export function smUnitBoundaryCondi(id) {
  return fetch({
    url: '/api/tran/smUnitBoundaryCondi/' + id,
    method: 'delete'
  })
}



// // 具体的错误信息查看  smNodalPriceRealElecgen/cwList
// export function cwList(query) {
//   return fetch({
//     url: '/api/tran/smNodalPriceRealElecgen/cwList',
//     method: 'post',
//     data: query
//   })
// }

// //真* 异常Excel 导出   smNodalPriceRealElecgen/exportCwList
export function exportCwList(data) {
  let token = getToken()
  let url = "/api/tran/smIndexDetail/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}


