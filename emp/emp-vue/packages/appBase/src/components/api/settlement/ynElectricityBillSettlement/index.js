import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 分页查询
export function getPageList(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYn/getPageList',
    method: 'get',
    params: data
  })
}

// 新增
export function addData(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYn/addData',
    method: 'get',
    params: data
  })
}

// 导出
export function exportExcel(data) {
  let token = getToken()
  let url = "@common/api/balance/jsSdgsdfjsYn/exportExcel?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 删除
export function deleteListByIds(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYn/deleteListByIds',
    method: 'get',
    params: data
  })
}

// 查看页面 删除
export function lookDeleteListByIds(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYnDetail/deleteListByIds',
    method: 'get',
    params: data
  })
}

// 查看 分页查询
export function getDetailPageList(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYnDetail/getDetailPageList',
    method: 'get',
    params: data
  })
}

// 查看 导出
export function lookExportExcel(data) {
  let token = getToken()
  let url = "@common/api/balance/jsSdgsdfjsYnDetail/exportExcel?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 详情 or 编辑 获取信息
export function getOneDetailById(data) {
  return fetch({
    url: '/api/balance/jsSdgsdfjsYnDetail/getOneDetailById',
    method: 'get',
    params: data
  })
}


// 编辑 计算
export function countData(data) {
  return fetch({
    url: `/api/balance/jsSdgsdfjsYnDetail/countData`,
    method: 'post',
    data
  })
}

// 编辑 提交 保存
export function editSubmit(data) {
  return fetch({
    url: `/api/balance/jsSdgsdfjsYnDetail/${data.detailId}`,
    method: 'put',
    data
  })
}

// 查看 导出
export function exportDetailExcel(data) {
  let token = getToken()
  let url = "@common/api/balance/jsSdgsdfjsYnDetail/exportDetailExcel?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
