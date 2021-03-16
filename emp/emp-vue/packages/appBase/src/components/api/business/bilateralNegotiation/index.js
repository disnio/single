/*
 * @功能描述:
 * @版本:
 * @作者:
 * @Date: 2019-09-05 11:04:55
 * @最新修改内容:
 * @LastEditTime: 2020-05-12 15:46:27
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

//列表接口
export function page(query) {
  return fetch({
    url: '/api/business/tradeNotice/page',
    method: 'get',
    params: query
  });
}
//报价方案列表分页查询
export function getPageList(query) {
  return fetch({
    url: '/api/business/jyQuotationScheme/getPageList',
    method: 'get',
    params: query
  });
}
//通过方案id获取报价方案列表
export function getDetailListBySchemeId(query) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/getSchemeDetailListBySchemeId',
    method: 'get',
    params: query
  });
}

//列表新增接口
export function addObj(obj) {
  return fetch({
    url: '/api/business/jyQuotationScheme/add',
    method: 'post',
    data: obj
  });
}
//新增报价接口
export function addInfo(obj) {
  return fetch({
    url: '/api/business/jyQuotationScheme/addInfo',
    method: 'post',
    data: obj
  });
}
//编辑获取数据
export function getObj(id) {
  return fetch({
    url: '/api/business/jyQuotationScheme/' + id,
    method: 'get'
  })
}
//编辑保存数据
export function modifyInfo(obj) {
  return fetch({
    url: '/api/business/jyQuotationScheme/modifyInfo',
    method: 'post',
    data: obj
  })
}
//列表导出
export function exportObj(params) {
  let token = getToken()
  let url = "/api/business/jyQuotationScheme/exportDataList?token=" + token
  for (let key in params) {
    url += "&" + key + "=" + params[key];
  }
  window.open(url + "&ModelCode=" + window.mdcode);

}

//通过组织id获取交易单元
export function getTradingUnitByName(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
    method: 'get',
    params: query
  });
}
//根据方案id和方案名称编码删除方案
export function deleteInfoByType(data) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/deleteInfo',
    method: 'post',
    data: data
  });
}
//根据方案id和方案id删除信息
export function deleteInfoById(id) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/' + id,
    method: 'delete'
  });
}
//效益预算
export function reckon(query) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
    method: 'get',
    params: query
  });
}
// 拜访客户 模糊查询 下拉选择
export function getcustomerId(parme) {
  return fetch({
    url: "/api/customer/tMdataCustomer/getCustomerByCustomerName",
    method: "get",
    params: parme
  });
}
//通过方案名称获取内部客户信息
export function getSchemeDetail(query) {
  return fetch({
    url: "/api/business/jyQuotationSchemeDetail/getSchemeDetailListBySchemeName",
    method: "get",
    params: query
  });
}

//根据交易分类编码、省份编码、组织机构属性、组织名称模糊查询省内/外所有组织机构信息
export function getOrgListByClassification(query) {
  return fetch({
    url: "/api/business/jyQuotationScheme/getOrgListByClassification",
    method: "get",
    params: query
  });
}
export function getCurrentUserOrg() {//获取当前用户信息
  return fetch({
    url: '/api/admin/org/getCurrentUserOrg',
    method: 'get'
  });
}
//获取机组
export function getTradingUnitbyOrgId(orgId) {
  return fetch({
    url: '/api/admin/tradingUnit/getTradingUnitbyOrgId?page=1&limit=1000&orgId=' + orgId,
    method: 'get'
  });
}

// #3545 张亮三 用电企业模糊查询
export function getAlleleEnterprise(parme) {
  return fetch({
    url: "/api/customer/tMdataCustomer/getCustomerByCustomerName", //交易产品
    method: "get",
    params: parme

  });
}


// 2020年05月08日 吴志超修改 工单 #4004


// /jyQuotationSchemeDetail/exportDetail
// 导出详情


// 导出
export function exportDetail(data) {
  let token = getToken()
  let url = "/api/business/jyQuotationSchemeDetail/exportDetail?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /jyQuotationSchemeDetail/importTemplate/{templateId}
//模板下载
export function importTemplate(data) {
  let token = getToken();
  // let url = "/api/business/jyQuotationSchemeDetail/importTemplate?token=" + token + "&templateId=" + id;
  let url = "/api/business/jyQuotationSchemeDetail/importTemplate?token=" + token
  for (let k in data) {
    let value = data[k] != undefined ? data[k] : "";
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  window.location.href = url ? (url + "&ModelCode=" + window.mdcode) : ""
}

// /jyQuotationSchemeDetail/importData
// 查询导入数据
export function importData(parme) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/importData',
    method: "get",
    params: parme
  });
}

// /jyQuotationSchemeDetail/putInDatabase
// 数据入库 导入解析 正确数据入库
export function putInDatabase(parme) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/putInDatabase',
    method: "get",
    params: parme
  });
}


export function addBeforeUpload(data) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/addBeforeUpload',
    method: 'post',
    data: data
  });
}

// #4161 qinhz 2020-06-04 是否启用审批流
export function getValueByOrgIdAndCode (parme) {
  return fetch({
      url: "/api/admin/parameter/getValueByOrgIdAndCode",
      method: "get",
      params: parme

  });
}

// #4161 qinhz 2020-06-05 获取购电测交易单元下拉框
export function getPowerTestTransactionUnit (id) {
  return fetch({
      url: "/api/basicData/tMdataJyorg/purchaseJyUnitByJyOrgId/" + id,
      method: "get"
  });
}
