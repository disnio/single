/*
 * @Author: fengzp
 * @Date: 2020-10-13 09:55:51
 * @LastEditors: fengzp
 * @LastEditTime: 2021-03-13 14:10:31
 * @Introduce: Do not edit
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smreserveinfo/checkFile
// 上传-检验该期次是否有数据存在
export function checkFile(query) {
  return fetch({
    url: '/api/tran/smreserveinfo/checkFile',
    method: 'get',
    params: query
  })
}

// /smreserveinfo/downloadReserveInfoTemplate
// 日清算售电侧导入文件模板下载
export function downloadReserveInfoTemplate() {
  let token = getToken()
  let url = "/api/tran/smreserveinfo/downloadReserveInfoTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smreserveinfo/getAllData
// 备用信息-全部查询
export function getAllData(query) {
  return fetch({
    url: '/api/tran/smreserveinfo/getAllData',
    method: 'get',
    params: query
  })
}
