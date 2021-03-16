import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smlongtermcontractpowerdecom/getPage
// 中长期合同电量分解-分页查询
export function getPage(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/getPage',
    method: 'get',
    params: query
  })
}

// /smlongtermcontractpowerdecom/deleteList
// 中长期合同电量分解-多选删除
export function deleteList(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/deleteList',
    method: 'post',
    data: query
  })
}
// 查询企业参数方法
export function getValueByOrgIdAndCode(parme) {
  return fetch({
    url: "/api/admin/parameter/getValueByOrgIdAndCode",
    method: "get",
    params: parme
  });
}
// /smlongtermcontractpowerdecom/add
// 中长期合同电量分解-新增
export function add(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/add',
    method: 'post',
    data: query
  })
}
// /smlongtermcontractpowerdecom/seeDetail
// 查看详情
export function seeDetail(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/seeDetail',
    method: 'get',
    params: query
  })
}
// /smlongtermcontractpowerdecom/monthDetail
// 查看分月页签详情
export function monthDetail(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/monthDetail',
    method: 'get',
    params: query
  })
}
// /smlongtermcontractpowerdecom/dayDetail
// 查看日页签详情
export function dayDetail(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/dayDetail',
    method: 'get',
    params: query
  })
}
// /smlongtermcontractpowerdecom/hourDetail
// 查看分时页签详情
export function hourDetail(query) {
  return fetch({
    url: '/api/tran/smlongtermcontractpowerdecom/hourDetail',
    method: 'get',
    params: query
  })
}
// /smtrancurvecreate/getPage
// 新增查询模板
export function getTemplate(query) {
  return fetch({
    url: '/api/tran/smtrancurvecreate/getPage',
    method: 'get',
    params: query
  })
}
// /smtrancurvecreate/getAllDataList
// -查看模板
export function searchTemplate(query) {
  return fetch({
    url: '/api/tran/smtrancurve/getYearAllDataList',
    method: 'get',
    params: query
  })
}


// /smlongtermcontractpowerdecom/export
// 导出
export function exportData(data) {
  let token = getToken()
  let url = "@common/api/tran/smlongtermcontractpowerdecom/export?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}



