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


export function getNewPageList(query) {
  return fetch({
    url: '/api/business/jyQuotationScheme/getNewPageList',
    method: 'get',
    params: query
  });
}
//审核查询分页
export function getAuditQueryPaging(query) {
  return fetch({
    url: '/api/business/JyQuotationSchemeApproval/getPageList',
    method: 'get',
    params: query
  });
}
export function getqyNewPageList(query) {
  return fetch({
    url: '/api/business/jyQuotationScheme/getTotalPageList',
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
//编辑
export function putInfo(obj,id) {
  return fetch({
    url: '/api/business/jyQuotationScheme/'+id,
    method: 'put',
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
  for(let key in params){
    if (typeof params[key] != 'undefined') {
      url += "&"+key+"=" + params[key];
    }
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}




//通过组织id获取交易单元
export function getTradingUnitByName(query) {
  return fetch({
  url: '/api/admin/tradingUnit/getTradingUnitbyTradingUnitName',
  method: 'get',
  params: query
  });
}
//通过组织id获取交易单元
export function getAlreadyOrgIdList(query) {
  return fetch({
  url: '/api/basicData/tMdataJyorg/getDataListByOrgId',
  method: 'get',
  params: query
  });
}
//根据方案id和方案名称编码删除方案
export function deleteInfoByType(data) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/deleteInfo',
  method: 'post',
  params: data
  });
}

//根据方案id和方案id删除信息
export function deleteInfoById(id) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/'+id,
  method: 'delete'
  });
}
//根据方案id和方案id删除信息
export function delInfoById(id) {
  return fetch({
  url: '/api/business/jyQuotationScheme/'+id,
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


