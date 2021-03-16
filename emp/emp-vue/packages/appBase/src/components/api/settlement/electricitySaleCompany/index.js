/*
 * @功能描述: 
 * @版本: 
 * @作者: 滕超
 * @Date: 2019-11-04 09:28:34
 * @最新修改内容: 
 * @LastEditTime: 2021-03-13 14:05:13
 */
import fetch from '@common/utils/fetch';
import { getToken } from "@common/utils/auth";
//模板下载
export function downloadImportTemplate() {
  let token = getToken()
  let url = "/api/balance/customerActualPowerUse/downloadBalanceImportTemplate?token=" + token
  window.location.href = url + "&ModelCode=" + window.mdcode;
}
export function getTransactionclassify() {//获取省内/省外
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=Transaction_classify',
    method: 'get'
  })
}

// export function getCustomer(query) {//根据用电企业名称查询用电企业代码
//   return fetch({
//     url: '/api/balance/customerActualPowerUse/getCustomer"',
//     method: 'get',
//     params: query
//   })
// }
export function getCustomer(query) {
  return fetch({
    url: '/api/balance/customerActualPowerUse/getCustomer',
    method: 'get',
    params: query
  });
}

export function page(query) {
  return fetch({
    url: "/api/balance/customerActualPowerUseDetail/getDetailListByUseId",
    method: "get",
    params: query
  });
}

// //客户信息模板下载
// export function downloadImportTemplate() {
//   let token = getToken()
//   let url = "/api/customer/tMdataCustomer/downloadCustomerImportTemplate?token=" + token
//   window.location.href = url
// }


export function getTransactionLine() {//获取联络路线
  return fetch({
    url: '/api/basicData/tMdataTieLin/getAllLinList',
    method: 'get'
  })
}

export function getExceptpage(query) {
  // 查看导入讯息
  return fetch({
    url: "/api/balance/importFile/power-detail-import-info",
    method: "get",
    params: query
  });
}

export function importjyEleDeclareManage(query) {
  // 确认入库
  return fetch({
    url: "/api/balance/importFile/enter-house",
    method: "get",
    params: query
  });
}

//合同台账数据导出
export function exportDataErrData(fileType,useId) {
  // return fetch({
  //   url: '/api/contract/htContractImportQuery/exportData',
  //   method: 'get',
  //   params: obj
  // });
  let token = getToken()
  let url = '/api/balance/importFile/export-data?token=' + token + "&fileType=" + fileType+"&useId="+useId;

  window.location.href = url + "&ModelCode=" + window.mdcode;
}
//通过户表号查公司信息
// export function getCompanyInfoByMeterNumber(id) {
//   return fetch({
//     url: '/api/balance/customerActualPowerUseDetail/getCompanyInfoByMeterNumber/' + id,
//     method: 'get'
//   })
// }


// #3080 阿彪 20191211 查询企业参数方法  
export function getValueByOrgIdAndCode(parme) {
  return fetch({
      url: "/api/admin/parameter/getValueByOrgIdAndCode",
      method: "get",
      params: parme
  });
}
//查询有效期内的合同
export function getContractList(query) {
  return fetch({
  url: '/api/balance/customerActualPowerUse/getContractList', 
  method: 'get',
  params: query
  });
}
//通过合同id获取代理服务费率
export function getDlfwfvByContractId(query) {
  return fetch({
  url: '/api/balance/customerActualPowerUse/getDlfwfvByContractId', 
  method: 'get',
  params: query
  });
}
// #3343 2019-12-31 张亮三  获取交易类别方法
export function tradeTypeCodeSelectObj() {//交易方式
  return fetch({
    url: '/api/admin/dim/getDimByPropCode?propCode=subclasses',
    method: 'get'
  })
}

// #3345 2019-01-02 张亮三  获取客户名称下拉数据
export function getCustomerList(obj) {//交易方式
  return fetch({
    url: '/api/balance/customerActualPowerUseDetail/getCustomerList',
    method: 'get',
    params:obj
  })
}

