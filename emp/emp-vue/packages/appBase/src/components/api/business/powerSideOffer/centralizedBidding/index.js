import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

// 2021/1/11 fengzp 国电投优化工单
//撤回
export function rollback(schemeId) {
  return fetch({
    url: `/api/business/jyQuotationScheme/rollback?schemeId=${schemeId}`,
    method: 'post',
  });
}

// 查看审批意见按钮
// /api/admin/activiti/getApprovalHistory?username=&orgid=&processKey=&businessKey=3f7813547fdb46f79e7adbc2e194ba10
export function getApprovalHistoryCom(query) {
  return fetch({
    url: '/api/admin/activiti/getApprovalHistory',
    method: 'get',
    params: query
  });
}

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
//通过方案id获取报价方案列表
export function getSchemeDetailListByNoticeId(query) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/getSchemeDetailListByNoticeId',
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
  for(let key in params){
    url += "&"+key+"=" + params[key];
  }
  url+="&ModelCode="+sessionStorage.getItem("modelCode");
  //window.open(url + "&ModelCode=" + window.mdcode);
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
//根据方案id和方案名称编码删除方案
export function deleteInfoByType(data) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/deleteInfo',
  method: 'post',
  params: data
  });
}
//根据方案id和方案名称编码删除方案
export function changeStatus(query) {
  return fetch({
  url: '/api/business/JyQuotationSchemeApproval/completeApproval',
  method: 'post',
  params: query
  });
}
//根据方案id和方案名称编码删除方案
export function completeAllApproval(query) {
  return fetch({
  url: '/api/business/JyQuotationSchemeApproval/completeAllApproval',
  method: 'post',
  params: query
  });
}
//根据方案id和方案id删除信息
export function deleteInfoById(id) {
  return fetch({
  url: '/api/business/jyQuotationSchemeDetail/'+id,
  method: 'delete'
  });
}
//通过方案id获取报价方案列表
export function getDetailListBySchemeIdNew(query) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/getSchemeDetailListBySchemeId',
    method: 'get',
    params: query
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

//根据方案id删除方案
export function delObj(id) {
  return fetch({
  url: '/api/business/jyQuotationScheme/'+id,
  method: 'delete',
  });
}

//省内双边获取内部客户数据

export function getListNB(query) {
  return fetch({
    url: '/api/business/jyQuotationSchemeDetail/getSchemeDetailListBySchemeName',
    method: 'get',
    params: query
  });
}

// 修改记录分页查询
export function getPageListModify(query) {
  return fetch({
    url: '/api/business/jsAdjustmentRecord/getPageList',
    method: 'get',
    params: query
  });
}

// #3545 张亮三 用电企业模糊查询
export function getAlleleEnterprise (parme) {
  return fetch({
      url: "/api/customer/tMdataCustomer/getCustomerByCustomerName", //交易产品
      method: "get",
      params: parme
  });
}

// 新增变更记录
export function addChange(obj) {
  return fetch({
    url: '/api/business/jyQuotationScheme/addChange',
    method: 'post',
    data: obj
  });
}

// 获取变更记录
export function getChange(query) {
  return fetch({
    url: '/api/business/jyQuotationScheme/getSchemeByOriginalSchemeId',
    method: 'get',
    params: query
  });
}
