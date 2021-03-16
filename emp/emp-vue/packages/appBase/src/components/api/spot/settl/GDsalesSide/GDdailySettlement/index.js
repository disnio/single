import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
// 结算  售电测结算 日清算

// 初始化查询列表
export function getAllDataList(query) {
  return fetch({
    url: '/api/settl/electricityformal/getAllDataList',
    method: 'get',
    params: query
  })
}

// checkAlreadyExists
export function checkAlreadyExists(query) {
  return fetch({
    url: '/api/settl/electricityImportFile/checkAlreadyExists',
    method: 'get',
    params: query
  })
}


// 主界面文件上传
// /electricityImportFile/importElectricityFile
export function importElectricityFile(query) {
  return fetch({
    url: '/api/settl/electricityImportFile/importElectricityFile',
    method: 'post',
    data: query
  })
}

//真* 异常Excel 导出
export function exportCwList(data) {
  let token = getToken()
  let url = "@common/api/settl/electricityImportFile/exportElectricityErrorData?token=" + token + "&fileId=" + data.fileId
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /electricityImportFile/getElectricityImportInfo
// 导入获取待入库数据和异常数据
//   orgCode 售电公司    trandingCenterCode 交易中心  
//  uploadDate 上传日期  iscorrect 状态值(0-错误 1-正确)
// 
// 获取实际用电量详情导入数据状态信息
export function getElectricityImportInfo(query) {
  return fetch({
    url: '/api/settl/electricityImportFile/getElectricityImportInfo',
    method: 'get',
    params: query
  })
}


// /electricityImportFile/electricityEnterHouse 
// 确认入库
export function electricityEnterHouse(query) {
  return fetch({
    url: '/api/settl/electricityImportFile/electricityEnterHouse',
    method: 'get',
    params: query
  })
}

// /electricityImportFile/exportElectricityErrorData
// 导出异常导入数据
// orgCode   trandingCenterCode   uploadDate
export function exportErrObj(parm) {
  let token = getToken()
  let url = "@common/api/settl/electricityImportFile/exportElectricityErrorData?token=" + token
  let orgCode = parm.orgCode
  let trandingCenterCode = parm.trandingCenterCode
  let uploadDate = parm.uploadDate
  let ModelCode = parm.ModelCode
  if (orgCode !== undefined && orgCode !== "" && orgCode !== null) {
    url += "&orgCode=" + orgCode
  }
  if (trandingCenterCode !== undefined && trandingCenterCode !== "" && trandingCenterCode !== null) {
    url += "&trandingCenterCode=" + trandingCenterCode
  }
  if (uploadDate !== undefined && uploadDate !== "" && uploadDate !== null) {
    url += "&uploadDate=" + uploadDate
  }
  if (ModelCode !== undefined && ModelCode !== "" && ModelCode !== null) {
    url += "&ModelCode=" + ModelCode
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

//主页面导出 
// /electricityformal/exportElectricity
// areaCode areaCompanyCode trandingCenterCode supplierCode transTime
export function exportMainObj(parm) {
  let token = getToken()
  let url = "@common/api/settl/electricityformal/exportElectricity?token=" + token
  let areaCode = parm.areaCode
  let areaCompanyCode = parm.areaCompanyCode
  let trandingCenterCode = parm.trandingCenterCode
  let supplierCode = parm.supplierCode
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
  if (supplierCode !== undefined && supplierCode !== "" && supplierCode !== null) {
    url += "&supplierCode=" + supplierCode
  }
  if (transTime !== undefined && transTime !== "" && transTime !== null) {
    url += "&transTime=" + transTime
  }
  if (ModelCode !== undefined && ModelCode !== "" && ModelCode !== null) {
    url += "&ModelCode=" + ModelCode
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;}

// /electricityformal/downloadElectricityInfoTemplate
// 日清算售电侧导入文件模板下载
export function downloadElectricityInfoTemplate() {
  let token = getToken()
  let url = "@common/api/settl/electricityformal/downloadElectricityInfoTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;  // return fetch({
  //   url: '/api/settl/electricityformal/downloadElectricityInfoTemplate',
  //   method: 'get',
  //   params: query
  // })
}
