/*
 * @Author: fengzp
 * @Date: 2020-09-16 19:09:55
 * @LastEditors: fengzp
 * @LastEditTime: 2020-09-22 11:40:51
 * @Introduce: Do not edit
 */
import fetch from '@/common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function getPageList(query) {
  return fetch({
    url: '/api/admin/fdfsfile/getPageList',
    method: 'get',
    params: query,
  });
}

export function exportDetail(data) {
  let token = getToken()
  let url = "/api/admin/fdfsfile/download?token=" + token
  // console.log(url)
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// 文件删除
export function del(query) {
  return fetch({
    url: '/api/admin/fdfsfile/delete',
    method: 'post',
    data:query,
  });
}

export function loaded(query) {
  return fetch({
    url: '/api/admin/fdfsfile/upload',
    method: 'post',
    data: query,
  });
}

// 根据批次删除多个文件
// /fdfsfile/deleteByBatch
// 文件删除根据id /fdfsfile/deleteById
export function deleteById(id) {
  return fetch({
    url: `/api/admin/fdfsfile/deleteById?id=${id}`,
    method: 'post',
  });
}

// /fdfsfile/getFileByBatch 根据批次号查询文件信息  batch
export function getFileByBatch(query) {
  return fetch({
    url: '/api/admin/fdfsfile/getFileByBatch',
    method: 'get',
    params: query,
  });
}

// /fdfsfile/getFileById
// 查询文件信息 根据id查询 id
export function getFileById(query) {
  return fetch({
    url: '/api/admin/fdfsfile/getFileById',
    method: 'get',
    params: query,
  });
}
