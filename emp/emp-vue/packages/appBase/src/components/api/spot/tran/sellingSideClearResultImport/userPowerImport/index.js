/*
 * @功能描述: #934交易管理-售电侧出清结果导入-用户用电量管理API
 * @作者: lifei
 * @Date: 2020-03-21
 * @最新修改内容:
 * @LastEditTime: 2020-03-21
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

/**
 * 导入查询
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 */
export function getDataList(data) {
  return fetch({
    url: '/api/tran/smUserPowerImport/getDataList',
    method: 'get',
    params: data
  })
}

export function insertDataList(data) {
  return fetch({
    url: '/api/tran/smUserPowerImport/insertDataList',
    method: 'post',
    data
  })
}

/**
 * 错误信息导出
 * 参数:token --必填
 * 参数:fileId 文件名称32位编码--必填
 * 参数:tranDate 交易日期 -- 必填
 */
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/tran/smUserPowerImport/export-cw-list?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

/**
 * 模板下载
 * 参数:token --必填
 */
export function downloadTemplate(data) {
  let token = getToken()
  let url = "@common/api/tran/smUserPowerImport/downloadTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

/**
 * 导出
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 */
export function exportFile(data) {
  let token = getToken()
  let url = "@common/api/tran/smUserPowerImport/exportFile?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

/**
 * 验证是否已存在数据
 * 参数:areaCode 区域--必填
 * 参数:areaCompanyCode 区域公司--必填
 * 参数:orgCode 发电公司
 * 参数:tradingCenterCode 交易中心--必填
 * 参数:tranDate 交易日期
 */
export function checkAlreadyExists(data) {
  return fetch({
    url: '/api/tran/smUserPowerImport/checkAlreadyExists',
    method: 'get',
    params: data
  })
}
