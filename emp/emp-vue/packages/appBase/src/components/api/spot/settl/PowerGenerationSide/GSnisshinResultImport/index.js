/*
 * @功能描述:甘肃日清结果查询接口api
 * @版本:
 * @作者: 吴志超
 * @Date: 2019-10-31 17:06:12
 * @最新修改内容:
 * @LastEditTime: 2019-12-16 16:26:11
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// /smsettlelecgenimportgs/getDataList
// -全部查询
export function getDataList(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportgs/getDataList',
    method: 'get',
    params: query
  })
}

// /electricityformal/downloadElectricityInfoTemplate
// 甘肃日清算售电侧导入文件模板下载
export function downloadElectricityInfoTemplate() {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportgs/downloadElectricityInfoTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

// /smsettlelecgenimportgs/exportElectricity
// exportElectricity
//主页面导出
export function exportElectricity(parm) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportgs/exportElectricity?token=" + token
  let areaCode = parm.areaCode
  let areaCompanyCode = parm.areaCompanyCode
  let tradingCenterCode = parm.tradingCenterCode
  let orgCode  = parm.orgCode
  let transTime  = parm.transTime
  let unitCode = parm.unitCode
  let ModelCode = sessionStorage.getItem("modelCode")
  if (areaCode !== undefined && areaCode !== "" && areaCode !== null) {
    url += "&areaCode=" + areaCode
  }
  if (areaCompanyCode !== undefined && areaCompanyCode !== "" && areaCompanyCode !== null) {
    url += "&areaCompanyCode=" + areaCompanyCode
  }
  if (tradingCenterCode !== undefined && tradingCenterCode !== "" && tradingCenterCode !== null) {
    url += "&tradingCenterCode=" + tradingCenterCode
  }
  if (orgCode  !== undefined && orgCode  !== "" && orgCode  !== null) {
    url += "&orgCode =" + orgCode
  }
  if (transTime !== undefined && transTime !== "" && transTime !== null) {
    url += "&transTime=" + transTime
  }
  if (unitCode !== undefined && unitCode !== "" && unitCode !== null) {
    url += "&unitCode=" + unitCode
  }
  if (ModelCode !== undefined && ModelCode !== "" && ModelCode !== null) {
    url += "&ModelCode=" + ModelCode
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /smsettlelecgenimportgs/checkTheFile
// 上传-检验该文档是否存在
export function checkTheFile(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportgs/checkTheFile',
    method: 'get',
    params: query
  })
}

// /smsettlelecgenimportgs/export-cw-list
// 导出日清列表错误信息
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/smsettlelecgenimportgs/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /smsettlelecgenimportgs/cw_list
// 错误信息查看
export function cwList(query) {
  return fetch({
    url: '/api/settl/smsettlelecgenimportgs/cw_list',
    method: 'post',
    data: query
  })
}
