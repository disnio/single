import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";

export function page(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/getPageList',
    method: 'get',
    params: query
  });
}

//删除
export function delObj(id) {
  return fetch({
    url: '/api/balance/jsFinanceBill/' + id,
    method: 'delete',

  })
}

//状态
export function getStateCode() {
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=state',
    method: 'get',
    params: ''
  });
}

//详情
export function selectFinanceById(id) {
  return fetch({
    url: '/api/balance/jsFinanceBill/' + id,
    method: 'get',
  });
}


//抽取数据
export function selectExtractById(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/getBillData',
    method: 'get',
    params: query
  })
}

//提交和取消提交
export function cancelCommit(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/updateSatus',
    method: 'get',
    params: query
  });
}

export function getIdBytradingCycle(query) {
  //新增判断
  return fetch({
    url: "/api/balance/customerActualPowerUse/checkPeriod",
    method: "get",
    params: query
  });
}

//添加保存
export function addObj(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/saveOrUpdate',
    method: 'post',
    data: query
  });
}
//唯一性校验
export function checkPeriod(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/checkPeriod',
    method: 'post',
    data: query
  });
}

//导出
export function exportObj(parm) {
  let token = getToken()
  let url = "/api/balance/jsFinanceBill/exportData?token=" + token
  let dzdId = parm.dzdId
  if (dzdId !== undefined && dzdId !== "" && dzdId !== null) {
    url += "&dzdId=" + dzdId
  }
  window.location.href = url + "&ModelCode=" + window.mdcode;
}

//下载模板
export function dowloadImportTemplate() {
    let token = getToken()
    let url = "/api/balance/jsFinanceBill/dowloadImportTemplate?token=" + token
    window.location.href = url + "&ModelCode=" + window.mdcode;

}
//抽取数据
export function getCalData(query) {
  return fetch({
    url: '/api/balance/jsFinanceBill/getCalData',
    method: 'get',
    params: query
  });
}


