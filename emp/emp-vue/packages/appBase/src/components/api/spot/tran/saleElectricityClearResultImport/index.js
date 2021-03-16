/*
 * @功能描述: 交易管理-出清结果导入-售电侧-前端开发 接口api
 * @版本: 1.0.0
 * @作者: 吴志超
 * @Date: 2019-11-14 14:10:20
 * @最新修改内容:
 * @LastEditTime: 2021-03-13 14:10:38
 */

import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smclearingresultimportsell/getAllDataList
//   - 全部查询
export function getAllDataList(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportsell/getAllDataList',
    method: 'get',
    params: query
  })
}

// /smclearingresultimportsell/downloadContractTemplateCQ
// 模板下载
export function downloadContractTemplateCQ(parame) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportsell/downloadContractTemplateCQ?token=" + token
  let areaCompanyCode = parame.areaCompanyCode
  if (areaCompanyCode !== undefined && areaCompanyCode !== "" && areaCompanyCode !== null) {
    url += "&areaCompanyCode=" + areaCompanyCode
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smclearingresultimportsell/import-file
// 上传文件


// /smclearingresultimportsell/valInfo
// 验证是否存在数据 get
export function valInfo(query) {
  return fetch({
    url: '/api/tran/smclearingresultimportsell/valInfo',
    method: 'get',
    params: query
  })
}

// /smclearingresultimportsell/export-list
// 导出数据
export function export_list(parm) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportsell/export-list?token=" + token
  let areaCode = parm.areaCode
  let areaCompanyCode = parm.areaCompanyCode
  let trandingCenterCode = parm.trandingCenterCode
  let orgCode = parm.orgCode
  let transTime = parm.transTime
  let ModelCode = parm.ModelCode
  if (areaCode !== undefined && areaCode !== "" && areaCode !== null) {
    url += "&areaCode=" + areaCode
  }
  if (areaCompanyCode !== undefined && areaCompanyCode !== "" && areaCompanyCode !== null) {
    url += "&areaCompanyCode=" + areaCompanyCode
  }
  if (trandingCenterCode !== undefined && trandingCenterCode !== "" && trandingCenterCode !== null) {
    url += "&trandingCenterCode=" + trandingCenterCode
  }
  if (orgCode !== undefined && orgCode !== "" && orgCode !== null) {
    url += "&orgCode=" + orgCode
  }
  if (transTime !== undefined && transTime !== "" && transTime !== null) {
    url += "&transTime=" + transTime
  }
  if (ModelCode !== undefined && ModelCode !== "" && ModelCode !== null) {
    url += "&ModelCode=" + ModelCode
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smsettlelecgenimportgs/export-cw-list
// 导出错误数据
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smclearingresultimportsell/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}
