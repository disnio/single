/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:10:23
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// -------- 负荷数据 导入相关  start-------

//校验数据是否已经存在
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/tran/smrecentlyTotalload/checkAlreadyExists',
    method: 'get',
    params: query
  })
}

// 统调负荷数据查询
export function getAllDataList(query) {
    return fetch({
      url: '/api/tran/smrecentlyTotalload/getAllDataList',
      method: 'get',
      params: query
    })
  }

// 导入
export function importFile(query) {
    return fetch({
      url: '/api/tran/smrecentlyTotalload/importFile',
      method: 'post',
      data: query
    })
}

//模板下载
export function downloadSmRecentlyTotalLoadForeTemplate() {
  let token = getToken()
  let url = "/api/tran/smrecentlyTotalload/downloadSmRecentlyTotalLoadForeTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// -------- 负荷数据 导入相关  end-------